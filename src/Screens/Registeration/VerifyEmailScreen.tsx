import React, { useState, useEffect, useRef } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, SafeAreaView, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Arrow from '../../assets/images/Registration/arrow-right.svg';
import routes from '../../Routes/routes';

const VerifyEmailComponent = ({ route }: any) => {
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(59);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<Array<TextInput | null>>([]);
  
  const navigation: any = useNavigation();

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChangeText = (text: string, index: number) => {
    const newCode = [...code];
    newCode[index] = text;
    setCode(newCode);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (event: any, index: number) => {
    // Handle backspace
    if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResendCode = () => {
    if (canResend) {
      setTimer(59);
      setCanResend(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Arrow width={20} height={20} style={styles.backArrow} />
        </TouchableOpacity>
        
        <Text style={styles.title}>Verify email address</Text>
        <Text style={styles.subtitle}>Enter the six-digit codes sent to your bo***@gmail.com</Text>
        
        <View style={styles.codeContainer}>
          {code.map((digit, index) => (
            <TextInput
              key={index}
              ref={(ref) => inputRefs.current[index] = ref}
              style={styles.input}
              keyboardType="numeric"
              maxLength={1}
              value={digit}
              onChangeText={(text) => handleChangeText(text, index)}
              onKeyPress={(event) => handleKeyPress(event, index)}
            />
          ))}
        </View>

        <View style={styles.timerContainer}>
          <Text style={styles.timer}>{`00:${timer < 10 ? `0${timer}` : timer}`}</Text>
          <TouchableOpacity onPress={handleResendCode} disabled={!canResend}>
            <Text style={[styles.resendText, { color: canResend ? COLORS.primary : '#A3A3A3' }]}>
              Resend Code
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={() => navigation.navigate(routes.CREATEPROFILE)}
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
    backgroundColor: '#FFFFFF',
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
    color: '#000000',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 32,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  input: {
    width: 48,
    height: 48,
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    textAlign: 'center',
    fontSize: 18,
    backgroundColor: '#F5F5F5',
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  timer: {
    fontSize: 14,
    color: '#000000',
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  resendText: {
    fontSize: 14,
    fontWeight: '500',
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  continueButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 25,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 32,
    left: 16,
    right: 16,
  },
  continueButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
});

export default VerifyEmailComponent;