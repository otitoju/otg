import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS, SIZES} from '../../constants/theme';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/Button';
import {LoginAccount} from '../../Api/api';
import {useToast} from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Routes/routes';

export default function LoginScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const toast = useToast();
  const navigation: any = useNavigation();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      let payload = {
        email: email.toLowerCase().trim(),
        password: password,
      };

      const info = await LoginAccount(payload);

      if (info) {
        setLoading(false);
        await AsyncStorage.removeItem('businessData');
        AsyncStorage.setItem('user', JSON.stringify(info));
        toast.show('Login successful', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });

        const userType = await AsyncStorage.getItem('userType');
        if (userType === 'business' && loading === false) {
          navigation.navigate(routes.HOMEBUSINESS);
        } else {
          navigation.navigate(routes.HOMESCREEN);
        }
      }
    } catch (error: any) {
      setLoading(false);
      console.log(error);
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
    <SafeAreaView style={{backgroundColor: COLORS.bgGray, flex: 1}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          paddingTop: StatusBar.currentHeight,
          padding: 15,
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <TouchableOpacity style={{paddingTop: 10}} onPress={() => {}}>
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
              marginTop: 30,
            }}>
            <Text
              style={{
                fontWeight: 600,
                color: COLORS.black,
                fontSize: SIZES.extraLarge,
                marginRight: 10,
              }}>
              Welcome back
            </Text>
            <Image
              source={require('../../assets/images/Signin/icon-wave.png')}
              style={{
                width: 25,
                height: 25,
                resizeMode: 'contain',
              }}
            />
          </View>

          <Text
            style={{
              fontSize: SIZES.font,
              color: COLORS.black,
            }}>
            Please enter your email and password to sign in.
          </Text>
        </View>

        <View style={{marginTop: 30}}>
          <Text style={styles.label}>Email</Text>
          <CustomInput
            placeholder="Email"
            icon={require('../../assets/images/Signin/icon-email.png')}
            value={email}
            onChangeText={(text: string) => setEmail(text)}
          />

          <Text style={styles.label}>Password</Text>
          <CustomInput
            placeholder="Password"
            secureTextEntry
            icon={require('../../assets/images/Signin/icon-password.png')}
            value={password}
            onChangeText={(text: string) => setPassword(text)}
          />
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Image
              source={require('../../assets/images/Signin/icon-tick-in-box.png')}
              style={{
                width: 20,
                height: 20,
                resizeMode: 'contain',
                marginRight: 10,
              }}
            />

            <Text
              style={{
                color: COLORS.black,
                fontSize: SIZES.font,
                fontWeight: '600',
              }}>
              Remember me
            </Text>
          </TouchableOpacity>

          <Text
            style={{
              color: COLORS.primary,
              fontSize: SIZES.font,
              fontWeight: '600',
            }}>
            Forgot password?
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <Text style={styles.greyText}>Don't have an account?</Text>
          <View style={styles.spacer} />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(routes.REGISTER);
            }}>
            <Text style={styles.signInText}>Sign up</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.fixedFooter}>
        <CustomButton
          title="Login"
          disabled={!email || !password || loading}
          loading={loading}
          onPress={() => {
            handleSubmit();
          }}
          style={{backgroundColor: COLORS.primary, marginTop: 10}}
        />
      </View>
    </SafeAreaView>
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
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingBottom: 20,
    paddingHorizontal: 16,
    backgroundColor: COLORS.bgGray,
  },
});
