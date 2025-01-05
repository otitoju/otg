import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import {LineChart} from 'react-native-chart-kit';
import ChevronRight from '../../assets/images/Home/Arrow right.svg';
import HeartIcon from '../../assets/images/Home/Heart.svg';
import CommentIcon from '../../assets/images/Home/Message circle.svg';
import StarFilledIcon from '../../assets/images/Home/star-fill.svg';
import WifiIcon from '../../assets/images/Home/wifi.svg';
import CoffeeIcon from '../../assets/images/Home/Coffee.svg';
import ChairIcon from '../../assets/images/Home/Building.svg';
import Ambient from '../../assets/images/Home/ambient.svg';
import Bell from '../../assets/images/Home/bell.svg';
import Dot from '../../assets/images/Home/dot.svg';
import Bookmark from '../../assets/images/Home/Bookmark.svg';
import ImageSlider from '../../Components/ImageSlider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {RefreshControl} from 'react-native-gesture-handler';
import {GetBusinessPosts, GetUserBusiness} from '../../Api/api';
import LoadingDots from '../../Components/LoadingDots';

const {width} = Dimensions.get('window');

const data = {
  labels: ['', '', '', '', '', ''],
  datasets: [
    {
      data: [400, 300, 500, 450, 470, 500],
      color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
      strokeWidth: 2,
    },
  ],
};

const feedData = [
  {
    id: 1,
    posterName: 'Jane Doe',
    postImageUser:
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
    postImages: [
      'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
    ],
    description:
      'Beautiful mountain cafe with an amazing view! Swipe to see more photos of this incredible space.',
    location: 'Mountain View Cafe',
    distance: '2.3km',
    rating: 4.5,
    timeAgo: '2 hours ago',
  },
  {
    id: 2,
    posterName: 'John Smith',
    postImageUser:
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60',
    postImages: [
      'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60',
    ],
    description:
      'Best coffee spot in town. Great ambiance and perfect for remote work!',
    location: 'City Coffee House',
    distance: '0.8km',
    rating: 1.0,
    timeAgo: '3 hours ago',
  },
  {
    id: 3,
    posterName: 'Alice Johnson',
    postImageUser:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
    postImages: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format&fit=crop&q=60',
    ],
    description:
      'Quiet workspace with fast Wi-Fi. Perfect for focused work sessions.',
    location: 'Library Co-Working',
    distance: '1.5km',
    rating: 4.8,
    timeAgo: '5 hours ago',
  },
];

