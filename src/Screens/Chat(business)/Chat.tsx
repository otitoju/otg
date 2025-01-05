import React from 'react';
import { View, Text, FlatList, StyleSheet, Platform, StatusBar, TouchableOpacity, Dimensions } from 'react-native';
import ChatItem from './../../Components/ChatItem';
import EmptyState from './../../Components/EmptyState';
import RequestModal from './../../Components/Modal/RequestModal';
import InfoIcon from './../../assets/images/Profile/logout.svg';
import FONTS, { COLORS, SIZES } from '../../constants/theme';


const { width, height } = Dimensions.get('window');

const Chat = () => {
  const [chats, setChats] = React.useState([
    { id: '1', name: 'Jared', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: false },
    { id: '2', name: 'Jane Doe', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: true },
    { id: '3', name: 'Shindyy', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: false },
    { id: '4', name: 'Bissymonee', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: false },
    { id: '5', name: 'Adebaby', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: false },
    { id: '6', name: 'Seerah', message: 'okay sure!!', time: '12:25 PM', avatar: 'https://via.placeholder.com/50', hasRequest: false }
  ]);

  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [selectedChat, setSelectedChat] = React.useState(null);

  const handleChatPress = (chat) => {
    if (chat.hasRequest) {
      setSelectedChat(chat);
      setShowRequestModal(true);
    }
  };

  const handleAcceptRequest = () => {
    if (selectedChat) {
      setChats(prevChats =>
        prevChats.map(chat =>
          chat.id === selectedChat.id ? { ...chat, hasRequest: false } : chat
        )
      );
      setShowRequestModal(false);
      setSelectedChat(null);
    }
  };

  const handleClose = () => {
    setShowRequestModal(false);
    setSelectedChat(null);
  };

  const handleDeclineRequest = () => {
    if (selectedChat) {
      setChats(prevChats => prevChats.filter(chat => chat.id !== selectedChat.id));
      setShowRequestModal(false);
      setSelectedChat(null);
    }
  };

  const Footer = () => (
    <View style={styles.footer}>
      <View>
        <Text style={styles.upgradeText}>Upgrade to Chat more people</Text>
        <Text style={styles.upgradeSubtext}>Upgrade to Chat more people</Text>
      </View>
      <TouchableOpacity style={styles.upgradeButton}>
        <Text style={styles.upgradeButtonText}>Upgrade</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <FlatList
        data={chats}
        renderItem={({ item }) => (
          <ChatItem
            {...item}
            onPress={() => handleChatPress(item)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<EmptyState upgrade={true} />}
        ListFooterComponent={<Footer />}
        ListFooterComponentStyle={styles.footerContainer}
      />
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
  footer: {
    padding: 16,
    alignItems: 'center',
    backgroundColor: COLORS.white,
    width: width - 30,
    flexDirection: 'row',
    marginTop: height / 5,
    alignSelf: 'center', 
    justifyContent: 'space-between',
    borderRadius: SIZES.font,
    elevation: 2, // Shadow for Android

    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginVertical:15
  }
  ,
  footerContainer: {
    marginTop: 'auto'
  },
  upgradeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4
  },
  upgradeSubtext: {
    fontSize: 14,
    color: COLORS.defaultText,
    marginBottom: 16
  },
  upgradeButton: {
    backgroundColor: COLORS.backgroundGray,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderRadius: 20
  },
  upgradeButtonText: {
    color: COLORS.primary,
    fontSize: 14,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  }
});

export default Chat;