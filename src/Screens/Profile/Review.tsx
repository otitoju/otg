import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

// Import SVG icons
import WifiIcon from '../../assets/images/Home/wifi.svg';
import StarIcon from '../../assets/images/Home/star-fill.svg'; // Add more as needed
import FONTS, { COLORS, SIZES } from '../../constants/theme'

const ReviewDetail = () => {
    const reviewImages = [
        'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1542372147193-a7aca54189cd?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60',
        'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60',
    ];

    const renderStars = (rating) => {
        return (
            <View style={styles.starContainer}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                        key={star}
                        fill={star <= rating ? '#FFD700' : '#D3D3D3'}
                    />
                ))}
            </View>
        );
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>

            {/* User info and rating section */}
            <View style={styles.userInfo}>
                <View style={styles.userDetails}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHByb2ZpbGUlMjBwaWN0dXJlfGVufDB8fDB8fHww' }}
                        style={styles.userImage}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
                        <View>
                            <Text style={styles.userName}>Jane Doe</Text>
                            <Text style={styles.userLocation}>Lagos, Nigeria</Text>
                        </View>

                        <View style={styles.ratingContainer}>
                            {renderStars(4.5)}
                            <Text style={styles.reviewDate}>Written 18/07/24</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Location info */}
            <View style={styles.locationCard}>
                <View style={styles.locationInfo}>
                    <Image
                        source={{ uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60' }}
                        style={styles.locationImage}
                    />
                    <View style={styles.locationDetails}>
                        <View>
                            <Text style={styles.locationName}>Westend Sports Bar</Text>
                            <Text style={styles.locationAddress}>Akowonjo, Lagos</Text>
                        </View>

                        <View style={styles.locationExtras}>
                            <View style={{alignItems:'flex-end'}}>
                                <View style={styles.ratingInfo}>
                                    {renderStars(4.5)}
                                    <Text style={styles.reviewCount}>150 reviews</Text>
                                </View>

                                <View style={{ flexDirection: 'row' }}>
                                    <WifiIcon width={16} height={16} />
                                    <Text style={styles.amenities}>• WiFi Available</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>

            {/* Review content */}
            <View style={styles.reviewContent}>
                <Text style={styles.reviewTitle}>Best spot ever</Text>
                <Text style={styles.reviewTime}>Visited Morning</Text>
                <Text style={styles.reviewText}>
                    This is not my first time in Cafe One and I will always come here for their amazing coffee and croissant with great atmospheric condition. We thank the team for putting this up, it is like a....
                </Text>
                <TouchableOpacity>
                    <Text style={styles.readMore}>Read more</Text>
                </TouchableOpacity>
            </View>

            {/* Horizontal Image gallery */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.imageGallery}>
                {reviewImages.map((image, index) => (
                    <View key={index} style={styles.imageWrapper}>
                        <Image
                            source={{ uri: image }}
                            style={styles.reviewImage}
                        />
                    </View>
                ))}
            </ScrollView>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginBottom: 16,
    },
    backButton: {
        padding: 8,
    },
    userInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    userDetails: {
        flexDirection: 'row',
        gap: 12,
    },
    userImage: {
        width: 48,
        height: 48,
        borderRadius: 24,
    },
    userName: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color:COLORS.black
    },
    userLocation: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    ratingContainer: {
        alignItems: 'flex-end',
    },
    starContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    reviewDate: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
    },
    locationCard: {
        padding: 16,
        borderRadius: 8,
        marginBottom: 16,
        borderColor:COLORS.backgroundGray,
        borderWidth:1
    },
    locationInfo: {
        flexDirection: 'row',
        gap: 12,
    },
    locationImage: {
        width: 64,
        height: 64,
        borderRadius: 8,
    },
    locationDetails: {
        flex: 1,
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    locationName: {
        fontWeight: '600',
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    locationAddress: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    locationExtras: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
        
    },
    ratingInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    reviewCount: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    amenities: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    reviewContent: {
        marginBottom: 16,
    },
    reviewTitle: {
        fontWeight: '600',
        fontSize: SIZES.medium,
        marginBottom: 8,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    reviewTime: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        marginBottom: 8,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    reviewText: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        marginBottom: 8,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    readMore: {
        color: COLORS.textColor,
        fontSize: 14,
        textDecorationLine:'underline',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    imageGallery: {
        marginTop: 16,
        flexDirection: 'row',
    },
    imageWrapper: {
        marginRight: 8, // Adds space between images
    },
    reviewImage: {
        width: 120, // Set the size of the images in the gallery
        height: 120,
        borderRadius: 8,
        objectFit: 'cover',
    },
});

export default ReviewDetail;
