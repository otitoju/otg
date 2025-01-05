import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import ArrowBack from '../assets/images/Communities/Vector 140.svg';
import PeopleIcon from '../assets/images/Communities/people.svg'; // Adjust the path as necessary
import FONTS, { COLORS, SIZES } from '../constants/theme';


interface CommunityListItemProps {
  name: string;
  members: number;
  image: number;
  status: 'Public' | 'Private';
  onPress: () => void; // Add the onPress prop
}

const CommunityListItem: React.FC<CommunityListItemProps> = ({ name, members, image, status, onPress }) => {
  // Determine the status icon and color based on the status prop
  const isPublic = status === 'Public';
  const statusColor = isPublic ? COLORS.success : COLORS.warning;
  const statusBackgroundColor = isPublic ? COLORS.lightSuccess : COLORS.lightWarning; // Set light background colors for status

  return (
    <TouchableOpacity style={styles.listItem} onPress={onPress}>
      <Image source={image} style={styles.listItemImage} />
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{name}</Text>
        <View style={styles.infoContainer}>
          <View style={styles.membersContainer}>
            <PeopleIcon width={16} height={16} fill={COLORS.faintGray} />
            <Text style={styles.listItemMembers}>{members} Members</Text>
          </View>
          <View style={[styles.statusContainer, { backgroundColor: statusBackgroundColor }]}>
            <View style={[styles.statusDot, { backgroundColor: statusColor }]} />
            <Text style={[styles.listItemStatus, { color: statusColor }]}>{status}</Text>
          </View>
        </View>
      </View>
      <ArrowBack width={11} height={17} fill={COLORS.white} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.backgroundGray,
  },
  listItemImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  listItemContent: {
    flex: 1,
    marginLeft: SIZES.medium,
  },
  listItemTitle: {
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  membersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemMembers: {
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
    marginLeft: 5, // Add some space between the icon and text
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10, // Add some space between the members and status
    paddingVertical: 4, // Add some padding for better visual spacing
    paddingHorizontal: 8, // Add some padding for better visual spacing
    borderRadius: 24, // Optional: add rounded corners
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4, // Make it circular
    marginRight: 5, // Space between the dot and status text
  },
  listItemStatus: {
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    marginLeft: 5, // Add some space between the icon and text
  },
});

export default CommunityListItem;
