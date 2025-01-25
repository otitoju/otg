import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import routes from '../Routes/routes';
import HomeScreen from '../Screens/Home/HomeScreen';
import SearchScreen from '../Screens/Home/Search';
import ChatScreen from '../Screens/Communities/ChatScreen';
import CommunityScreen from '../Screens/Communities/CommunitiesScreen';
import CreateCommunities from '../Screens/Communities/CreateCommunities';
import InviteFriendsScreen from '../Screens/Communities/InviteFriendsScreen';
import InviteFriends from '../Screens/Profile/InviteFriendsScreen';
import Chat from '../Screens/Chat/Chat';
import AuthNavigator from './AuthNavigation';
import BottomTabs from '../tabs/BottomTabs';
import Notifications from '../Screens/Home/Notifications';
import NearLocations from '../Screens/Home/NearLocations';
import LocationDetails from '../Screens/Registeration/LocationDetails';
import Editprofile from '../Screens/Profile/EditProfileScreen';
import MoreScreen from '../Screens/Profile/MoreScreen';
import BusinessDetailsScreen from '../Screens/Setup/BusinessDetailsScreen';
import BusinessHoursScreen from '../Screens/Setup/BusinessHoursScreen';
import BusinessVerificationScreen from '../Screens/Setup/BusinessVerificationScreen';
import SetupBusiness from '../Screens/Setup/SetupBusiness';
import SocialLinks from '../Screens/Setup/SocialLinks';
import WiFiConnection from '../Screens/Setup/WiFiConnection';
import WifiScreen from '../Screens/Wifi/WifiScreen';
import CommentScreen from '../Screens/Comments/Comments';
import ProfileFeedScreen from '../Screens/Home (Business)/Home';
import BusinessBottomTabs from '../tabs/BusinessBottomTabs';

const MainStack = createNativeStackNavigator();

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator
        initialRouteName={routes.AUTHSTACKSCREEN}
        screenOptions={{headerShown: false}}>
        <MainStack.Screen
          name={routes.AUTHSTACKSCREEN}
          component={AuthNavigator}
        />
        <MainStack.Screen name={routes.CHAT} component={Chat} />
        <MainStack.Screen name={routes.HOMESCREEN} component={BottomTabs} />
        <MainStack.Screen name={routes.SEARCH} component={SearchScreen} />
        <MainStack.Screen name={routes.NOTIFICATIONS} component={Notifications} />
        <MainStack.Screen name={routes.NEARLOCATIONS} component={NearLocations} />
        <MainStack.Screen
          name={routes.LOCATIONDETAILS}
          component={LocationDetails}
        />
        <MainStack.Screen name={routes.CHATSCREEN} component={ChatScreen} />
        <MainStack.Screen name={routes.EDITPROFILE} component={Editprofile} />
        <MainStack.Screen name={routes.MORESCREEN} component={MoreScreen} />
        <MainStack.Screen
          name={routes.COMMUNITYSCREEN}
          component={CommunityScreen}
        />
        <MainStack.Screen
          name={routes.CREATECOMMUNITIES}
          component={CreateCommunities}
        />
        <MainStack.Screen
          name={routes.INVITEFREIENDS}
          component={InviteFriendsScreen}
        />
        <MainStack.Screen
          name={routes.INVITEFREIENDSCREEN}
          component={InviteFriends}
        />
        <MainStack.Screen name={routes.WIFISCREEN} component={WifiScreen} />
        <MainStack.Screen name={routes.COMMENTSCREEN} component={CommentScreen} />
        <MainStack.Screen
          name={routes.HOMEBUSINESS}
          component={BusinessBottomTabs}
        />
        <MainStack.Screen
          name={routes.BUSINESSDETAILSSCREEN}
          component={BusinessDetailsScreen}
        />
        <MainStack.Screen
          name={routes.BUSINESSHOURSSCREEN}
          component={BusinessHoursScreen}
        />
        <MainStack.Screen
          name={routes.BUSINESSVERIFICATIONSCREEN}
          component={BusinessVerificationScreen}
        />
        <MainStack.Screen name={routes.SETUPBUSINESS} component={SetupBusiness} />
        <MainStack.Screen name={routes.SOCIALLINKS} component={SocialLinks} />
        <MainStack.Screen
          name={routes.WIFICONNECTION}
          component={WiFiConnection}
        />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;