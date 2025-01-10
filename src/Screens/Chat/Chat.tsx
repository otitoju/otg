// Chat.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, RefreshControl, StatusBar, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ChatItem from './../../Components/ChatItem';
import EmptyState from './../../Components/EmptyState';
import RequestModal from './../../Components/Modal/RequestModal';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import LoadingDots from './../../Components/LoadingDots';
import { useNavigation } from '@react-navigation/native';
import InfoIcon from './../../assets/images/Profile/logout.svg';

// Constants
const DEFAULT_AVATAR_URL = 'https://yourapp.com/default-avatar.png'; // Replace with your default avatar
const API_BASE_URL = 'http://192.168.0.114:5000/api/v1';

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

const Chat = () => {
  const navigation = useNavigation();
  const [chats, setChats] = useState<ChatRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [selectedChat, setSelectedChat] = useState<ChatRoom | null>(null);

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
    if (currentUserId) {
      fetchChats();
    }
  }, [currentUserId]);

  const fetchChats = async () => {
    if (!currentUserId) return;

    try {
      setLoading(true);
      const response = await axios.get<ApiResponse>(`${API_BASE_URL}/chat/conversations`, {
        params: { user_id: currentUserId },
      });

      if (response.data.success) {
        setChats(response.data.data.rooms);
        setError(null);
      } else {
        setError('Failed to fetch chats');
      }
    } catch (err) {
      setError('Error connecting to the server');
      console.error('Error fetching chats:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleRefresh = () => {
    if (!currentUserId) return;
    setRefreshing(true);
    fetchChats();
  };

  const handleChatPress = (chat: ChatRoom) => {
    if (!currentUserId) return;

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
    if (!selectedChat || !currentUserId) return;

    try {
      // Assuming you have an API endpoint to accept chat requests
      await axios.post(`${API_BASE_URL}/chat/accept-request`, {
        room_id: selectedChat.id,
        user_id: currentUserId,
      });

      setChats((prevChats) =>
        prevChats.map((chat) =>
          chat.id === selectedChat.id ? { ...chat, status: 'accepted' } : chat
        )
      );
    } catch (error) {
      console.error('Error accepting request:', error);
      setError('Failed to accept chat request');
    } finally {
      setShowRequestModal(false);
      setSelectedChat(null);
    }
  };

  const handleDeclineRequest = async () => {
    if (!selectedChat || !currentUserId) return;

    try {
      // Assuming you have an API endpoint to decline chat requests
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
    // Validate and prepare image URL
    const avatarSource = item.image_url && item.image_url.trim() !== '' 
      ? item.image_url 
      : DEFAULT_AVATAR_URL;

    return (
      <ChatItem
        id={item.id.toString()}
        name={item.name}
        message={item.latest_message?.content || 'No messages yet'}
        time={item.latest_message ? formatTime(item.latest_message.timestamp) : formatTime(item.joined_at)}
        avatar={avatarSource}
        hasRequest={item.status === 'pending'}
        onPress={() => handleChatPress(item)}
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
        <FlatList
          data={chats}
          renderItem={renderChatItem}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={handleRefresh}
              colors={[COLORS.primary]} // Add your app's primary color
            />
          }
          ListEmptyComponent={<EmptyState />}
        />
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
  }
});

export default Chat;