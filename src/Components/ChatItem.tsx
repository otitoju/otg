// ChatItem.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

interface ChatItemProps {
  id: string;
  name: string;
  message: string;
  time: string;
  avatar: string;
  hasRequest?: boolean;
  onPress: () => void;
}

const ChatItem: React.FC<ChatItemProps> = ({
  name,
  message,
  time,
  avatar,
  hasRequest = false,
  onPress,
}) => {
  const [imageError, setImageError] = React.useState(false);
  const DEFAULT_AVATAR = require('../assets/images/Communities/placeholder.png'); // Make sure to have this asset

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatarContainer}>
        <Image
          source={imageError ? DEFAULT_AVATAR : { uri: avatar }}
          style={styles.avatar}
          onError={handleImageError}
        />
        {hasRequest && <View style={styles.requestBadge} />}
      </View>
      
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={styles.name} numberOfLines={1}>{name}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
        <Text style={styles.message} numberOfLines={2}>{message}</Text>
      </View>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F5F5F5'
  },
  contentContainer: {
    flex: 1,
    marginLeft: 12
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000000'
  },
  requestBadge: {
    marginLeft: 8,
    color: COLORS.warning,
    fontSize: 14,
    backgroundColor:COLORS.warningBg, 
    padding:2,
    borderRadius:10
  },
  message: {
    color: '#666666',
    marginTop: 4,
    fontSize: 14
  },
  time: {
    color: '#666666',
    fontSize: 12,
    marginLeft: 8
  }
});

export default ChatItem;