import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar, Platform } from 'react-native';
import Arrow from '../../assets/images/Registration/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import routes from '../../Routes/routes';

const VerifyEmailScreen = ({ route }: any) => {
  const [email, setEmail] = useState('');
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow width={20} height={20} style={styles.backArrow} />
        </TouchableOpacity>

        <Text style={styles.title}>Enter your email address</Text>
        <Text style={styles.subtitle}>Fill the details below to create a profile</Text>

        <Text style={styles.inputLabel}>Email address</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <TouchableOpacity onPress={() => navigation.navigate(routes.PHONEINPUTSCREEN)} style={styles.switchLink}>
          <Text style={styles.switchLinkText}>Use Phone number Instead</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[
            styles.continueButton,
            !email && styles.continueButtonDisabled
          ]} 
          onPress={() => navigation.navigate(routes.VERIFYEMAILSCREEN)}
          disabled={!email}
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
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    backgroundColor: '#F1F5F9',
    marginBottom: 12,
    height: 48,
    borderRadius: 30,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.black,
  },
  switchLink: {
    marginBottom: 24,
  },
  switchLinkText: {
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

export default VerifyEmailScreen;
