import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import CheckIcon from '../../assets/images/Setup/check.svg';
import CommunityModal from './../../Components/Modal/CommunityModal';
import QRCodeModal from './../../Components/Modal/QRCodeModal';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {CreateBussiness} from '../../Api/api';
import {useToast} from 'react-native-toast-notifications';
import {useNavigation} from '@react-navigation/native';
import routes from '../../Routes/routes';

const {width, height} = Dimensions.get('window');

const BusinessProfileSetupScreen = () => {
  const navigation: any = useNavigation();
  const [completedItems, setCompletedItems] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const toast = useToast();

  // These would ideally come from your app's state management system
  const [wifiName, setWifiName] = useState(''); // Should be populated from WiFi screen
  const [wifiPassword, setWifiPassword] = useState(''); // Should be populated from WiFi screen

  const menuItems = [
    {id: 1, title: 'Business Details', route: 'BUSINESSDETAILSSCREEN'},
    {
      id: 2,
      title: 'Business Verification',
      route: 'BUSINESSVERIFICATIONSCREEN',
    },
    {id: 3, title: 'Opening and Closing Time', route: 'BUSINESSHOURSSCREEN'},
    {id: 4, title: 'Socials', route: 'SOCIALLINKS'},
    {id: 5, title: 'WiFi Connection', route: 'WIFICONNECTION'},
  ];

  const handleItemPress = id => {
    if (completedItems.includes(id)) {
      setCompletedItems(completedItems.filter(item => item !== id));
    } else {
      setCompletedItems([...completedItems, id]);
    }
  };

  const handleSubmit = async () => {
    // setShowQRModal(true);
    try {
      const formData = new FormData();

      var businessData = await AsyncStorage.getItem('businessDetails');
      var hours = await AsyncStorage.getItem('hours');
      var social = await AsyncStorage.getItem('social');
      var wifi = await AsyncStorage.getItem('wifi');
      var cacDoc = await AsyncStorage.getItem('cacDoc');
      var userId = await AsyncStorage.getItem('user');

      userId = JSON.parse(userId);
      businessData = JSON.parse(businessData);
      cacDoc = JSON.parse(cacDoc);
      const cleanedString = hours ? hours.replace(/\\/g, '') : '';

      formData.append('userId', userId?.data.id);
      formData.append('hours', cleanedString);
      formData.append('wifi', wifi);
      formData.append('social', social);
      if (cacDoc) {
        const doc = cacDoc;

        formData.append('cacDoc', {
          uri: doc[0].uri,
          type: doc[0].type, // application/pdf
          name: doc[0].name,
        });
      }

      if (businessData && businessData.logo) {
        const logoUri = businessData.logo;
        const fileName = logoUri.split('/').pop();
        const fileType = fileName.split('.').pop();

        formData.append('logo', {
          uri: logoUri,
          name: fileName,
          type: `image/${fileType}`,
        });
        formData.append('name', businessData.name);
        formData.append('type', businessData.type || null);
        formData.append('address', businessData.address || null);
        formData.append('description', businessData.description || null);
        formData.append('amenities', businessData.amenities || null);
      } else {
        formData.append('name', businessData?.name);
        formData.append('type', businessData?.type || null);
        formData.append('address', businessData?.address || null);
        formData.append('description', businessData?.description || null);
        formData.append('amenities', businessData?.amenities || null);
      }

      // Call API
      var response = await CreateBussiness(formData);

      if (response) {
        toast.show('Business account created successfully', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
        await AsyncStorage.setItem('businessData', JSON.stringify(response));
        setShowSuccessModal(true);
      } else {
        toast.show('Failed to create business account', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
        });
      }
    } catch (error) {
      console.error('Error loading data', error);
    } finally {
      setTimeout(() => {
        setShowQRModal(false);
      }, 3000);
    }
  };

  const handleModalClose = () => {
    setShowSuccessModal(false);
    navigation.navigate(routes.LOGIN);
    // navigation.navigate(routes.HOMEBUSINESS);
  };

  const allItemsCompleted = menuItems.every(item =>
    completedItems.includes(item.id),
  );

  const statusBarHeight = Platform.OS === 'ios' ? 44 : StatusBar.currentHeight;
  const bottomSafeArea = Platform.OS === 'ios' ? 34 : 0;

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <SafeAreaView style={styles.safeArea}>
        <View
          style={[
            styles.container,
            {minHeight: height - statusBarHeight - bottomSafeArea},
          ]}>
          <View style={styles.contentContainer}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>
                Setup your Business Profile
              </Text>
              <View style={{width: 24}} />
            </View>

            <Text style={styles.subtitle}>Complete your business profile</Text>

            <View style={styles.menuContainer}>
              {menuItems.map(item => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.menuItem}
                  onPress={() => {
                    handleItemPress(item.id);
                    navigation.navigate(item.route);
                  }}>
                  <View style={styles.idContainer}>
                    {completedItems.includes(item.id) ? (
                      <CheckIcon width={24} height={24} />
                    ) : (
                      <Text style={styles.idText}>{item.id}</Text>
                    )}
                  </View>
                  <Text style={styles.menuText}>{item.title}</Text>
                  <Text style={styles.chevron}>›</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.laterButton]}
              onPress={() => navigation.goBack()}>
              <Text style={styles.laterButtonText}>Continue later</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.button,
                styles.submitButton,
                {opacity: allItemsCompleted ? 1 : 0.5},
              ]}
              onPress={handleSubmit}
              disabled={!allItemsCompleted}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* QR Code Modal */}
      <QRCodeModal
        visible={showQRModal}
        onClose={() => setShowQRModal(false)}
        wifiName={wifiName}
        wifiPassword={wifiPassword}
        onButtonPress={() => setShowQRModal(false)}
      />

      {/* Success Modal */}
      <CommunityModal
        visible={showSuccessModal}
        onClose={handleModalClose}
        type="success"
        title="Business setup completed"
        description="Lorem ipsum dolor sit amet consectetur. Urna odio non blandit feugiat et nulla."
        buttonText="Done"
        onButtonPress={handleModalClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    width: width,
  },
  contentContainer: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SIZES.medium,
    paddingVertical: SIZES.medium,
    width: width,
  },
  headerTitle: {
    fontSize: SIZES.extraLarge,
    fontWeight: '600',
    color: COLORS.textTitle,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    flex: 1,
    textAlign: 'left',
  },
  subtitle: {
    fontSize: SIZES.medium,
    color: COLORS.textColor,
    paddingHorizontal: SIZES.medium,
    marginBottom: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  menuContainer: {
    paddingHorizontal: SIZES.medium,
    flex: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: SIZES.medium,
    backgroundColor: COLORS.bgGray,
    marginVertical: SIZES.small / 2,
    borderRadius: SIZES.medium,
    width: width - SIZES.medium * 2,
  },
  idContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: COLORS.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  idText: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  menuText: {
    flex: 1,
    marginLeft: SIZES.medium,
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  chevron: {
    fontSize: SIZES.extraLarge,
    color: COLORS.textColor,
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: SIZES.medium,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.bgGray,
    gap: SIZES.small,
    width: width,
  },
  button: {
    flex: 1,
    padding: SIZES.medium,
    borderRadius: SIZES.buttonRadius,
    alignItems: 'center',
  },
  laterButton: {
    backgroundColor: COLORS.bgGray,
  },
  submitButton: {
    backgroundColor: COLORS.primary,
  },
  laterButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  submitButtonText: {
    fontSize: SIZES.medium,
    color: COLORS.white,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
});

export default BusinessProfileSetupScreen;