const ProfileFeedScreen = () => {
  const [isHeartFilled, setIsHeartFilled] = useState(feedData.map(() => false)); // Array of states for heart icons
  const [isBookmarkFilled, setIsBookmarkFilled] = useState(
    feedData.map(() => false),
  );
  const [businessLogo, setBusiness] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [posts, setPosts] = useState([]);

  const toggleHeart = index => {
    const updatedHearts = [...isHeartFilled];
    updatedHearts[index] = !updatedHearts[index]; // Toggle the specific heart icon
    setIsHeartFilled(updatedHearts);
  };

  const toggleBookmark = index => {
    const updatedBookmarks = [...isBookmarkFilled];
    updatedBookmarks[index] = !updatedBookmarks[index]; // Toggle the specific bookmark icon
    setIsBookmarkFilled(updatedBookmarks);
  };

  const getUserBusiness = async (userId: any) => {
    setFetching(true);
    try {
      const info = await GetUserBusiness(userId);

      if (info) {
        const rawData = AsyncStorage.setItem(
          'businessData',
          JSON.stringify(info),
        );
        // console.log(cleanedData, 'hhhhh');
        let cleanedData = {
          ...info,
          amenities: JSON.parse(info.amenities),
          hours: JSON.parse(info.hours),
          social: JSON.parse(info.social),
          wifi: JSON.parse(info.wifi),
        };
        setFetching(false);
        setBusiness(info.logo);
      }
      setBusiness(info.logo);
    } catch (error: any) {
      setFetching(false);
      console.log(error);
    }
  };

  const GetAllPosts = async () => {
    const loggedInUser: any = await AsyncStorage.getItem('user');
    let userId = JSON.parse(loggedInUser).user.id;
    setCurrentUserId(userId);

    try {
      setFetching(true);
      const response = await GetBusinessPosts();

      if (response) {
        setFetching(false);
        const cleanedData = response.data.map(post => ({
          ...post,
          media: JSON.parse(post.media),
          likes: JSON.parse(post.likes),
        }));
        setPosts(cleanedData);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  const onRefresh = async () => {
    if (!currentUserId) return;

    setRefreshing(true);
    await GetAllPosts();
    setRefreshing(false);
  };

  useEffect(() => {
    setFetching(true);
    const fetchBusinessData = async () => {
      try {
        const loggedInUser: any = await AsyncStorage.getItem('user');
        let userId = JSON.parse(loggedInUser).user.id;
        getUserBusiness(userId);
      } catch (error) {
        console.error('Error in home:', error);
      }
    };

    fetchBusinessData();
    GetAllPosts();
    setFetching(false);
  }, []);

  if (fetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ActivityIndicator size="large" color={COLORS.primary} /> */}
        <LoadingDots />
      </View>
    );
  }

  return (
    <>
      <ScrollView
        style={styles.container}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* Header Section */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.headerContent}>
            <View style={styles.profileSection}>
              <Text style={styles.headerText}>Complete Business Setup</Text>
            </View>
            <ChevronRight width={20} height={20} color="#9CA3AF" />
          </TouchableOpacity>
          <View
            style={{
              width: width,
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingHorizontal: 16,
              marginVertical: 8,
            }}>
            <Image
              source={{
                uri: businessLogo
                  ? businessLogo
                  : 'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format&fit=crop&q=60',
              }}
              style={styles.profileImage}
            />

            <TouchableOpacity>
              <Bell width={41} height={41} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
          {/* Stats Section */}
          <View style={styles.statsSection}>
            <View style={styles.statHeader}>
              <Text style={styles.statTitle}>Total Profile Visits</Text>
              <TouchableOpacity>
                <Text style={styles.analyticsLink}>View Analytics</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <View style={styles.statsNumbers}>
                <Text style={styles.visitsCount}>500</Text>
                <Text style={styles.decreaseText}>
                  ↓ 2.3% decrease since last week
                </Text>
              </View>

              <View style={styles.chartContainer}>
                <LineChart
                  data={data}
                  width={width * 0.3}
                  height={60}
                  chartConfig={{
                    backgroundGradientFrom: '#fff',
                    backgroundGradientTo: '#fff',
                    color: (opacity = 1) => `rgba(255, 0, 0, ${opacity})`,
                    strokeWidth: 2,
                    propsForDots: {r: '0'},
                  }}
                  bezier
                  style={styles.chart}
                  withDots={false}
                  withInnerLines={false}
                  withOuterLines={false}
                  withHorizontalLabels={false}
                  withVerticalLabels={false}
                />
              </View>
            </View>
          </View>

          {/* Recent Visits */}
          <View style={styles.recentVisits}>
            <View style={styles.recentHeader}>
              <Text style={styles.recentTitle}>Recent Profile visits</Text>
              <TouchableOpacity>
                <Text style={styles.viewAll}>View all</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.visitorsRow}>
              <View style={styles.visitorItem}>
                <Image
                  source={{uri: 'https://via.placeholder.com/24'}}
                  style={styles.visitorImage}
                />
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <Text style={styles.visitorName}>@smyrose</Text>
                    <Text style={{fontSize: SIZES.small}}>5 mins ago</Text>
                  </View>
                  <Text style={{fontSize: SIZES.small}}>Ikeja, Lagos</Text>
                </View>
              </View>
              <View style={styles.visitorItem}>
                <Image
                  source={{uri: 'https://via.placeholder.com/24'}}
                  style={styles.visitorImage}
                />
                <View style={{flexDirection: 'column'}}>
                  <View style={{flexDirection: 'row', gap: 3}}>
                    <Text style={styles.visitorName}>@smyrose</Text>
                    <Text style={{fontSize: SIZES.small}}>5 mins ago</Text>
                  </View>
                  <Text style={{fontSize: SIZES.small}}>Ikeja, Lagos</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Feed Section */}
          <View style={styles.feedSection}>
            <Text style={styles.sectionTitle}>Suggested Posts</Text>

            {posts.map((post, index) => (
              <View key={post.id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <View style={styles.posterInfo}>
                    <Image
                      source={{uri: post.Business.logo}}
                      style={styles.posterImage}
                    />
                    <Text style={styles.posterName}>{post.Business.name}</Text>
                  </View>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Follow</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 65,
                    zIndex: 55,
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => toggleBookmark(index)}>
                  <Bookmark
                    width={35}
                    height={35}
                    fill={isBookmarkFilled[index] ? COLORS.lightBg : 'none'}
                  />
                </TouchableOpacity>

                <ImageSlider images={post.media} />

                <View style={styles.interactionBar}>
                  <View style={styles.interactions}>
                    <TouchableOpacity
                      style={styles.interactionItem}
                      onPress={() => toggleHeart(index)}>
                      <HeartIcon
                        width={16}
                        height={16}
                        fill={isHeartFilled[index] ? 'red' : COLORS.white} // Independent heart icon
                      />
                      <Text style={styles.interactionCount}>
                        {post.likes.length}
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                      <CommentIcon width={16} height={16} color="#9CA3AF" />
                      <Text style={styles.interactionCount}>17</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                      <StarFilledIcon
                        key={idx}
                        width={SIZES.small}
                        height={SIZES.small}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>
                <Text style={styles.postDescription}>{post.postText}</Text>
                <View style={styles.locationCard}>
                  <View style={styles.locationHeader}>
                    <View style={styles.locationInfo}>
                      <Text style={styles.locationName}>
                        {post.location || post.Business.name}
                      </Text>
                      <Text style={styles.distance}>
                        ({post.distance || '250km away'})
                      </Text>
                    </View>
                    <View style={styles.locationRating}>
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <StarFilledIcon
                          key={index}
                          width={SIZES.small}
                          height={SIZES.small}
                          color="#FFD700"
                        />
                      ))}
                      <Text style={styles.ratingCount}>150</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{justifyContent: 'space-between', gap: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <View style={styles.amenityItem}>
                          <WifiIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>WiFi 4.5</Text>
                        </View>
                        <Dot width={4} height={4} />
                        <View style={styles.amenityItem}>
                          <CoffeeIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>
                            {post.Business.amenities}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <View style={styles.amenityItem}>
                          <Ambient width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>
                            {post.Business.amenities}
                          </Text>
                        </View>
                        <Dot width={4} height={4} />
                        <View style={styles.amenityItem}>
                          <ChairIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>
                            {post.Business.amenities}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.visitProfileButton}>
                      <Text style={styles.visitProfileText}>Visit profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.timeago}>{post.timeAgo || 'Just now'}</Text>
              </View>
            ))}

            {/* {posts.map((post, index) => (
              <View key={post.id} style={styles.postContainer}>
                <View style={styles.postHeader}>
                  <View style={styles.posterInfo}>
                    <Image
                      source={{uri: post.postImageUser}}
                      style={styles.posterImage}
                    />
                    <Text style={styles.posterName}>{post.posterName}</Text>
                  </View>
                  <TouchableOpacity style={styles.followButton}>
                    <Text style={styles.followText}>Follow</Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    right: 20,
                    top: 65,
                    zIndex: 55,
                    width: 35,
                    height: 35,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                  onPress={() => toggleBookmark(index)}>
                  <Bookmark
                    width={35}
                    height={35}
                    fill={isBookmarkFilled[index] ? COLORS.lightBg : 'none'}
                  />
                </TouchableOpacity>

                <ImageSlider images={post.postImages} />

                <View style={styles.interactionBar}>
                  <View style={styles.interactions}>
                    <TouchableOpacity
                      style={styles.interactionItem}
                      onPress={() => toggleHeart(index)}>
                      <HeartIcon
                        width={16}
                        height={16}
                        fill={isHeartFilled[index] ? 'red' : COLORS.white} // Independent heart icon
                      />
                      <Text style={styles.interactionCount}>32</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.interactionItem}>
                      <CommentIcon width={16} height={16} color="#9CA3AF" />
                      <Text style={styles.interactionCount}>17</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.ratingStars}>
                    {[1, 2, 3, 4, 5].map((_, idx) => (
                      <StarFilledIcon
                        key={idx}
                        width={SIZES.small}
                        height={SIZES.small}
                        color="#FFD700"
                      />
                    ))}
                  </View>
                </View>

                <Text style={styles.postDescription}>{post.description}</Text>

                <View style={styles.locationCard}>
                  <View style={styles.locationHeader}>
                    <View style={styles.locationInfo}>
                      <Text style={styles.locationName}>{post.location}</Text>
                      <Text style={styles.distance}>({post.distance})</Text>
                    </View>
                    <View style={styles.locationRating}>
                      {[1, 2, 3, 4, 5].map((_, index) => (
                        <StarFilledIcon
                          key={index}
                          width={SIZES.small}
                          height={SIZES.small}
                          color="#FFD700"
                        />
                      ))}
                      <Text style={styles.ratingCount}>150</Text>
                    </View>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{justifyContent: 'space-between', gap: 5}}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <View style={styles.amenityItem}>
                          <WifiIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>WiFi 4.5</Text>
                        </View>
                        <Dot width={4} height={4} />
                        <View style={styles.amenityItem}>
                          <CoffeeIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>Coffee 5.0</Text>
                        </View>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'center',
                          gap: 5,
                        }}>
                        <View style={styles.amenityItem}>
                          <Ambient width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>Ambience 5.0</Text>
                        </View>
                        <Dot width={4} height={4} />
                        <View style={styles.amenityItem}>
                          <ChairIcon width={SIZES.font} height={SIZES.font} />
                          <Text style={styles.amenityText}>Workspace 5.0</Text>
                        </View>
                      </View>
                    </View>

                    <TouchableOpacity style={styles.visitProfileButton}>
                      <Text style={styles.visitProfileText}>Visit profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={styles.timeago}>{post.timeAgo}</Text>
              </View>
            ))} */}
          </View>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.backgroundGray,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
  },
  header: {
    backgroundColor: COLORS.white,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.medium,
    backgroundColor: COLORS.mainblue,
    padding: 16,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: SIZES.small,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    borderColor: COLORS.primary,
    borderWidth: 3,
  },
  headerText: {
    fontSize: SIZES.large,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    color: COLORS.black,
  },
  statsSection: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    marginHorizontal: 16,
    borderColor: COLORS.backgroundGray,
    borderRadius: 8,
  },
  statHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statTitle: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
  },
  analyticsLink: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },
  statsNumbers: {
    alignItems: 'baseline',
    gap: 8,
    marginBottom: 8,
    justifyContent: 'flex-end',
  },
  visitsCount: {
    fontSize: SIZES.large,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    color: COLORS.black,
  },
  decreaseText: {
    fontSize: SIZES.small,
    color: COLORS.error,
  },
  chartContainer: {
    height: 50,
  },
  chart: {
    paddingRight: 0,
    paddingLeft: 0,
  },
  recentVisits: {
    marginVertical: 16,
    paddingHorizontal: 16,
  },
  recentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  recentTitle: {
    fontSize: SIZES.medium,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.black,
  },
  viewAll: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
  },
  visitorsRow: {
    flexDirection: 'row',
    gap: SIZES.small,
  },
  visitorItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderColor: COLORS.bgGray,
    borderWidth: 1,
    padding: 15,
    borderRadius: 8,
  },
  visitorImage: {
    width: 34,
    height: 34,
    borderRadius: 17,
  },
  visitorName: {
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.black,
  },
  feedSection: {
    marginTop: 8,
    marginBottom: 50,
    backgroundColor: COLORS.white,
  },
  sectionTitle: {
    fontSize: SIZES.medium,
    marginBottom: 16,
    marginLeft: 16,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    color: COLORS.black,
  },
  postContainer: {
    marginBottom: 16,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: SIZES.small,
  },
  posterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  posterImage: {
    width: 35,
    height: 35,
    borderRadius: 18,
    marginLeft: 16,
  },
  posterName: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.black,
  },
  followButton: {
    backgroundColor: COLORS.bgGray,
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 16,
    marginRight: 16,
  },
  followText: {
    fontSize: SIZES.small,
    color: COLORS.primary,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  postImage: {
    width: width,
    height: 200,
    marginBottom: SIZES.small,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  interactions: {
    flexDirection: 'row',
    gap: 16,
  },
  interactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  interactionCount: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  ratingStars: {
    flexDirection: 'row',
  },
  postDescription: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    marginBottom: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    paddingHorizontal: 16,
  },
  locationCard: {
    backgroundColor: COLORS.white,
    padding: SIZES.small,
    borderRadius: 8,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: COLORS.backgroundGray,
  },
  locationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationName: {
    fontSize: SIZES.font,
    color: COLORS.black,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
  },
  distance: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  locationRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingCount: {
    fontSize: SIZES.small,
    marginLeft: 4,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  amenities: {
    flexDirection: 'row',
    gap: 16,
  },
  amenityItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  amenityText: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  visitProfileButton: {
    alignSelf: 'flex-end',
    marginTop: 8,
  },
  visitProfileText: {
    fontSize: SIZES.small,
    textDecorationLine: 'underline',
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
  timeago: {
    fontSize: SIZES.small,
    color: COLORS.textColor,
    margin: 16,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
  },
});

export default ProfileFeedScreen;
