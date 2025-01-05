import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import MoreIcon from '../../assets/images/Profile/Burger.svg';
import ChevronRightIcon from '../../assets/images/Profile/right.svg';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width} = Dimensions.get('window');

const TabButton = ({title, isActive, onPress}) => (
  <TouchableOpacity
    onPress={onPress}
    style={[styles.tabButton, isActive && styles.activeTabButton]}>
    <Text
      style={[
        styles.tabText,
        isActive && styles.activeTabText,
        {fontFamily: FONTS.RADIO_CANADA_MEDIUM},
      ]}>
      {title}
    </Text>
  </TouchableOpacity>
);

const BusinessProfile = () => {
  const [activeTab, setActiveTab] = useState('Overview');
  const tabs = ['Overview', 'Photos', 'Reviews', 'Questions'];
  const [business, setBusiness] = useState(null);

  const coordinates = {
    latitude: 1.2834,
    longitude: 103.8607,
    latitudeDelta: 0.005,
    longitudeDelta: 0.005,
  };

  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const businessData = await AsyncStorage.getItem('businessData');

        if (businessData) {
          var bus = await JSON.parse(businessData);
          console.log(bus.logo, 'here');
          setBusiness(bus);
        }
        setBusiness(JSON.parse(businessData));
      } catch (error) {
        console.error('Error fetching business data:', error);
      }
    };

    fetchBusinessData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.moreButton}>
          <MoreIcon width={24} height={24} fill={COLORS.textColor} />
          <Text style={styles.moreText}>More</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{
            uri: business
              ? business.logo
              : 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format&fit=crop&q=60',
          }}
          style={styles.profileImage}
        />
        <View style={styles.profileInfo}>
          <View>
            <Text style={styles.businessName}>
              {business?.name
                ? `${business.name.slice(0, 17)}...`
                : 'Your company name'}
            </Text>
            <Text style={styles.businessType}>
              {business?.type || 'Your type'}
            </Text>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Text style={styles.editButtonText}>Edit Business details</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.tabsContainer}>
        {tabs.map(tab => (
          <TabButton
            key={tab}
            title={tab}
            isActive={activeTab === tab}
            onPress={() => setActiveTab(tab)}
          />
        ))}
      </ScrollView>

      <View style={styles.contentSection}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          Mimosa is a one-of-a-kind sensory experience, designed to take the
          viewer on a journey to connect with Mayan cosmology, with Mexico's
          most impressive nature sanctuaries...
        </Text>
        <Text style={styles.description}>
          Egestas odio integer nisl curabitur diam eget. Varius cursus vivamus
          sed diam enim. Porttitor urna risus neque sed sapien morbi lacinia
          fringilla fusce. Et duis vitae amet facilisis enim egestas non.
          Aliquam lectus arcu proin ornare vitae amet varius sed. Pretium risus.
        </Text>

        <TouchableOpacity style={styles.sectionButton}>
          <Text style={styles.sectionTitle}>Opening hours</Text>
          <View style={styles.sectionContent}>
            <Text style={styles.sectionText}>Closed . Opens 9:00AM</Text>
            <ChevronRightIcon width={24} height={24} fill={COLORS.textColor} />
          </View>
        </TouchableOpacity>

        <View style={styles.locationSection}>
          <Text style={styles.sectionTitle}>Location</Text>
          <Text style={styles.locationText}>{business?.address}</Text>
          <View style={styles.mapContainer}>
            <MapView style={styles.map} initialRegion={coordinates}>
              <Marker coordinate={coordinates} />
            </MapView>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,

    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: SIZES.extraLarge,
    paddingBottom: SIZES.medium,
  },
  headerTitle: {
    fontSize: SIZES.extraLarge,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    color: COLORS.textTitle,
  },
  moreButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  moreText: {
    color: COLORS.textColor,
    marginRight: SIZES.base,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    marginLeft: SIZES.base,
  },
  profileSection: {
    padding: SIZES.extraLarge,
    flexDirection: 'row',
    gap: SIZES.large,
  },
  profileImage: {
    width: 89,
    height: 72,
    borderRadius: SIZES.base,
    marginBottom: SIZES.medium,
  },
  profileInfo: {
    gap: SIZES.base,
  },
  businessName: {
    fontSize: SIZES.extraLarge,
    fontWeight: '600',
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    color: COLORS.textTitle,
  },
  businessType: {
    fontSize: SIZES.large,
    color: COLORS.textColor,
    marginBottom: SIZES.base,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  editButton: {
    backgroundColor: COLORS.bgGray,
    paddingHorizontal: SIZES.extraLarge,
    paddingVertical: SIZES.font,
    borderRadius: 55,
    alignSelf: 'flex-start',
  },
  editButtonText: {
    color: COLORS.primary,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  tabsContainer: {
    flexDirection: 'row',
    paddingHorizontal: SIZES.extraLarge,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgGray,
  },
  tabButton: {
    paddingVertical: SIZES.medium,
    paddingHorizontal: SIZES.extraLarge,
    marginRight: SIZES.extraLarge,
  },
  activeTabButton: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primary,
  },
  tabText: {
    color: COLORS.textColor,
    fontWeight: '500',
  },
  activeTabText: {
    color: COLORS.primary,
    fontWeight: '600',
  },
  contentSection: {
    padding: SIZES.extraLarge,
    gap: SIZES.medium,
  },
  sectionTitle: {
    fontSize: SIZES.large,
    fontWeight: '600',
    marginBottom: SIZES.base,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    color: COLORS.textTitle,
  },
  description: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    lineHeight: 24,
    marginBottom: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  sectionButton: {
    borderBottomWidth: 1,
    borderBottomColor: COLORS.bgGray,
    paddingBottom: SIZES.medium,
  },
  sectionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionText: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  locationSection: {
    gap: SIZES.base,
    marginBottom: SIZES.extraLarge,
  },
  locationText: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  mapContainer: {
    height: 200,
    borderRadius: SIZES.base,
    overflow: 'hidden',
    marginTop: SIZES.base,
  },
  map: {
    flex: 1,
  },
});

export default BusinessProfile;
