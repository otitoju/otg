import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  StatusBar,
  ActivityIndicator,
  Modal,
  Animated as RNAnimated,
  StyleSheet,
  Alert,
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { io, Socket } from 'socket.io-client';

// Import SVG icons
import Arrow from '../../assets/images/Communities/arrow-right.svg';
import Plus from '../../assets/images/Communities/plus.svg';
import Camera from '../../assets/images/Communities/Camera.svg';
import Doc from '../../assets/images/Communities/docs.svg';

// Types
// Add socket-related types
interface TypingUser {
  user_id: string;
  username?: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'other';
  timestamp: string;
  type: 'text' | 'image' | 'document';
  fileUrl?: string;
  fileName?: string;
  senderAvatar?: string | null;
}

interface RoomUser {
  user_id: string;
  joined_at: string;
}

interface RoomDetails {
  name: string;
  image_url?: string;
  total_members?: number;
}

interface RoomUsers {
  data: {
    users: RoomUser[];
    total_members: number;
  };
}

// Components
const SidePanel: React.FC<{
  visible: boolean;
  onClose: () => void;
  roomDetails: RoomDetails | null;
  roomUsers: RoomUsers | null;
}> = ({ visible, onClose, roomDetails, roomUsers }) => {
  const slideAnim = useRef(new RNAnimated.Value(-300)).current;

  useEffect(() => {
    RNAnimated.timing(slideAnim, {
      toValue: visible ? 0 : -300,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [visible]);

  const handleLeaveGroup = async () => {
    try {
      console.log('Initiating leave group process...');

      // Validate user ID
      const userId = await AsyncStorage.getItem('user');
      if (!userId) {
        console.error('User not logged in.');
        Alert.alert('Error', 'You must be logged in to leave the group.');
        return;
      }
      const parsedUser = JSON.parse(userId);
      const userIdValue = parsedUser?.user?.id;
      if (!userIdValue) {
        console.error('Invalid user ID.');
        Alert.alert('Error', 'Unable to retrieve user information.');
        return;
      }
      console.log(`User ID retrieved: ${userIdValue}`);

      // Validate room ID
      const roomId = roomDetails?.id;
      if (!roomId) {
        console.error('Invalid room ID.');
        Alert.alert('Error', 'Room information is missing. Please try again.');
        return;
      }
      console.log(`Room ID: ${roomId}`);

      // Log request data
      const requestData = { room_id: roomId, user_id: userIdValue };
      console.log('Request Data:', requestData);

      // Make DELETE request
      const response = await axios.delete(
        'http://192.168.0.114:5000/api/v1/chat/room/member/remove',
        {
          data: requestData, // DELETE requests pass data here
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        console.log('Leave group successful:', response.data);
        Alert.alert('Success', 'You have successfully left the group.');
        onClose(); // Close the side panel
      } else {
        console.error('Failed to leave group. Response:', response.data);
        Alert.alert('Error', response.data.message || 'Failed to leave the group.');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Network or server error:', error.response || error.message);
        const serverMessage = error.response?.data?.message || 'An error occurred on the server.';
        Alert.alert('Error', serverMessage);
      } else {
        console.error('Unexpected error:', error.message);
        Alert.alert('Error', 'An unexpected error occurred. Please try again.');
      }
    }
  };



  const renderMember = ({ item }: { item: RoomUser }) => (
    <View style={styles.memberItem}>
      <Image source={PLACEHOLDER_PROFILE} style={styles.memberAvatar} />
      <View>
        <Text style={styles.memberName}>{item.username}</Text>
        <Text style={styles.memberJoinDate}>
          Joined {new Date(item.joined_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <RNAnimated.View
          style={[
            styles.sidePanel,
            {
              transform: [{ translateX: slideAnim }],
            },
          ]}
        >
          <View style={styles.sidePanelHeader}>
            <Text style={styles.sidePanelTitle}>Group Info</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.groupInfo}>
            <Image
              source={roomDetails?.image_url ? { uri: roomDetails.image_url } : PLACEHOLDER_PROFILE}
              style={styles.groupAvatar}
            />
            <Text style={styles.groupName}>{roomDetails?.name || 'Chat Room'}</Text>
            <Text style={styles.memberCount}>
              {roomUsers?.data?.total_members || 0} members
            </Text>
          </View>

          <FlatList
            data={roomUsers?.data?.users || []}
            renderItem={renderMember}
            keyExtractor={(item) => item.user_id}
            style={styles.membersList}
          />

          <TouchableOpacity style={styles.leaveButton} onPress={handleLeaveGroup}>
            <Text style={styles.leaveButtonText}>Leave Group</Text>
          </TouchableOpacity>
        </RNAnimated.View>
      </View>
    </Modal>
  );
};


const PLACEHOLDER_PROFILE = require('../../assets/images/Communities/placeholder.png');
const API_BASE_URL = 'http://192.168.0.114:5000/api/v1';

const ChatScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [roomDetails, setRoomDetails] = useState<RoomDetails | null>(null);
  const [senderId, setSenderId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sidePanelVisible, setSidePanelVisible] = useState(false);
  const [roomUsers, setRoomUsers] = useState<RoomUsers | null>(null);
  const flatListRef = useRef<FlatList<Message>>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [typingUsers, setTypingUsers] = useState<TypingUser[]>([]);
  const typingTimeoutRef = useRef<NodeJS.Timeout | null>(null);


  const { roomId } = route.params as { roomId: string };

  // Initialize socket connection
  useEffect(() => {
    if (senderId) {
      const newSocket = io('http://192.168.0.114:5000', {
        transports: ['websocket'],
        query: {
          userId: senderId
        }
      });

      // Socket connection events
      newSocket.on('connect', () => {
        console.log('Socket connected');
        // Join the room
        newSocket.emit('join_room', { room_id: roomId, user_id: senderId });
      });

      newSocket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
        setError('Failed to connect to chat server');
      });

      // Handle incoming messages
      // Modified message handling to prevent duplicates
      newSocket.on('new_message', (message) => {
        // Check if this is a message we sent (has a temp_id)
        const existingMessageIndex = messages.findIndex(msg =>
          msg.id === message.temp_id || msg.id === message.id.toString()
        );

        const formattedMessage: Message = {
          id: message.id.toString(),
          content: message.content,
          sender: parseInt(message.sender_id) === parseInt(senderId) ? 'user' : 'other',
          timestamp: new Date(message.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          }).toLowerCase(),
          type: message.media_url ? 'image' : 'text',
          fileUrl: message.media_url,
          fileName: message.media_url?.split('/').pop(),
          senderAvatar: parseInt(message.sender_id) === parseInt(senderId) ? null : message.sender_avatar,
        };

        setMessages(prev => {
          if (existingMessageIndex !== -1) {
            // Replace temporary message with server-confirmed message
            const newMessages = [...prev];
            newMessages[existingMessageIndex] = formattedMessage;
            return newMessages;
          } else {
            // Add new message from other users
            return [...prev, formattedMessage];
          }
        });

        // Scroll to bottom when new message arrives
        flatListRef.current?.scrollToEnd({ animated: true });
      });

      // Handle typing indicators
      newSocket.on('user_typing', ({ user_id }) => {
        setTypingUsers(prev => {
          if (!prev.find(user => user.user_id === user_id)) {
            return [...prev, { user_id }];
          }
          return prev;
        });
      });

      newSocket.on('user_stopped_typing', ({ user_id }) => {
        setTypingUsers(prev => prev.filter(user => user.user_id !== user_id));
      });

      // Handle message status updates
      newSocket.on('message_status_update', ({ message_id, status }) => {
        setMessages(prev => prev.map(msg =>
          msg.id === message_id ? { ...msg, status } : msg
        ));
      });

      // Store socket instance
      setSocket(newSocket);

      // Cleanup on unmount
      return () => {
        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }
        newSocket.emit('leave_room', { room_id: roomId, user_id: senderId });
        newSocket.disconnect();
      };
    }
  }, [senderId, roomId]);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const loggedInUser = await AsyncStorage.getItem('user');
        if (!loggedInUser) {
          throw new Error('User not logged in');
        }
        const parsedUser = JSON.parse(loggedInUser);
        setSenderId(parsedUser.user.id);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load user information');
      }
    };

    fetchUserId();

    // Cleanup function
    return () => {
      setMessages([]);
      setRoomDetails(null);
      setRoomUsers(null);
    };
  }, []);

  useEffect(() => {
    if (senderId) {
      const loadData = async () => {
        try {
          setIsLoading(true);
          await Promise.all([
            fetchRoomDetails(),
            fetchMessages(),
            fetchRoomUsers()
          ]);
        } catch (error) {
          setError(error instanceof Error ? error.message : 'An error occurred');
        } finally {
          setIsLoading(false);
        }
      };

      loadData();
    }
  }, [roomId, senderId]);

  const fetchRoomUsers = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/rooms/${roomId}/users`);
      console.log('Room users data:', response.data); // Log the data
      if (response.data.success) {
        setRoomUsers(response.data);
      } else {
        throw new Error('Failed to load room users');
      }
    } catch (error) {
      console.error('Error fetching room users:', error);
      throw error;
    }
  };


  const fetchRoomDetails = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/room/${roomId}`);
      if (response.data.success) {
        setRoomDetails(response.data.data);
      } else {
        throw new Error('Failed to load room details');
      }
    } catch (error) {
      console.error('Error fetching room details:', error);
      throw error;
    }
  };

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/chat/room/${roomId}/messages`, {
        params: { userId: senderId },
      });

      if (response.data.success) {
        const formattedMessages: Message[] = response.data.data.messages.map((msg: any) => {
          const isUserMessage = parseInt(msg.sender_id) === parseInt(senderId as string);
          return {
            id: msg.id.toString(),
            content: msg.content,
            sender: isUserMessage ? 'user' : 'other',
            timestamp: new Date(msg.timestamp).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit'
            }).toLowerCase(),
            type: msg.media_url ? 'image' : 'text',
            fileUrl: msg.media_url,
            fileName: msg.media_url?.split('/').pop(),
            senderAvatar: isUserMessage ? null : msg.sender_avatar,
          };
        });
        setMessages(formattedMessages);
      } else {
        throw new Error('Failed to load messages');
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  };

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibrary({
        mediaType: 'photo',
        quality: 1,
      });
  
      if (result.assets?.[0]) {
        const image = result.assets[0];
  
        // Create form data
        const formData = new FormData();
        formData.append('room_id', roomId);
        formData.append('sender_id', senderId);
        formData.append('content', ''); // Empty content for image messages
  
        // Append the image file
        formData.append('media', {
          uri: image.uri,
          type: image.type || 'image/jpeg',
          name: image.fileName || 'image.jpg',
        });
  
        // Show loading state
        setIsUploading(true);
  
        try {
          const response = await axios.post(
            `${API_BASE_URL}/chat/message/send`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
              },
            }
          );
  
          if (response.data.success) {
            // Emit the message through socket after successful upload
            const messageData = {
              room_id: roomId,
              sender_id: senderId,
              content: '', // Content is empty for images
              media_url: response.data.data.media_url, // Use uploaded image URL from the server
              timestamp: new Date().toISOString(),
            };
  
            // Emit message through socket
            socket.emit('send_message', messageData);
  
            console.log('Image uploaded and message sent successfully');
          }
        } catch (error) {
          console.error('Error uploading image:', error);
          Alert.alert(
            'Error',
            'Failed to send image. Please try again.'
          );
        } finally {
          setIsUploading(false);
        }
      }
    } catch (error) {
      console.error('Error selecting image:', error);
      Alert.alert(
        'Error',
        'Failed to select image. Please try again.'
      );
    }
  };
  

  // Add loading state for uploads
  const [isUploading, setIsUploading] = useState(false);

  const sendMessage = async (type: Message['type'], content: any = '') => {
    if (type === 'text' && !inputText.trim()) return;
    if (!senderId || !socket) {
      setError('Unable to send message');
      return;
    }

    const tempId = `temp-${Date.now()}`;
    const timestamp = new Date().toISOString();

    // Create message object for socket
    const messageData = {
      room_id: roomId,
      sender_id: senderId,
      content: type === 'text' ? inputText.trim() : '',
      media_url: type !== 'text' ? content.uri : null,
      timestamp,
      temp_id: tempId // Add temporary ID to track this message
    };


    setInputText('');
    Keyboard.dismiss();

    // Emit message through socket
    socket.emit('send_message', messageData);
  };

  // Handle typing indicator
  const handleTyping = () => {
    if (!socket || !senderId) return;

    socket.emit('typing_start', { room_id: roomId, user_id: senderId });

    // Clear existing timeout
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    // Set new timeout
    typingTimeoutRef.current = setTimeout(() => {
      socket.emit('typing_end', { room_id: roomId, user_id: senderId });
    }, 1500);
  };

  const selectDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles]
      });
      if (result[0]) {
        sendMessage('document', result[0]);
      }
    } catch (err) {
      if (!DocumentPicker.isCancel(err)) {
        console.error('Error picking document:', err);
        setError('Failed to select document');
      }
    }
  };

  const EmptyStateMessage = () => (
    <View style={styles.emptyStateContainer}>
      <Text style={styles.emptyStateTitle}>No messages yet</Text>
      <Text style={styles.emptyStateText}>Be the first to start the conversation!</Text>
      <Image
        source={require('../../assets/images/Chat/Empty chat icon.svg')}
        style={styles.emptyStateImage}
      />
    </View>
  );

  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorText}>{error}</Text>
      <TouchableOpacity
        style={styles.retryButton}
        onPress={() => {
          setError(null);
          setIsLoading(true);
          Promise.all([
            fetchRoomDetails(),
            fetchMessages(),
            fetchRoomUsers()
          ]).finally(() => setIsLoading(false));
        }}
      >
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
  );

  const renderInput = () => (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.inputContainer}
    >
      {isUploading ? (
        <View style={styles.uploadingContainer}>
          <ActivityIndicator size="small" color={COLORS.primary} />
          <Text style={styles.uploadingText}>Sending image...</Text>
        </View>
      ) : (
        <>
          {/* <TouchableOpacity onPress={selectDocument} style={styles.addButton}>
            <Plus width={24} height={24} fill={COLORS.primary} />
          </TouchableOpacity> */}
          <TextInput
            style={styles.input}
            value={inputText}
            onChangeText={(text) => {
              setInputText(text);
              handleTyping();
            }}
            placeholder="Type a message"
            placeholderTextColor={COLORS.textPlaceholder}
          />
          <TouchableOpacity onPress={selectImage} style={styles.sendButton}>
            <Camera width={24} height={24} fill={COLORS.white} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => sendMessage('text')}
            style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
            disabled={!inputText.trim()}
          >
            <Text style={[styles.sendButtonText, !inputText.trim() && styles.sendButtonTextDisabled]}>
              Send
            </Text>
          </TouchableOpacity>
        </>
      )}
    </KeyboardAvoidingView>
  );

  // Add typing indicator component
  const renderTypingIndicator = () => {
    if (typingUsers.length === 0) return null;

    return (
      <View style={styles.typingIndicator}>
        <Text style={styles.typingText}>
          {typingUsers.length === 1
            ? 'Someone is typing...'
            : `${typingUsers.length} people are typing...`}
        </Text>
      </View>
    );
  };

  const renderMessage = ({ item }: { item: Message }) => (
    <View style={styles.messageWrapper}>
      <Text style={[
        styles.timestamp,
        item.sender === 'user' ? styles.timestampRight : styles.timestampLeft
      ]}>
        {item.timestamp}
      </Text>
      <View style={[
        styles.messageContainer,
        item.sender === 'user' ? styles.userMessage : styles.otherMessage
      ]}>
        {item.sender === 'other' && (
          <Image
            source={item.senderAvatar ? { uri: item.senderAvatar } : PLACEHOLDER_PROFILE}
            style={styles.avatar}
          />
        )}
        <View style={[
          styles.messageBubble,
          item.sender === 'user' ? styles.userBubble : styles.otherBubble
        ]}>
          {item.type === 'text' && (
            <Text style={item.sender === 'user' ? styles.userMessageText : styles.otherMessageText}>
              {item.content}
            </Text>
          )}
          {item.type === 'image' && item.fileUrl && (
            <Image
              source={{ uri: item.fileUrl }}
              style={styles.messageImage}
              defaultSource={require('../../assets/images/Communities/people.svg')}
            />
          )}
          {item.type === 'document' && item.fileName && (
            <View style={styles.documentContainer}>
              <Doc width={24} height={24} fill={COLORS.primary} />
              <Text style={styles.documentText}>{item.fileName}</Text>
            </View>
          )}
        </View>
        {item.sender === 'user' && <Image source={PLACEHOLDER_PROFILE} style={styles.avatar} />}
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Loading chat...</Text>
      </View>
    );
  }

  if (error) {
    return <ErrorState />;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow width={24} height={24} fill={COLORS.white} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.headerContent}
          onPress={() => setSidePanelVisible(true)}
        >
          <Image
            source={roomDetails?.image_url ? { uri: roomDetails.image_url } : PLACEHOLDER_PROFILE}
            style={styles.communityAvatar}
          />
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerTitle}>{roomDetails?.name || 'Chat Room'}</Text>
            <Text style={styles.headerSubtitle}>{roomDetails?.total_members || 0} members</Text>
          </View>
        </TouchableOpacity>
      </View>

      <SidePanel
        visible={sidePanelVisible}
        onClose={() => setSidePanelVisible(false)}
        roomDetails={roomDetails}
        roomUsers={roomUsers}
      />

      {messages.length === 0 ? (
        <EmptyStateMessage />
      ) : (
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={renderMessage}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messageList}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd({ animated: true })}
          ListEmptyComponent={EmptyStateMessage}
          ListFooterComponent={renderTypingIndicator}
        />
      )}


      {renderInput()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  uploadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingVertical: SIZES.small,
  },
  uploadingText: {
    marginLeft: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textColor,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
  },
  typingIndicator: {
    padding: SIZES.small,
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
    marginHorizontal: SIZES.medium,
    marginVertical: SIZES.small,
    borderRadius: SIZES.small,
  },
  typingText: {
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontStyle: 'italic',
  },
  loadingText: {
    marginTop: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textColor,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.lightBg,
    padding: SIZES.medium,
  },
  errorText: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.error,
    textAlign: 'center',
    marginBottom: SIZES.medium,
  },
  retryButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderRadius: SIZES.small,
  },
  retryButtonText: {
    color: COLORS.white,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: SIZES.medium,
  },
  emptyStateImage: {
    width: 200,
    height: 200,
    marginBottom: SIZES.medium,
  },
  emptyStateTitle: {
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    fontSize: SIZES.large,
    color: COLORS.textTitle,
    marginBottom: SIZES.small,
  },
  emptyStateText: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    fontSize: SIZES.medium,
    color: COLORS.textColor,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginHorizontal: 5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBg,
  },
  backButton: {
    padding: SIZES.small,
  },
  communityAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: SIZES.small,
  },
  headerTextContainer: {
    flex: 1,
    marginLeft: SIZES.small,
  },
  headerTitle: {
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    fontSize: SIZES.large,
    color: COLORS.textTitle,
  },
  headerSubtitle: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    fontSize: SIZES.small,
    color: COLORS.textColor,
  },
  messageWrapper: {
    marginVertical: SIZES.small / 2,
  },
  messageList: {
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
  },
  messageContainer: {
    flexDirection: 'row',
    maxWidth: '80%',
  },
  timestamp: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textColor,
    marginBottom: 4,
    fontSize: 11,
  },
  timestampLeft: {
    textAlign: 'left',
  },
  timestampRight: {
    textAlign: 'right',
  },
  userMessage: {
    justifyContent: 'flex-end',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
  },
  messageBubble: {
    padding: SIZES.small,
    borderRadius: SIZES.small,
    marginHorizontal: 10
  },
  userBubble: {
    backgroundColor: COLORS.primary,
    borderBottomRightRadius: 0
  },
  otherBubble: {
    backgroundColor: COLORS.white,
    borderBottomLeftRadius: 0
  },
  messageText: {
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  userMessageText: {
    color: COLORS.white,
  },
  otherMessageText: {
    color: COLORS.textColor,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: SIZES.small,
    marginVertical: SIZES.small / 2,
  },
  documentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: SIZES.small / 2,
  },
  documentText: {
    marginLeft: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.small,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.lightBg,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: SIZES.small,
    borderRadius: SIZES.small,
    backgroundColor: COLORS.lightBg,
    color: COLORS.textColor,
  },
  addButton: {
    paddingHorizontal: SIZES.small,
  },
  sendButton: {
    paddingHorizontal: SIZES.small,
  },
  sendButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonTextDisabled: {
    color: COLORS.textPlaceholder,
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Side Panel Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  sidePanel: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 300,
    height: '100%',
    backgroundColor: COLORS.white,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  sidePanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBg,
  },
  sidePanelTitle: {
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    fontSize: SIZES.large,
    color: COLORS.textTitle,
  },
  closeButton: {
    padding: SIZES.small,
  },
  closeButtonText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.textColor,
  },
  groupInfo: {
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBg,
  },
  groupAvatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: SIZES.small,
  },
  groupName: {
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    fontSize: SIZES.large,
    color: COLORS.textTitle,
    marginBottom: SIZES.small / 2,
  },
  memberCount: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    fontSize: SIZES.medium,
    color: COLORS.textColor,
  },
  membersList: {
    flex: 1,
  },
  memberItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBg,
  },
  memberAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: SIZES.small,
  },
  memberName: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    fontSize: SIZES.medium,
    color: COLORS.textColor,
  },
  leaveButton: {
    margin: SIZES.medium,
    padding: SIZES.medium,
    backgroundColor: '#FF4444',
    borderRadius: SIZES.small,
    alignItems: 'center',
  },
  leaveButtonText: {
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  memberJoinDate: {
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    fontSize: SIZES.small,
    color: COLORS.textColor,
    opacity: 0.7,
  },
});

export default ChatScreen;