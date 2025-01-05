import { View, Text, ScrollView, StyleSheet, Platform, StatusBar, Image, Touchable, TouchableOpacity, RefreshControl, PermissionsAndroid } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import FONTS, { COLORS, SIZES } from '../../constants/theme'
import NotificationIcon from '../../assets/images/Home/NotificationIcon.svg';
import SearchInput from '../../Components/SearchInput';
import WifiIcon from '../../assets/images/Home/WifiIcon.svg';
import CommentIcon from '../../assets/images/Home/chat.svg';
import DefibrilatorIcon from '../../assets/images/Home/Defibrilator.svg';
import HeartIcon from '../../assets/images/Home/Heart.svg';
import UnlikeIcon from '../../assets/images/Home/Unlike.svg';
import ImageSlider from '../../Components/Slider';
import CoffeeIcon from '../../assets/images/Others/coffee.svg';
import PlantIcon from '../../assets/images/Home/plant.svg';
import LightHouseIcon from '../../assets/images/Home/light-home.svg';
import DefribilatorIcon from '../../assets/images/Home/debfrilator.svg';
import SearchIcon from '../../assets/images/Home/SearchIcon.svg';
import routes from '../../Routes/routes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { LocationData } from '../../constants/data';
import { AddFollower, GetPosts, GetUserWithFollowers, RemoveFollower, ToggleLike } from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet from '@gorhom/bottom-sheet';
import BottomSheetModal from '../../Components/BottomSheet';
import CustomModal from '../../Components/Modal/CustomModal';
import CustomButton from '../../Components/Button';
import LoadingDots from '../../Components/LoadingDots';
import WifiManager from 'react-native-wifi-reborn';
import { BASE_URL, calculateTimeAgo } from '../../constants/utils';
import { useToast } from 'react-native-toast-notifications';
import axios from 'axios';


const quickSearch = [
  { id: 1, name: 'Wifi', icon: <WifiIcon width={20} height={20} /> },
  { id: 2, name: 'Coffee', icon: <DefibrilatorIcon width={20} height={20} /> },
  { id: 3, name: 'Hospitals', icon: <WifiIcon width={20} height={20} /> },
  { id: 4, name: 'Defibrilator', icon: <DefibrilatorIcon width={20} height={20} /> },
  { id: 5, name: 'Cafe', icon: <WifiIcon width={20} height={20} /> },
];

const GImages = [
  'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
  'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
  'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
]
const defaultIcon = <PlantIcon width={18} height={18} />
const iconMap: any = {
  Wifi: <WifiIcon width={18} height={18} />,
  coffeeIcon: <CoffeeIcon width={18} height={18} />,
  plantIcon: <PlantIcon width={18} height={18} />,
  lighthouseIcon: <LightHouseIcon width={18} height={18} />,
};


