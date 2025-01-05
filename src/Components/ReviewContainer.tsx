import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

// Sample reviews data
const reviewsData = [
  { id: '1', label: 'Amazing', strength: 5 },
  { id: '2', label: 'Good', strength: 70 },
  { id: '3', label: 'Average', strength: 50 },
  { id: '4', label: 'Poor', strength: 30 },
];

const ReviewContainer = () => {
  return (
    <View style={styles.container}>
      {reviewsData.map((review) => (
        <View key={review.id} style={styles.reviewItem}>
          {/* Label */}
          <Text style={styles.label}>{review.label}</Text>

          {/* Strength Bar */}
          <View style={styles.strengthBarContainer}>
            <View style={[styles.strengthBar, { width: `${review.strength}%`, backgroundColor: '#007bff' }]} />
            <View style={[styles.remainingBar, { width: `${100 - review.strength}%`, backgroundColor: '#ccc' }]} />
          </View>

          {/* Actual Strength */}
          <Text style={styles.strengthText}>{review.strength}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // padding: 20,
  },
  reviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  label: {
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: '#333',
    width: 60,
    marginRight: 5,
  },
  strengthBarContainer: {
    flexDirection: 'row',
    height: 3,
    borderRadius: 5,
    overflow: 'hidden',
    flex: 1,
    marginRight: 5,
  },
  strengthBar: {
    height: '100%',
  },
  remainingBar: {
    height: '100%',
  },
  strengthText: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    width: 50, 
  },
});

export default ReviewContainer;
