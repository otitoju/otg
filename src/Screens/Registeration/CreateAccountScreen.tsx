import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import Instagram from '../../assets/images/Registration/instagram.svg';
import Google from '../../assets/images/Registration/google.svg';
import Bg from '../../assets/images/Registration/apple.svg';
import routes from '../../Routes/routes';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateAccountScreen = () => {
  const navigation: any = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.subtitle}>
          Create an account or login to get started
        </Text>

        <TouchableOpacity style={styles.transparentButton} onPress={() => {}}>
          <Bg width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.transparentButton} onPress={() => {}}>
          <Instagram width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Instagram</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.transparentButton} onPress={() => {}}>
          <Google width={24} height={24} />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.dividerContainer}>
          <View style={styles.divider} />
          <Text style={styles.dividerText}>Or</Text>
          <View style={styles.divider} />
        </View>

        <TouchableOpacity
          style={styles.solidButton}
          // onPress={() => navigation.navigate(routes.SETUPBUSINESS)}
          onPress={() => {
            navigation.navigate(routes.REGISTER);
            AsyncStorage.setItem('userType', 'user');
          }}>
          <Text style={styles.solidButtonText}>Continue as a user</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.solidButton}
          // onPress={() => navigation.navigate(routes.SETUPBUSINESS)}
          onPress={() => {
            navigation.navigate(routes.REGISTER);
            AsyncStorage.setItem('userType', 'business');
          }}>
          <Text style={styles.solidButtonText}>Continue as a business</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          By signing up, you agree to our Terms and Conditions. See how we use
          your data in our Privacy Policy.
        </Text>
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
    paddingHorizontal: 20,
    justifyContent: 'center',
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
    fontWeight: '400',
    color: COLORS.textColor,
    marginBottom: 200,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  transparentButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 28,
    marginTop: 15,
    backgroundColor: 'transparent',
  },
  buttonText: {
    fontSize: SIZES.font,
    fontWeight: '600',
    color: COLORS.black,
    textAlign: 'center',
    flex: 1,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    marginHorizontal: 10,
    fontSize: SIZES.small,
    fontWeight: '600',
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  solidButton: {
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    paddingVertical: 12,
    paddingHorizontal: 15,
    alignItems: 'center',
    marginTop: 15,
  },
  solidButtonText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  terms: {
    fontSize: SIZES.small,
    fontWeight: '400',
    color: COLORS.black,
    textAlign: 'center',
    lineHeight: 16,
    marginTop: 20,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
});

export default CreateAccountScreen;
