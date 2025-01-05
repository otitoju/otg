import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import routes from '../Routes/routes'; // Ensure this file exports the correct routes
import SplashScreen from '../Screens/Onboarding/SplashScreen';
import OnboardingScreen from '../Screens/Onboarding/OnboardingScreen';
import CreateProfile from '../Screens/CreateProfile/CreateProfile';
import InterestProfile from '../Screens/CreateProfile/InterestProfile';
import LocationPermission from '../Screens/CreateProfile/LocationPermission';
import EmailInputScreen from '../Screens/Registeration/EmailInputScreen';
import CreateAccountScreen from '../Screens/Registeration/CreateAccountScreen';
import PhoneInputScreen from '../Screens/Registeration/PhoneInputScreen';
import VerifyEmailScreen from '../Screens/Registeration/EmailInputScreen';
import GoogleSignInScreen from '../Screens/Registeration/GooglesigninScreen';
import VerifyEmailComponent from '../Screens/Registeration/VerifyEmailScreen';
import VerifyPhoneComponent from '../Screens/Registeration/VerifyPhoneScreen';
import LoginScreen from '../Screens/SignIn/Login';
import SignUpScreen from '../Screens/SignUp/SignUpScren';




const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {

  return (
    <AuthStack.Navigator
      initialRouteName={routes.SPLASHSCREEN}
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name={routes.SPLASHSCREEN} component={SplashScreen} />
      <AuthStack.Screen name={routes.ONBOARDING} component={OnboardingScreen} />
      <AuthStack.Screen name={routes.LOGIN} component={LoginScreen} />
      <AuthStack.Screen name={routes.REGISTER} component={SignUpScreen} />
      <AuthStack.Screen name={routes.CREATEPROFILE} component={CreateProfile} />
      <AuthStack.Screen name={routes.INTERESTPROFILE} component={InterestProfile} />
      <AuthStack.Screen name={routes.CREATEACCOUNTSCREEN} component={CreateAccountScreen} />
      <AuthStack.Screen name={routes.LOCATIONPERMISSION} component={LocationPermission} />
      <AuthStack.Screen name={routes.EMAILINPUTSCREEN} component={EmailInputScreen} />
      <AuthStack.Screen name={routes.PHONEINPUTSCREEN} component={PhoneInputScreen} />
      <AuthStack.Screen name={routes.VERIFYEMAILSCREEN} component={VerifyEmailComponent} />
      <AuthStack.Screen name={routes.VERIFYPHONESCREEN} component={VerifyPhoneComponent} />
      <AuthStack.Screen name={routes.GOOGLESIGNINSCREEN} component={GoogleSignInScreen} />
    </AuthStack.Navigator>
  );
};

export default AuthNavigator;