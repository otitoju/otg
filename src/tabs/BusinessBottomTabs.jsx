// BusinessBottomTabs.tsx
import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import HomeIcon from '../assets/images/Home/HomeIcon.svg';
import ActiveHomeIcon from '../assets/images/Home/Home.svg';
import PostIcon from '../assets/images/Home/PostIcon.svg';
import ActivePostIcon from '../assets/images/Home/ActivePlus.svg';
import ChatsIcon from '../assets/images/Home/chat.svg';
import ActiveChatsIcon from '../assets/images/Home/ActiveChat.svg';
import FONTS, {COLORS, SIZES} from '../constants/theme';
import Chat from '../Screens/Chat(business)/Chat';
import BusinessProfile from '../Screens/Profile(business)/BusinessProfile';
import ProfileFeedScreen from '../Screens/Home (Business)/Home';
import CreateBusinessPost from '../Screens/Post/BusinessPost';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator();

const BusinessBottomTabs = () => {
  const [business, setBusiness] = useState(null);
  useEffect(() => {
    const fetchBusinessData = async () => {
      try {
        const businessData = await AsyncStorage.getItem('businessData');

        if (businessData) {
          var img = await JSON.parse(businessData).logo;
          setBusiness(img);
        }
        setBusiness(JSON.parse(businessData).logo);
      } catch (error) {
        console.error('Error in bottom tab:', error);
      }
    };

    var timer;
    if (!business) {
      timer = setTimeout(() => {
        fetchBusinessData();
      }, 3000);
    } else {
      clearTimeout(timer);
    }
  }, []);
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused}) => {
          let IconComponent;

          switch (route.name) {
            case 'Home':
              IconComponent = focused ? (
                <ActiveHomeIcon width={24} height={24} fill={COLORS.primary} />
              ) : (
                <HomeIcon width={24} height={24} />
              );
              break;
            case 'Post':
              IconComponent = focused ? (
                <ActivePostIcon width={24} height={24} fill={COLORS.primary} />
              ) : (
                <PostIcon
                  width={24}
                  height={24}
                  fill={focused ? '#007AFF' : '#8e8e93'}
                />
              );
              break;
            case 'Chats':
              IconComponent = focused ? (
                <ActiveChatsIcon width={24} height={24} fill={COLORS.primary} />
              ) : (
                <ChatsIcon
                  width={24}
                  height={24}
                  fill={focused ? '#007AFF' : '#8e8e93'}
                />
              );
              break;
            case 'Profile':
              IconComponent = (
                <View
                  style={[
                    styles.profileContainer,
                    {borderColor: focused ? '#007AFF' : '#8e8e93'},
                  ]}>
                  <Image
                    source={{
                      uri: business
                        ? business
                        : 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format&fit=crop&q=60',
                    }}
                    style={styles.profileImage}
                  />
                </View>
              );
              break;
          }

          return <View style={styles.iconContainer}>{IconComponent}</View>;
        },
        tabBarLabel: ({focused}) => (
          <Text
            style={{
              color: focused ? COLORS.primary : COLORS.textPlaceholder,
              fontSize: 10,
              fontFamily: FONTS.RADIO_CANADA_REGULAR,
            }}>
            {route.name}
          </Text>
        ),
        tabBarStyle: styles.tabBarStyle,
        headerShown: false,
      })}>
      <Tab.Screen name="Home" component={ProfileFeedScreen} />
      <Tab.Screen name="Post" component={CreateBusinessPost} />
      <Tab.Screen name="Chats" component={Chat} />
      <Tab.Screen name="Profile" component={BusinessProfile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: COLORS.white,
    height: 70,
    paddingBottom: Platform.OS == 'android' ? 10 : 15,
    paddingTop: Platform.OS == 'android' ? 10 : 15,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    shadowColor: 'rgba(140, 139, 142, 0.7)',
    shadowOffset: {
      width: 10,
      height: 30,
    },
    shadowOpacity: 1.5,
    shadowRadius: 3.5,
    elevation: 5,
    alignItems: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 28,
    height: 28,
    borderRadius: 14,
  },
});

export default BusinessBottomTabs;
