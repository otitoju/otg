import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';
 // Adjust the import path as needed
import Plus from '../assets/images/Communities/add.svg';
const { width, height } = Dimensions.get('window');

interface CommunityHeaderProps {
  onAddPress: () => void;
}

const CommunityHeader: React.FC<CommunityHeaderProps> = ({ onAddPress }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>Communities</Text>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Plus  width={24} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.large,
    paddingVertical: SIZES.medium,
    width:width
  },
  title: {
    color: COLORS.textTitle,
    fontSize: 34, // Adjust this value to match the exact size in the image
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CommunityHeader;
