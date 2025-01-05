import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CountryPicker from 'react-native-country-picker-modal';
import Arrow from '../../assets/images/Registration/arrow-right.svg';
import FONTS, { COLORS, SIZES } from '../../../src/constants/theme';
import routes from '../../Routes/routes';

const PhoneInputScreen = ({ route }: any) => {
  const [countryCode, setCountryCode] = useState<any>('NG');
  const [callingCode, setCallingCode] = useState('234');
  const [phoneNumber, setPhoneNumber] = useState(route?.params?.phoneNumber || '');

  const navigation: any = useNavigation();

  const onSelect = (country: any) => {
    setCountryCode(country.cca2);
    setCallingCode(country.callingCode[0]);
  };

  const handlePhoneNumberChange = (text: string) => {
    // Remove any non-digit characters
    const cleaned = text.replace(/\D/g, '');
    setPhoneNumber(cleaned);
  };

  const formatPhoneNumber = (number: string) => {
    // Format as "00 000 000"
    const match = number.match(/^(\d{0,2})(\d{0,3})(\d{0,3})$/);
    if (!match) return number;

    return match
      .slice(1)
      .filter(group => group)
      .join(' ');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow width={20} height={20} style={styles.backArrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Enter your Phone number</Text>
        <Text style={styles.subtitle}>Fill the details below to create a profile</Text>

        <Text style={styles.inputLabel}>Phone number</Text>
        <View style={styles.phoneNumberContainer}>
          <CountryPicker
            withFlag
            withCallingCode
            withFilter
            countryCode={countryCode}
            onSelect={onSelect}
            visible={false}
            containerButtonStyle={styles.countryPickerButton}
          />
          <Text style={styles.callingCode}>+{callingCode}</Text>
          <TextInput
            style={styles.phoneNumberInput}
            value={formatPhoneNumber(phoneNumber)}
            onChangeText={handlePhoneNumberChange}
            placeholder="00 000 000"
            keyboardType="numeric"
            maxLength={11} // Including spaces
          />
        </View>

        <TouchableOpacity onPress={() => navigation.navigate(routes.EMAILINPUTSCREEN)} style={styles.emailLink}>
          <Text style={styles.emailLinkText}>Use Email address Instead</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.continueButton,
            phoneNumber.length < 8 && styles.continueButtonDisabled
          ]}
          onPress={() => navigation.navigate(routes.VERIFYPHONESCREEN, { phoneNumber })}
          disabled={phoneNumber.length < 8} // Disable button if phone number is less than 8 digits
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  backButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  backArrow: {
    color: COLORS.black,
  },
  title: {
    fontSize: SIZES.large,
    fontWeight: '600',
    color: COLORS.black,
    marginBottom: 8,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  subtitle: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    marginBottom: 32,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  inputLabel: {
    fontSize: SIZES.font,
    color: COLORS.black,
    marginBottom: 8,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  phoneNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.backgroundGray,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  countryPickerButton: {
    marginRight: 8,
  },
  callingCode: {
    fontSize: SIZES.font,
    color: COLORS.black,
    marginRight: 8,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  phoneNumberInput: {
    flex: 1,
    fontSize: SIZES.font,
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    padding: 0,
  },
  emailLink: {
    marginBottom: 24,
  },
  emailLinkText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  continueButtonDisabled: {
    backgroundColor: '#0066FF80',
  },
  continueButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
});

export default PhoneInputScreen;
