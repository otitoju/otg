import { View, Text, ScrollView, StyleSheet, Platform, StatusBar, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import FONTS, { COLORS, SIZES } from '../../constants/theme'
import HamburgerIcon from '../../assets/images/Others/Hamburger.svg';
import Placeholder from '../../assets/images/Others/placeholder.svg';
import Timer from '../../assets/images/Others/formkit_time.svg';
import LocationPin from '../../assets/images/Others/carbon_location.svg';
import routes from '../../Routes/routes';
import { useNavigation } from '@react-navigation/native';
import { LocationData } from '../../constants/data';
import WifiIcon from '../../assets/images/Home/WifiIcon.svg';

// Import Post Page
import Post from './Posts';
import Review from './Review';
import Question from './Question';
import { GetPosts, GetUserById } from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [photoUrl, setPhotoUrl] = useState('');
  const navigation: any = useNavigation();
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);
  const [activeTab, setActiveTab] = useState('Posts');
  const [profile, setProfile] = useState<any>({});
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState([]);
  const [fetching, setFetching] = useState(false);

  // const tabs = ['Posts', 'Reviews', 'Questions', 'Bookmarks', 'Drafts'];
  const tabs = ['Posts', 'Reviews',];


  const GetUserProfile = async () => {

    try {
      const loggedInUser: any = await AsyncStorage.getItem('user');
      let userId = JSON.parse(loggedInUser).user.id;

      const response = await GetUserById(userId);
      console.log(response);

      if(response.info) {
        setProfile(response.info);
      }
    } catch (error) {
      console.error('Error getting user profile:', error);
    }
  }

  const GetAllPosts = async () => {
    const loggedInUser: any = await AsyncStorage.getItem('user');
    let userId = JSON.parse(loggedInUser).user.id;

    try {
      setFetching(true);
      const response = await GetPosts();
      
      if (response) {
        setFetching(false);
        const filteredPosts = response.info.filter((post: any) => post.userId === userId);
        console.log(filteredPosts.length);
        setPosts(filteredPosts);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  }

  useEffect(() => {
    GetUserProfile();
    GetAllPosts(); 
  }, []);

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

  const fileName = 'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8';

  const getFormattedDate = (dateString: any) => {
    const date = new Date(dateString); // Parse the date string
    const options: any = { day: 'numeric', month: 'long', year: 'numeric' }; // Formatting options
    return date.toLocaleDateString('en-US', options); // Convert to desired format
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 15, }}>
        <Text style={{ fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>Profile</Text>

        <TouchableOpacity onPress={() => {
          navigation.navigate('MORESCREEN');
        }}>
          <HamburgerIcon width={54} height={54} />
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 15, }}>
        <View
          style={styles.touchableContainer}
        >
          <View style={styles.containerIcon}>
            {fileName ? (
              <Image source={{ uri: photoUrl ? photoUrl : fileName }} style={styles.circleAvatar} />
            ) : (
              <View style={styles.iconContainer}>
                <Placeholder width={100} height={100} />
              </View>
            )}
          </View>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
          <Text style={{ fontSize: SIZES.medium, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>{profile?.username}</Text>
          <TouchableOpacity
            style={[
              styles.quickContainer,
            ]}
            onPress={() => {
              navigation.navigate('EDITPROFILE');
            }}
          >
            <Text
              style={[
                styles.quickText
              ]}
            >
              Edit Profile
            </Text>

          </TouchableOpacity>
        </View>

        <Text style={{ marginTop: 10, fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textColor }}>
          {profile?.bio}
        </Text>

        <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
          <LocationPin width={18} height={18} />
          <Text style={{ fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textColor, marginLeft: 5 }}>
            Lagos, Nigeria
          </Text>
        </View>

        <View style={{ marginTop: 10, alignItems: 'center', flexDirection: 'row' }}>
          <Timer width={18} height={18} />
          <Text style={{ fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textColor, marginLeft: 5 }}>
            {getFormattedDate(profile?.createdAt)}
          </Text>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={{ padding: 15, backgroundColor: '#F8FAFC', marginTop: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.headerText}>Your recent visits</Text>
          <TouchableOpacity onPress={() => { navigation.navigate(routes.NEARLOCATIONS) }}>
            <Text style={{ color: COLORS.textColor, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small }}>View all</Text>
          </TouchableOpacity>
        </View>

        <View>
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

      <View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabContainer}
        >
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={styles.tabButton}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab}
              </Text>
              {activeTab === tab && <View style={styles.activeIndicator} />}
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.content}>
          {activeTab === 'Posts' && <Post posts={posts}/>}
          {activeTab === 'Bookmarks' && <Post bookmarked={true} postCount={2} />}
          {activeTab === 'Reviews' && <Review />}
          {activeTab === 'Questions' && <Question />}
          {/* <Text style={styles.contentText}>Showing content for {activeTab}</Text> */}
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  touchableContainer: {
    // alignItems: 'center',
    // justifyContent: 'center',
    marginTop: 10
  },
  containerIcon: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleAvatar: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  iconContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    flexShrink: 1,
    borderWidth: 1,
    borderColor: COLORS.faintGray,
  },
  quickText: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: '#0F172A'
  },
  horizontalLine: {
    height: 5,
    backgroundColor: '#ccc',
    width: '100%',
    marginTop: 10,
  },
  headerText: {
    fontSize: SIZES.medium,
    color: COLORS.textTitle,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
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
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  tabButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    fontSize: SIZES.font,
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
  },
  activeTabText: {
    color: COLORS.primary,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  activeIndicator: {
    marginTop: 5,
    width: '50%',
    height: 3,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    borderRadius: 2,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentText: {
    fontSize: SIZES.small,
    color: '#333',
  },
})

export default ProfileScreen