const HomeScreen = () => {
  const navigation: any = useNavigation();
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [open, setOpen] = useState(false);
  const [following, setFollowing] = useState(false);
  const [visible, setVisible] = useState(false);
  const snapPoints = ['90%'];
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [followers, setFollowers] = useState([]);
  const toast = useToast()

  const handleClosePress = () => bottomSheetRef?.current?.close();
  const handleOpenPress = () => bottomSheetRef?.current?.expand();

  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);


  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        return (
          granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
          granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
        );
      } catch (err) {
        console.error('Permission request failed:', err);
        return false;
      }
    }
    return true;
  };

  const scanWifi = async () => {

    const hasPermission = await requestPermissions();
    if (!hasPermission) return;

    try {
      const networks = await WifiManager.loadWifiList();
      if (networks.length > 0) {
        setVisible(true);
      }

    } catch (err) {
      console.error('Failed to scan Wi-Fi:', err);

    }
  };

  const onRefresh = async () => {
    if (!currentUserId) return;

    setRefreshing(true);
    await GetAllPosts();
    setRefreshing(false);
  };


  const GetAllPosts = async () => {
    const loggedInUser: any = await AsyncStorage.getItem('user');
    let userId = JSON.parse(loggedInUser).user.id;
    setCurrentUserId(userId);

    try {
      setFetching(true);
      const response = await GetPosts();


      if (response) {
        setFetching(false);
        setPosts(response.info);

      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  }

  useEffect(() => {
    scanWifi();
    GetAllPosts();
  }, []);

  

  useFocusEffect(
    React.useCallback(() => {
      RetrieveFollowers(); // Fetch the data when the screen gains focus
      return () => {
        console.log('Screen unfocused');
      };
    }, []) // Empty dependency array ensures it runs on focus/unfocus
  );


  const handleLikePress = async (userId: any, postId: any) => {

    try {
      const response = await ToggleLike(userId, postId);
      const info = await GetPosts();

      if (response) {
        setPosts(info.info);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RetrieveFollowers = async () => {
    try {
      const loggedInUser: any = await AsyncStorage.getItem('user');
      let userId = JSON.parse(loggedInUser).user.id;
     
      const info = await GetUserWithFollowers(userId);

      if (info) {
        setFollowers(info.info.Followers);
      }

    } catch (error) {

    }
  }

  const handleAddFollower = async (userId: any, followerId: any) => {
    setFollowing(true);
    try {
      const response = await AddFollower(userId, followerId);
      const info = await GetPosts();

      if (response) {
        toast.show('You are now following this user', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
        setFollowing(false);
        setPosts(info.info);
        RetrieveFollowers();
      }
    } catch (error) {
      setFollowing(false);
      console.log(error);
    }
  };

  const handleRemoveFollower = async (userId: any, followerId: any) => {
    try {
      const response = await RemoveFollower(userId, followerId);
      const info = await GetPosts();

      if (response) {
        toast.show('You are no longer following this user', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
        });
        setPosts(info.info);
        RetrieveFollowers();
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleSearchPress = () => {
    navigation.navigate('SEARCH'); // Replace with your actual screen name
  };

  const CustomRatingBar = ({ rating }: any) => {
    return (
      <View style={styles.customRatingBarStyle}>
        {
          maxRating.map((item: any, key: number) => (
            <TouchableOpacity

              activeOpacity={0.7}
              key={item}
              onPress={() => undefined}
            >
              <Image
                style={styles.starImgStyle}
                source={
                  item <= rating ? require('../../assets/images/Home/star.png') : require('../../assets/images/Home/star-unfilled.png')
                }
              />

            </TouchableOpacity>
          ))
        }
      </View>
    )
  }

  if (fetching) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* <Text style={{ fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.primary }}>Loading...</Text> */}
        <LoadingDots />
      </View>
    );
  }



  return (
    <ScrollView style={styles.container} showsHorizontalScrollIndicator={false} refreshControl={
      <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    }>

      <View style={{ padding: 15, }}>
        <View style={styles.headerStyle}>
          <View style={[styles.profileContainer, { borderColor: '#007AFF' }]}>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww' }}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate(routes.NOTIFICATIONS) }}>
            <NotificationIcon width={42} height={42} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={{ marginTop: 20 }} onPress={handleSearchPress}>
          <View style={styles.searchContainer}>
            <SearchIcon width={16} height={16} fill={COLORS.white} />
            <Text style={{ fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, color: COLORS.faintGray, fontSize: SIZES.small }}>Where do you want to visit?</Text>
          </View>
        </TouchableOpacity>

        <View style={{ marginTop: 20 }}>
          <Text style={styles.headerText}>Quick search</Text>

          <ScrollView style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false} horizontal>
            {
              quickSearch.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.quickContainer,
                  ]}
                  onPress={() => { }}
                >
                  {item.icon}
                  <Text
                    style={[
                      styles.quickText
                    ]}
                  >
                    {item.name}
                  </Text>

                </TouchableOpacity>
              ))
            }


          </ScrollView>
        </View>

        <View style={{ marginTop: 20 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.headerText}>Locations near you</Text>
            <TouchableOpacity onPress={() => { navigation.navigate(routes.NEARLOCATIONS) }}>
              <Text style={{ color: COLORS.textColor, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small }}>View all</Text>
            </TouchableOpacity>
          </View>

          <ScrollView style={{ marginTop: 10 }} showsHorizontalScrollIndicator={false} horizontal>
            {
              LocationData?.map((item, index) => (
                <TouchableOpacity activeOpacity={0.7} onPress={() => { navigation.navigate(routes.LOCATIONDETAILS, { locationId: item.id }) }} key={index} style={styles.locationContainer}>

                  <Image
                    source={{ uri: item.images[0] }}
                    style={styles.image}
                  />


                  <Text style={styles.title}>{item.name}</Text>

                  <Text style={styles.address}>{item.location}</Text>

                  <View style={styles.ratingsContainer}>
                    <CustomRatingBar rating={item.rating} />
                    <Text style={styles.reviews}>150 reviews</Text>
                  </View>

                  <View style={styles.wifiContainer}>
                    {
                      item.wifi && (
                        <WifiIcon width={16} height={16} />
                      )
                    }
                    {
                      !item.wifi && (
                        <Image
                          source={require('../../assets/images/Home/wifi-unavailable.png')}
                          style={{ width: 16, height: 16 }}
                        />
                      )}

                    <Text style={styles.wifiText}>WiFi {item.wifi ? 'available' : 'unavailable'}</Text>
                  </View>
                </TouchableOpacity>
              ))
            }
          </ScrollView>
        </View>
      </View>

      <View style={{ marginTop: 15, marginBottom: 60 }}>
        <Text style={[styles.headerText, { paddingLeft: 15 }]}>What's happening.</Text>

        {
          posts?.length > 0 ? (
            posts?.map((item: any, index: number) => {
              const mediaArray = item.media ? item.media.replace(/"/g, '').split(',') : [];

              // Check if the post creator's ID is in the list of followed users
              const isFollowed = followers.some((user: any) => user?.id === item?.user?.id);
              
              return (
                <View key={index}>
                  <View style={{ marginTop: 15, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <View style={styles.happeningContainer}>
                      <View style={[styles.profileContainer, { borderWidth: 0, width: 30, height: 30 }]}>
                        <Image
                          source={{ uri: 'https://images.unsplash.com/photo-1599110364739-9c2bfa6981c8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTE1fHx1c2Vyc3xlbnwwfHwwfHx8MA%3D%3D' }}
                          style={[styles.profileImage, { width: 30, height: 30 }]}
                        />
                      </View>
                      <Text style={styles.profileText}>{item?.user?.firstName + ' ' + item?.user?.lastName}</Text>
                    </View>
                    {
                      (item?.user?.id !== currentUserId && !isFollowed) && (
                        <TouchableOpacity onPress={() => handleAddFollower(currentUserId, item?.userId)} style={styles.followButton}>
                          <Text style={styles.followText}>{following ? 'Following' : 'Follow'}</Text>
                        </TouchableOpacity>
                      )}

                    {
                      (isFollowed) && (
                        <TouchableOpacity onPress={() => handleRemoveFollower(currentUserId, item?.userId)} style={styles.followButton}>
                          <Text style={styles.followText}>Unfollow</Text>
                        </TouchableOpacity>
                      )}
                  </View>
                  {mediaArray.length > 0 ? (
                    <ImageSlider
                      images={mediaArray}
                    />
                  ) : (
                    <ImageSlider images={GImages} />
                  )}


                  <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                      <TouchableOpacity onPress={async () => {
                        await handleLikePress(currentUserId, item?.id)
                      }}>
                        {/* <HeartIcon width={18} height={18} /> */}
                        {JSON.parse(item?.likes || '[]').includes(String(currentUserId)) ? (
                          <HeartIcon width={18} height={18} />
                        ) : (
                          <UnlikeIcon width={18} height={18} />
                        )}


                      </TouchableOpacity>
                      <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5 }}>{JSON.parse(item?.likes)?.length}</Text>

                      <View style={{ marginHorizontal: 5 }} />
                      <TouchableOpacity onPress={() => navigation.navigate(routes.COMMENTSCREEN, { postId: item?.id })}>
                        <CommentIcon width={18} height={18} />
                      </TouchableOpacity>
                      <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5 }}>{item.comments.length}</Text>
                    </View>

                    <View style={styles.ratingsContainer}>
                      <CustomRatingBar rating={item.rating} />
                    </View>
                  </View>



                  <Text style={styles.description}>
                    {item.description}
                  </Text>

                  <View style={[styles.locationContainer, { marginHorizontal: 15 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{
                          color: COLORS.textTitle, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.base,
                          maxWidth: 100,
                          overflow: 'hidden',

                        }}
                          numberOfLines={1}
                          ellipsizeMode="tail"
                        >{item.business.name}</Text>
                        <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, fontSize: SIZES.small }}>2.5KM</Text>
                      </View>

                      <View style={[styles.ratingsContainer, { marginBottom: 0 }]}>
                        <CustomRatingBar rating={4} />
                        <Text style={styles.reviews}>150 reviews</Text>
                      </View>
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>

                      {item?.business?.amenities &&
                        item?.business?.amenities
                          .split(",")
                          .map((facility: string, idx: number) => {

                            const trimmedFacility = facility.trim();
                            const facilityIcon = iconMap[trimmedFacility] || defaultIcon;

                            return (
                              <View
                                style={{ flexDirection: "row", alignItems: "center", marginRight: 5 }}
                                key={idx}
                              >
                                <TouchableOpacity>
                                  {facilityIcon}
                                </TouchableOpacity>
                                <Text
                                  style={{
                                    color: COLORS.textPlaceholder,
                                    fontFamily: FONTS.RADIO_CANADA_REGULAR,
                                    marginLeft: 5,
                                    fontSize: SIZES.small,
                                  }}
                                >
                                  {trimmedFacility}
                                </Text>
                              </View>
                            );
                          })}


                    </View>

                    {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                      {item?.locationInformation?.facilities?.slice(2).map((facility: any, idx: any) => (
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} key={idx}>
                          <TouchableOpacity>
                            {iconMap[facility?.icon]}
                          </TouchableOpacity>
                          <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, fontSize: SIZES.small }}>{facility.name} ({facility.rating})</Text>
                        </View>
                      ))}
                    </View>

                    <TouchableOpacity>
                      <Text style={{ color: COLORS.black, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small, textDecorationLine: 'underline' }}>Visit profile</Text>
                    </TouchableOpacity>
                  </View> */}
                  </View>

                  <Text style={{ marginTop: 10, color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small, marginHorizontal: 15 }}>
                    {calculateTimeAgo(item.createdAt)}
                  </Text>

                  {index === 0 && (
                    <View>
                      <Image source={require('../../assets/images/Home/advert.png')} style={{
                        width: '100%',
                        height: 200,
                        resizeMode: 'contain'
                      }} />
                    </View>
                  )}
                </View>
              )
            })
          )
            :
            (
              <View style={{ alignItems: 'center', marginTop: 20 }}>
                {/* <Image
                source={require('../../assets/images/Home/no-posts.png')}
                style={{ width: 200, height: 200 }}
              /> */}
                <Text style={{ marginTop: 10, color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small }}>No posts yet.</Text>
              </View>
            )
        }
       
      </View>


      <CustomModal
        visible={visible}
        onDismiss={() => {
          setVisible(false);
        }}
        children={
          <View style={{ width: '100%', }}>
            <Text
              style={{
                textAlign: 'center',
                marginTop: 0,
                fontSize: SIZES.medium,
                fontFamily: FONTS.RADIO_CANADA_BOLD,
                color: COLORS.black,
                marginBottom: 5
              }}>
              Wi-Fi Status
            </Text>

            <Text
              style={{
                textAlign: 'center',
                marginTop: 0,
                fontSize: SIZES.font,
                fontFamily: FONTS.RADIO_CANADA_REGULAR,
                color: COLORS.black,
                marginBottom: 20
              }}>
              Wi-Fi networks are available in your vicinity. Tap "Proceed" to continue.
            </Text>

            <CustomButton
              title="Proceed"
              onPress={() => {
                setVisible(false);
                navigation.navigate(routes.WIFISCREEN);
              }}
              style={{ backgroundColor: COLORS.primary, marginTop: 10 }}
            />
          </View>
        }
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  headerText: {
    fontSize: SIZES.medium,
    color: COLORS.textTitle,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
  },
  profileContainer: {
    width: 42,
    height: 42,
    borderRadius: 25,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileImage: {
    width: 38,
    height: 38,
    borderRadius: 25,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.bgGray,
    borderRadius: SIZES.buttonRadius,
    paddingHorizontal: SIZES.small,
    marginVertical: SIZES.medium,
    paddingVertical: SIZES.medium
  },
  quickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    paddingHorizontal: 10,
    borderRadius: 25,
    marginBottom: 10,
    marginRight: 10,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: COLORS.faintGray,
  },
  quickText: {
    marginLeft: 10,
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: '#0F172A'
  },
  locationContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    margin: 5,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginBottom: 10,
  },
  title: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: '#334155',
    marginBottom: 5,
  },
  address: {
    fontSize: SIZES.small,
    color: COLORS.textPlaceholder,
    marginBottom: 10,
    fontFamily: FONTS.RADIO_CANADA_REGULAR
  },
  ratingsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  stars: {
    flexDirection: 'row',
    marginRight: 8,
  },
  reviews: {
    fontSize: 10,
    color: '#1E293B',
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  wifiContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wifiText: {
    marginLeft: 5,
    fontSize: 10,
    color: COLORS.textPlaceholder,
    fontFamily: FONTS.RADIO_CANADA_REGULAR
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginRight: 10
  },
  starImgStyle: {
    width: 12,
    height: 12,
    resizeMode: 'cover'
  },
  profileText: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    marginLeft: 10
  },
  happeningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 25,
    marginBottom: 10,
    flexShrink: 1,
  },
  followButton: {
    backgroundColor: '#E6ECFF80',
    borderRadius: 25,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  followText: {
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    fontSize: SIZES.small,
    color: COLORS.primary,
  },
  description: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    paddingHorizontal: 15,
    marginTop: 10
  }
})

export default HomeScreen