import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StatusBar,
} from 'react-native';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import BackArrow from '../../assets/images/Profile/arrow-right.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Routes/routes';

interface SocialLinks {
  twitter: string;
  instagram: string;
  website: string;
}

const SocialsScreen = () => {
  const navigation: any = useNavigation();
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({
    twitter: '',
    instagram: '',
    website: '',
  });

  const [errors, setErrors] = useState<Partial<SocialLinks>>({});

  const toast = useToast();

  const validateInputs = () => {
    const newErrors: Partial<SocialLinks> = {};

    // Basic URL validation
    const urlRegex = /^(https?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?$/;

    if (socialLinks.twitter && !urlRegex.test(socialLinks.twitter)) {
      newErrors.twitter = 'Please enter a valid Twitter URL';
    }

    if (socialLinks.instagram && !urlRegex.test(socialLinks.instagram)) {
      newErrors.instagram = 'Please enter a valid Instagram URL';
    }

    if (socialLinks.website && !urlRegex.test(socialLinks.website)) {
      newErrors.website = 'Please enter a valid website URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (validateInputs()) {
      try {
        await AsyncStorage.setItem('social', JSON.stringify(socialLinks));
        toast.show('Social handles added successful', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
      } catch (error) {
        console.error('Error saving data', error);
      } finally {
        navigation.navigate(routes.SETUPBUSINESS);
      }
    }
  };

  const handleInputChange = (field: keyof SocialLinks, value: string) => {
    setSocialLinks(prev => ({
      ...prev,
      [field]: value,
    }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackArrow width={24} height={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Socials</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Twitter</Text>
          <TextInput
            style={[styles.input, errors.twitter && styles.inputError]}
            placeholder="Twitter"
            placeholderTextColor={COLORS.placeholder}
            value={socialLinks.twitter}
            onChangeText={text => handleInputChange('twitter', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          {errors.twitter && (
            <Text style={styles.errorText}>{errors.twitter}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Instagram</Text>
          <TextInput
            style={[styles.input, errors.instagram && styles.inputError]}
            placeholder="Instagram"
            placeholderTextColor={COLORS.placeholder}
            value={socialLinks.instagram}
            onChangeText={text => handleInputChange('instagram', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          {errors.instagram && (
            <Text style={styles.errorText}>{errors.instagram}</Text>
          )}
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Website</Text>
          <TextInput
            style={[styles.input, errors.website && styles.inputError]}
            placeholder="Website"
            placeholderTextColor={COLORS.placeholder}
            value={socialLinks.website}
            onChangeText={text => handleInputChange('website', text)}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="url"
          />
          {errors.website && (
            <Text style={styles.errorText}>{errors.website}</Text>
          )}
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgGray,
    paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  headerTitle: {
    marginLeft: SIZES.medium,
    fontSize: SIZES.large,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.textTitle,
    textAlign: 'center',
    width: '80%',
  },
  content: {
    flex: 1,
    padding: SIZES.medium,
  },
  inputGroup: {
    marginBottom: SIZES.large,
  },
  label: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textTitle,
    marginBottom: SIZES.small,
  },
  input: {
    backgroundColor: COLORS.backgroundGray,
    borderRadius: SIZES.medium,
    padding: SIZES.medium,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textTitle,
  },
  inputError: {
    borderWidth: 1,
    borderColor: COLORS.error,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    marginTop: SIZES.small,
  },
  nextButton: {
    backgroundColor: COLORS.primary,
    margin: SIZES.medium,
    padding: SIZES.medium,
    borderRadius: SIZES.buttonRadius,
    alignItems: 'center',
  },
  nextButtonText: {
    color: COLORS.white,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
});

export default SocialsScreen;
