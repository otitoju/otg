import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

const CustomButton = ({ title, onPress, style, loading, disabled, textStyle }: any) => {
  return (
    <TouchableOpacity style={[styles.button, style, disabled && styles.disabled]} onPress={disabled ? undefined : onPress}>
      <Text style={[styles.buttonText, textStyle]}>{title}</Text>
      {loading && (
        <ActivityIndicator
          style={{ marginLeft: 16 }}
          size={18}
          color={'white'}
        />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    flexDirection: 'row',
    // opacity: 0.8
  },
  buttonText: {
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    fontSize: SIZES.medium,
    color: COLORS.white,
  },
  disabled: {
    backgroundColor: '#ccc',
    opacity: 0.6,
  },
});

export default CustomButton;
