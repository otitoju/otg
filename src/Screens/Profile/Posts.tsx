import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    ScrollView,
    Image,
    StyleSheet,
    TouchableOpacity,
    Platform,
    StatusBar,
    Dimensions
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import { LineChart } from 'react-native-chart-kit';
import ChevronRight from '../../assets/images/Home/Arrow right.svg';
import HeartIcon from '../../assets/images/Home/Heart.svg';
import CommentIcon from '../../assets/images/Home/Message circle.svg';
import StarFilledIcon from '../../assets/images/Home/star-fill.svg';
import StartHalfFilledIcon from '../../assets/images/Home/star-half-fill.svg';
import WifiIcon from '../../assets/images/Home/wifi.svg';
import CoffeeIcon from '../../assets/images/Home/Coffee.svg';
import ChairIcon from '../../assets/images/Home/Building.svg';
import Ambient from '../../assets/images/Home/ambient.svg';
import Bell from '../../assets/images/Home/bell.svg';
import Dot from '../../assets/images/Home/dot.svg';
import Bookmark from '../../assets/images/Home/Bookmark.svg';
import ImageSlider from '../../Components/ImageSlider';

const { width } = Dimensions.get('window');

const feedData = [
    {
        id: 1,
        posterName: "Jane Doe",
        postImageUser: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
        postImages: [
            'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60'
        ],
        description: "Beautiful mountain cafe with an amazing view! Swipe to see more photos of this incredible space.",
        location: "Mountain View Cafe",
        distance: "2.3km",
        rating: 4.5,
        timeAgo: "2 hours ago"
    },
    {
        id: 2,
        posterName: "John Smith",
        postImageUser: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60',
        postImages: [
            'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1507133750040-4a8f57021571?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&auto=format&fit=crop&q=60'
        ],
        description: "Best coffee spot in town. Great ambiance and perfect for remote work!",
        location: "City Coffee House",
        distance: "0.8km",
        rating: 5.0,
        timeAgo: "3 hours ago"
    },
    {
        id: 3,
        posterName: "Alice Johnson",
        postImageUser: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
        postImages: [
            'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=500&auto=format&fit=crop&q=60',
            'https://images.unsplash.com/photo-1534073737927-85f1ebff1f5d?w=500&auto=format&fit=crop&q=60'
        ],
        description: "Quiet workspace with fast Wi-Fi. Perfect for focused work sessions.",
        location: "Library Co-Working",
        distance: "1.5km",
        rating: 4.8,
        timeAgo: "5 hours ago"
    }
];

const GImages = [
    'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww',
    'https://plus.unsplash.com/premium_photo-1683880731561-f0cceb0ad405?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw3fHx8ZW58MHx8fHx8',
    'https://images.unsplash.com/photo-1712002641088-9d76f9080889?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHVzZXJzfGVufDB8fDB8fHww',
]

