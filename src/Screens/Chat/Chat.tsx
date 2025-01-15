import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatItem from './../../Components/ChatItem';
import EmptyState from './../../Components/EmptyState';
import RequestModal from './../../Components/Modal/RequestModal';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import LoadingDots from './../../Components/LoadingDots';
import { useNavigation } from '@react-navigation/native';
import InfoIcon from './../../assets/images/Profile/logout.svg';
import { io } from 'socket.io-client';
import { useFocusEffect } from '@react-navigation/native';

const DEFAULT_AVATAR_URL = 'https://yourapp.com/default-avatar.png'; // Replace with your default avatar
const API_BASE_URL = 'http://192.168.0.129:5001/api/v1';

interface ChatRoom {
  id: number;
  name: string;
  type: string;
  image_url: string;
  status: string;
  total_members: number;
  created_by: string;
  joined_at: string;
  latest_message: {
    id: number;
    content: string;
    sender_id: string;
    media_url: string | null;
    status: string;
    timestamp: string;
  } | null;
}

interface ApiResponse {
  success: boolean;
  data: {
    rooms: ChatRoom[];
    total: number;
  };
}

interface Invitation {
  invitation: {
    id: number;
    inviter_id: number;
    created_at: string;
    updated_at: string;
  };
  room: {
    id: number;
    name: string;
    type: string;
    description: string;
    image_url: string;
    status: string;
    total_members: number;
    created_by: string;
    members: Array<{ user_id: string }>;
    created_at: string;
    updated_at: string;
  };
}

interface InvitationResponse {
  success: boolean;
  data: Invitation[];
}

