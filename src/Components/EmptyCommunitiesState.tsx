import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FONTS, { COLORS, SIZES } from '../constants/theme';

const EmptyCommunitiesState = ({ type }) => {
  const messages = {
    integrated: {
      title: "No Communities Joined Yet",
      description: "Join communities to connect with others and start conversations!"
    },
    other: {
      title: "No Available Communities",
      description: "Check back later for new communities to join."
    }
  };

  return (
    <View style={styles.container}>
      <MaterialCommunityIcons 
        name="message-outline"
        size={48}
        color={COLORS.primary}
        style={styles.icon}
      />
      <Text style={styles.title}>{messages[type].title}</Text>
      <Text style={styles.description}>{messages[type].description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SIZES.medium,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.lightGray,
    borderRadius: SIZES.small,
    margin: SIZES.medium,
    minHeight: 160,
  },
  icon: {
    marginBottom: SIZES.medium,
  },
  title: {
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    fontSize: SIZES.large,
    color: COLORS.textHeader,
    marginBottom: SIZES.small,
    textAlign: 'center',
  },
  description: {
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    fontSize: SIZES.font,
    color: COLORS.textColor,
    textAlign: 'center',
  }
});

export default EmptyCommunitiesState;