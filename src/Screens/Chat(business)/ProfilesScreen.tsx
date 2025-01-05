import React from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';

const { width, height } = Dimensions.get('window');

const ProfileItem = ({ profile }) => (
  <View style={styles.profileItem}>
    {profile.avatar ? (
      <Image source={{ uri: profile.avatar }} style={styles.avatar} />
    ) : (
      <View style={[styles.avatar, styles.avatarPlaceholder]}>
        <Text style={styles.avatarText}>{profile.name.split(' ').map(n => n[0]).join('')}</Text>
      </View>
    )}
    <View style={styles.profileInfo}>
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.location}>{profile.location}</Text>
      <Text style={styles.visits}>{profile.visits} visits</Text>
    </View>
    <View style={styles.rightContent}>
      <Text style={styles.lastVisit}>visited 2 mins ago</Text>
      <TouchableOpacity style={styles.messageButton}>
        <Text style={styles.messageButtonText}>Message</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const ProfilesScreen = () => {
  const profiles = [
    {
      id: '1',
      name: 'Jane Doe',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: '2',
      name: 'Tommy Gbese',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: '3',
      name: 'Dan Nithingale',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: null
    },
    {
      id: '4',
      name: 'Mariam Bolade',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: '5',
      name: 'Adeola Bukola',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: '6',
      name: 'Susan Obinna',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    },
    {
      id: '7',
      name: 'Ada Sike',
      location: 'Ikeja, Lagos',
      visits: '10',
      avatar: 'https://via.placeholder.com/50'
    }
  ];

  const handleBack = () => {
    // Handle back navigation
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <BackIcon width={24} height={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profiles</Text>
            </View>
      <FlatList
        data={profiles}
        renderItem={({ item }) => <ProfileItem profile={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.small,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundGray,
},
backButton: {
    padding: SIZES.small,
    marginRight: SIZES.small,
},
headerTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.black,
    width: width * 0.65,
    textAlign: 'center'
},
  listContent: {
    padding: 16,
  },
  profileItem: {
    flexDirection: 'row',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightBorder,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  avatarPlaceholder: {
    backgroundColor: COLORS.lightBorder,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.defaultText,
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 2,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  location: {
    fontSize: 14,
    color: COLORS.defaultText,
    marginBottom: 2,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  visits: {
    fontSize: 14,
    color: COLORS.defaultText,
  },
  rightContent: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  lastVisit: {
    fontSize: 12,
    color: COLORS.defaultText,
    marginBottom: 4,
  },
  messageButton: {
    backgroundColor: COLORS.backgroundGray,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
  },
  messageButtonText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '500',
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
});

export default ProfilesScreen;