const Chat = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);
  const [socket, setSocket] = useState<any>(null);

  // Initialize socket connection
  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('user');
        if (!loggedInUser) throw new Error('No user found');
        const parsedUser = JSON.parse(loggedInUser);
        const extractedUserId = parsedUser.user.id;
        setCurrentUserId(extractedUserId);
      } catch (error) {
        console.error('Error retrieving user ID:', error);
        setError('Failed to retrieve user information');
      }
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!currentUserId) return;

    const socketConnection = io('http://192.168.0.129:5001'); // Replace with your socket server URL
    socketConnection.emit('join_user', currentUserId);
    setSocket(socketConnection);

    return () => {
      socketConnection.close();
    };
  }, [currentUserId]);

  // Fetch chat and invitations data
  const fetchChatsAndInvitations = useCallback(async () => {
    if (!currentUserId) return;

    try {
      setLoading(true);
      const [chatsResponse, invitationsResponse] = await Promise.all([
        axios.get<ApiResponse>(`${API_BASE_URL}/chat/conversations`, {
          params: { user_id: currentUserId },
        }),
        axios.get<InvitationResponse>(`${API_BASE_URL}/chat/user/${currentUserId}/invitations`),
      ]);

      if (chatsResponse.data.success) {
        setChats(chatsResponse.data.data.rooms);
      } else {
        setError('Failed to fetch chats');
      }

      if (invitationsResponse.data.success) {
        setInvitations(invitationsResponse.data.data);
      } else {
        setError('Failed to fetch invitations');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [currentUserId]);

  useEffect(() => {
    fetchChatsAndInvitations();
  }, [currentUserId]);

  // Re-fetch chats and invitations on focus
  useFocusEffect(
    useCallback(() => {
      fetchChatsAndInvitations();
    }, [fetchChatsAndInvitations])
  );

  // Socket event listeners
  useEffect(() => {
    if (!socket) return;

    const handleRoomEvent = async () => {
      await fetchChatsAndInvitations();
    };

    socket.on('group_joined', handleRoomEvent);
    socket.on('group_left', handleRoomEvent);
    socket.on('member_joined', handleRoomEvent);

    return () => {
      socket.off('group_joined', handleRoomEvent);
      socket.off('group_left', handleRoomEvent);
      socket.off('member_joined', handleRoomEvent);
    };
  }, [socket, fetchChatsAndInvitations]);

  // Handle chat refresh
  const handleRefresh = () => {
    setRefreshing(true);
    fetchChatsAndInvitations();
  };

  const handleChatPress = (chat: ChatRoom) => {
    if (chat.status === 'pending') {
      setSelectedChat(chat);
      setShowRequestModal(true);
    } else {
      navigation.navigate('CHATSCREEN', {
        roomId: chat.id,
        chatName: chat.name,
        roomType: chat.type,
        userId: currentUserId,
      });
    }
  };

  const handleAcceptRequest = async () => {
    if (!selectedChat || !currentUserId || !socket) {
      console.log('handleAcceptRequest: Missing required data.');
      return;
    }

    const apiUrl = `${API_BASE_URL}/chat/room/member/add`;
    const payload = {
      room_id: selectedChat.id,
      user_id: currentUserId.toString(),
      is_invite_acceptance: true  // Added this flag
    };

    try {
      console.log('handleAcceptRequest: Preparing to accept request for chat room', selectedChat.id);
      console.log('handleAcceptRequest: API URL:', apiUrl);
      console.log('handleAcceptRequest: Payload:', JSON.stringify(payload, null, 2));

      const response = await axios.post(apiUrl, payload);

      console.log('handleAcceptRequest: API response:', response.data);

      socket.emit('group_joined', payload);
      console.log('handleAcceptRequest: Socket event emitted for user joining room', selectedChat.id);

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, status: 'accepted' } : chat
        )
      );

      console.log('handleAcceptRequest: Chat room status updated to "accepted" for room', selectedChat.id);
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;

        console.error('handleAcceptRequest: Axios error response:', error.response);

        if (status === 400 && data.message === 'User is already a member of the room') {
          console.log('handleAcceptRequest: User is already a member of the room. No further action needed.');
          // Optionally, update UI to reflect this state
        } else {
          console.error('handleAcceptRequest: Unexpected error:', data.message);
          setError(data.message || 'Failed to accept chat request');
        }
      } else if (error.request) {
        console.error('handleAcceptRequest: Axios error request:', error.request);
      } else {
        console.error('handleAcceptRequest: General error:', error.message);
      }
    } finally {
      console.log('handleAcceptRequest: Finalizing request acceptance.');
      setShowRequestModal(false);
      setSelectedChat(null);
    }
  };

  const handleDeclineRequest = async () => {
    if (!selectedChat || !currentUserId) return;

    try {
      await axios.post(`${API_BASE_URL}/chat/decline-request`, {
        room_id: selectedChat.id,
        user_id: currentUserId,
      });

      setChats((prevChats) => prevChats.filter((chat) => chat.id !== selectedChat.id));
    } catch (error) {
      console.error('Error declining request:', error);
      setError('Failed to decline chat request');
    } finally {
      setShowRequestModal(false);
      setSelectedChat(null);
    }
  };

  const handleClose = () => {
    setShowRequestModal(false);
    setSelectedChat(null);
  };

  const formatTime = (timestamp: string) => {
    if (!timestamp) return '';
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const renderChatItem = ({ item }: { item: ChatRoom }) => {
    const avatarSource = item.image_url && item.image_url.trim() !== ''
      ? item.image_url
      : DEFAULT_AVATAR_URL;

    // Add null check for id
    const itemId = item.id?.toString() || String(Math.random());

    return (
      <ChatItem
        id={itemId}
        name={item.name}
        message={item.latest_message?.content || 'No messages yet'}
        time={item.latest_message ? formatTime(item.latest_message.timestamp) : formatTime(item.joined_at)}
        avatar={avatarSource}
        hasRequest={item.status === 'pending'}
        onPress={() => handleChatPress(item)}
      />
    );
  };


  const renderInvitationItem = ({ item }: { item: Invitation }) => {
    const avatarSource = item.room.image_url && item.room.image_url.trim() !== ''
      ? item.room.image_url
      : DEFAULT_AVATAR_URL;

    return (
      <ChatItem
        id={item.invitation.id.toString()}
        name={item.room.name}
        message={`Invitation from ${item.room.name}`}
        time={formatTime(item.invitation.created_at)}
        avatar={avatarSource}
        hasRequest={true}
        onPress={() => {
          setSelectedChat({
            id: item.room.id,
            name: item.room.name,
            status: 'pending',
            type: item.room.type,
            image_url: item.room.image_url,
            total_members: item.room.total_members,
            created_by: item.room.created_by,
            joined_at: item.room.created_at,
            latest_message: null,
          });
          setShowRequestModal(true);
        }}
      />
    );
  };


  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <LoadingDots />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : (
        <>
          {invitations.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Invitations</Text>
              <FlatList
                data={invitations}
                renderItem={renderInvitationItem}
                keyExtractor={(item) => item.room.id.toString()}

                horizontal={true}
                showsHorizontalScrollIndicator={false}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                    colors={[COLORS.primary]}
                  />
                }
              />
            </>
          )}
          <Text style={styles.sectionTitle}>Chats</Text>
          <FlatList
            data={chats}
            renderItem={renderChatItem}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={handleRefresh}
                colors={[COLORS.primary]}
              />
            }
            ListEmptyComponent={<EmptyState />}
          />
        </>
      )}

      {showRequestModal && selectedChat && (
        <RequestModal
          visible={showRequestModal}
          icon={InfoIcon}
          title={`Would you like to accept ${selectedChat.name}'s message request?`}
          message={`You haven't heard from ${selectedChat.name} before. Accept to start chatting.`}
          acceptText="Accept"
          declineText="Not Accept"
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
          onClose={handleClose}
          buttonStatus="neutral"
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    width: '100%'
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5'
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000'
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    marginLeft: 16,
    color: '#000',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: COLORS.error,
    textAlign: 'center',
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    fontSize: SIZES.medium,
  },
  invitationItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  acceptButton: {
    color: COLORS.primary,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  }

});

export default Chat;
