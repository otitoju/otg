import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

interface HobbyItemProps {
  name: string;
  icon: JSX.Element;
  isSelected: boolean;
  onSelect: () => void;
}

const HobbyItem: React.FC<HobbyItemProps> = ({ name, icon, isSelected, onSelect }) => {
  return (
    <TouchableOpacity
      style={[
        styles.hobbyContainer,
        isSelected ? styles.selectedHobbyContainer : styles.unselectedHobbyContainer,
      ]}
      onPress={onSelect}
    >
      <Text
        style={[
          styles.hobbyText,
          isSelected ? styles.selectedHobbyText : styles.unselectedHobbyText,
        ]}
      >
        {name}
      </Text>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  hobbyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 10,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: COLORS.faintGray,
  },
  selectedHobbyContainer: {
    backgroundColor: '#007AFF',
  },
  unselectedHobbyContainer: {
    backgroundColor: COLORS.lightBg,
  },
  hobbyText: {
    marginRight: 10,
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: '#0F172A'
  },
  selectedHobbyText: {
    color: '#fff',
  },
  unselectedHobbyText: {
    color: '#333',
  },
});

export default HobbyItem;