const ProfileFeedScreen = ({ bookmarked = false, postCount = feedData.length, posts }: any) => {
    // Initialize the state for each heart as false for all feed posts
    const [isHeartFilled, setIsHeartFilled] = useState(feedData.map(() => false));
    const [isBookmarkFilled, setIsBookmarkFilled] = useState(
        bookmarked ? feedData.map(() => true) : feedData.map(() => false)
    );
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


    // Function to toggle heart icon for each post independently
    const toggleHeart = (index) => {
        const updatedHearts = [...isHeartFilled];
        updatedHearts[index] = !updatedHearts[index]; // Toggle specific heart
        setIsHeartFilled(updatedHearts); // Update the heart state
    };

    const toggleBookmark = (index) => {
        const updatedBookmarks = [...isBookmarkFilled];
        updatedBookmarks[index] = !updatedBookmarks[index]; // Toggle specific bookmark
        setIsBookmarkFilled(updatedBookmarks); // Update the bookmark state
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

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.feedSection}>
                    {
                        posts?.length > 0 ? (
                            posts?.map((item: any, index: number) => {
                                const mediaArray = item.media ? item.media.replace(/"/g, '').split(',') : [];
                                return (
                                    <View key={index} style={styles.postContainer}>
                                        <TouchableOpacity
                                            style={{
                                                position: 'absolute',
                                                right: 10,
                                                top: 20,
                                                zIndex: 55,
                                                width: 35,
                                                height: 35,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                            onPress={() => toggleBookmark(index)}
                                        >
                                            <Bookmark
                                                width={35}
                                                height={35}
                                                fill={isBookmarkFilled[index] ? COLORS.lightBg : 'none'}
                                            />
                                        </TouchableOpacity>

                                        {mediaArray.length > 0 ? (
                                            <ImageSlider
                                                images={mediaArray}
                                            />
                                        ) : (
                                            <ImageSlider images={GImages} />
                                        )}

                                        <View style={styles.interactionBar}>
                                            <View style={styles.interactions}>
                                                <TouchableOpacity style={styles.interactionItem} onPress={() => toggleHeart(index)}>
                                                    <HeartIcon
                                                        width={16}
                                                        height={16}
                                                        fill={isHeartFilled[index] ? "red" : COLORS.white} // Heart icon toggles independently
                                                    />
                                                    <Text style={styles.interactionCount}>{JSON.parse(item?.likes)?.length}</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity style={styles.interactionItem}>
                                                    <CommentIcon width={16} height={16} color="#9CA3AF" />
                                                    <Text style={styles.interactionCount}>{item.comments.length}</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <View style={styles.ratingStars}>
                                                <CustomRatingBar rating={item.rating} />
                                            </View>
                                        </View>

                                        <Text style={styles.postDescription}>{item.description}</Text>

                                        <View style={styles.locationCard}>
                                            <View style={styles.locationHeader}>
                                                <View style={styles.locationInfo}>
                                                    <Text style={styles.locationName} numberOfLines={1}
                                                        ellipsizeMode="tail"
                                                    >{item.business.name}</Text>
                                                    <Text style={styles.distance}>7km</Text>
                                                </View>
                                                <View style={styles.locationRating}>
                                                    <CustomRatingBar rating={item.rating} />
                                                    <Text style={styles.ratingCount}>150</Text>
                                                </View>
                                            </View>

                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <View style={{ justifyContent: 'space-between', gap: 5 }}>
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
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
                                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                        <View style={styles.amenityItem}>
                                                            <ChairIcon width={SIZES.font} height={SIZES.font} />
                                                            <Text style={styles.amenityText}>Chair 5.0</Text>
                                                        </View>
                                                        <Dot width={4} height={4} />
                                                        <View style={styles.amenityItem}>
                                                            <Ambient width={SIZES.font} height={SIZES.font} />
                                                            <Text style={styles.amenityText}>Ambient 4.8</Text>
                                                        </View>
                                                    </View>
                                                </View>
                                                <TouchableOpacity>
                                                    <Bell width={40} height={40} />
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                    </View>
                                )
                            })
                        )
                            :
                            (
                                <View style={{ alignItems: 'center', marginTop: 20 }}>
                                    <Text style={{ marginTop: 10, color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small }}>No posts yet.</Text>
                                </View>
                            )
                    }
                    {/* {feedData.slice(0, postCount).map((post, index) => (
                    <View key={post.id} style={styles.postContainer}>
                        <TouchableOpacity
                            style={{
                                position: 'absolute',
                                right: 10,
                                top: 20,
                                zIndex: 55,
                                width: 35,
                                height: 35,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            onPress={() => toggleBookmark(index)}
                        >
                            <Bookmark
                                width={35}
                                height={35}
                                fill={isBookmarkFilled[index] ? COLORS.lightBg : 'none'}
                            />
                        </TouchableOpacity>

                        <ImageSlider images={post.postImages} />

                        <View style={styles.interactionBar}>
                            <View style={styles.interactions}>
                                <TouchableOpacity style={styles.interactionItem} onPress={() => toggleHeart(index)}>
                                    <HeartIcon
                                        width={16}
                                        height={16}
                                        fill={isHeartFilled[index] ? "red" : COLORS.white} // Heart icon toggles independently
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
                                    <StarFilledIcon key={idx} width={SIZES.small} height={SIZES.small} color="#FFD700" />
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
                                        <StarFilledIcon key={index} width={SIZES.small} height={SIZES.small} color="#FFD700" />
                                    ))}
                                    <Text style={styles.ratingCount}>150</Text>
                                </View>
                            </View>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ justifyContent: 'space-between', gap: 5 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
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
                                    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                        <View style={styles.amenityItem}>
                                            <ChairIcon width={SIZES.font} height={SIZES.font} />
                                            <Text style={styles.amenityText}>Chair 5.0</Text>
                                        </View>
                                        <Dot width={4} height={4} />
                                        <View style={styles.amenityItem}>
                                            <Ambient width={SIZES.font} height={SIZES.font} />
                                            <Text style={styles.amenityText}>Ambient 4.8</Text>
                                        </View>
                                    </View>
                                </View>
                                <TouchableOpacity>
                                    <Bell width={40} height={40} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                ))} */}
                </View>
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    feedSection: {
        marginTop: 8,
        backgroundColor: COLORS.white,
    },
    sectionTitle: {
        fontSize: SIZES.medium,
        marginBottom: 16,
        marginLeft: 16,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black
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
        marginLeft: 16
    },
    posterName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.black
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
        paddingHorizontal: 16
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
        paddingHorizontal: 16
    },
    locationCard: {
        backgroundColor: COLORS.white,
        padding: SIZES.small,
        borderRadius: 8,
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: COLORS.backgroundGray
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
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black
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
});

export default ProfileFeedScreen;