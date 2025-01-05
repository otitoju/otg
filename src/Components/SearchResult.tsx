import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { COLORS, FONTS } from './constants';

export const SearchResult = ({ name }) => {
  return (
    <TouchableOpacity style={styles.container}>
      <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.thumbnail} />
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <View style={styles.ratingContainer}>
          <Image source={require('./assets/star.png')} style={styles.star} />
          <Image source={require('./assets/star.png')} style={styles.star} />
          <Image source={require('./assets/star.png')} style={styles.star} />
          <Image source={require('./assets/star.png')} style={styles.star} />
          <Image source={require('./assets/star.png')} style={styles.star} />
          <Text style={styles.ratingText}>150 reviews</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.borderColor,
  },
  thumbnail: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 16,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textTitle,
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
    marginLeft: 8,
  },
});