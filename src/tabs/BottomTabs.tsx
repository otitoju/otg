// BottomTabs.tsx
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {View, Text, StyleSheet, Platform, Image} from 'react-native';
import HomeIcon from '../assets/images/Home/HomeIcon.svg';
import ActiveHomeIcon from '../assets/images/Home/Home.svg';
import PostIcon from '../assets/images/Home/PostIcon.svg';
import ActivePostIcon from '../assets/images/Home/ActivePlus.svg';
import CommunitiesIcon from '../assets/images/Home/Users.svg';
import ActiveCommunitiesIcon from '../assets/images/Home/ActiveUsers.svg';
import ChatsIcon from '../assets/images/Home/chat.svg';
import ActiveChatsIcon from '../assets/images/Home/ActiveChat.svg';
import HomeScreen from '../Screens/Home/HomeScreen';
import PostScreen from '../Screens/Post/CreatePost';
import CommunitiesScreen from '../Screens/CommunitiesScreen';
import ChatsScreen from '../Screens/Chat/Chat';
import ProfileScreen from '../Screens/Profile/ProfileScreen';
import FONTS, {COLORS, SIZES} from '../constants/theme';
import CommunityScreen from '../Screens/Communities/CommunitiesScreen';

const Tab = createBottomTabNavigator();

const BottomTabs = () => {
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
            case 'Communities':
              IconComponent = focused ? (
                <ActiveCommunitiesIcon
                  width={24}
                  height={24}
                  fill={COLORS.primary}
                />
              ) : (
                <CommunitiesIcon
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
                      uri: 'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
                    }}
                    style={styles.profileImage}
                  />
                </View>
              );
              break;
          }

          return <View style={styles.iconContainer}>{IconComponent}</View>;
        },
        tabBarLabel: ({focused}: any) => (
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
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Post" component={PostScreen} />
      <Tab.Screen name="Communities" component={CommunityScreen} />
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
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

export default BottomTabs;
