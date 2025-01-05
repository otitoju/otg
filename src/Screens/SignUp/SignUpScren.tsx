import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/theme';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/Button';
import {CreateAccount, LoginAccount} from '../../Api/api';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Routes/routes';

export default function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const navigation: any = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let payload = {
        email: email.toLowerCase().trim(),
        password: password,
        firstName: firstName.toLowerCase(),
        lastName: lastName.toLowerCase(),
        username: userName,
      };

      const info = await CreateAccount(payload);

      if (info) {
        setLoading(false);
        await AsyncStorage.setItem('user', JSON.stringify(info));
        toast.show('Registration successful', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });

        const userType = await AsyncStorage.getItem('userType');
        if (userType === 'business') {
          navigation.navigate(routes.SETUPBUSINESS);
        } else {
          navigation.navigate(routes.LOGIN);
        }
      }
    } catch (error: any) {
      setLoading(false);

      if (error.response.data.message === 'Invalid email or password') {
        toast.show(error.response.data.message, {
          type: 'danger',
          placement: 'top',
          duration: 5000,
        });
      } else {
        toast.show('Something went wrong', {
          type: 'danger',
          placement: 'top',
          duration: 5000,
        });
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{backgroundColor: COLORS.bgGray, flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{
              paddingTop: StatusBar.currentHeight,
              padding: 15,
              flex: 0.85,
            }}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 10,
              }}>
              <TouchableOpacity
                style={{paddingTop: 10}}
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={require('../../assets/images/Signin/icon-arrow-back.png')}
                  style={{
                    width: 30,
                    height: 30,
                    tintColor: COLORS.black,
                    resizeMode: 'contain',
                  }}
                />
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: SIZES.extraLarge,
                  fontWeight: 600,
                  color: COLORS.black,
                }}></Text>

              <View />
            </View>

            <View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginVertical: 10,
                  marginTop: 10,
                }}>
                <Text
                  style={{
                    fontWeight: 600,
                    color: COLORS.black,
                    fontSize: SIZES.extraLarge,
                    marginRight: 10,
                  }}>
                  Create Account
                </Text>
              </View>

              <Text
                style={{
                  fontSize: SIZES.font,
                  color: COLORS.black,
                }}>
                Please enter your details to create an account
              </Text>
            </View>

            <View style={{marginTop: 30}}>
              <Text style={styles.label}>Firstname</Text>
              <CustomInput
                placeholder="john"
                value={firstName}
                onChangeText={(text: string) => setFirstName(text)}
              />

              <Text style={styles.label}>Lastname</Text>
              <CustomInput
                placeholder="doe"
                value={lastName}
                onChangeText={(text: string) => setLastName(text)}
              />

              <Text style={styles.label}>Username</Text>
              <CustomInput
                placeholder="doejohn"
                value={userName}
                onChangeText={(text: string) => setUserName(text)}
              />

              <Text style={styles.label}>Email</Text>
              <CustomInput
                placeholder="Email"
                // icon={require('../../assets/images/Signin/icon-email.png')}
                value={email}
                onChangeText={(text: string) => setEmail(text)}
              />

              <Text style={styles.label}>Password</Text>
              <CustomInput
                placeholder="Password"
                secureTextEntry
                // icon={require('../../assets/images/Signin/icon-password.png')}
                value={password}
                onChangeText={(text: string) => setPassword(text)}
              />
            </View>

            <View style={styles.row}>
              <Text style={styles.greyText}>Already have an account?</Text>
              <View style={styles.spacer} />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate(routes.LOGINSCREEN);
                }}>
                <Text style={styles.signInText}>Sign in</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          <View style={styles.fixedFooter}>
            <CustomButton
              title="Register"
              disabled={
                !email ||
                !password ||
                loading ||
                !firstName ||
                !lastName ||
                !userName
              }
              loading={loading}
              onPress={() => {
                handleSubmit();
              }}
              style={{backgroundColor: COLORS.primary, marginTop: 10}}
            />
          </View>
        </>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    color: COLORS.black,
    fontSize: SIZES.small,
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 30,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  greyText: {
    color: 'grey',
    fontWeight: '600',
    fontSize: SIZES.font,
  },
  spacer: {
    width: 4,
  },
  signInText: {
    color: COLORS.primary,
    fontSize: SIZES.font,
    fontWeight: '600',
  },
  fixedFooter: {
    // position: 'absolute',
    flex: 0.15,
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgGray,
  },
});
