import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

// Import icons
import WifiIcon from '../../assets/images/Profile/wifi-2.svg';
import StarIcon from '../../assets/images/Home/star-fill.svg'; // Add more if needed
import FONTS, { COLORS, SIZES } from '../../constants/theme';

const QAInteraction = () => {

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

            {/* Header with business info */}
            <View style={styles.header}>
                <Image 
                    source={{ uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60' }} 
                    style={styles.businessImage}
                />
                <View style={styles.headerContent}>
                    <View style={styles.headerTop}>
                        <Text style={styles.businessName}>Westend Sports Bar</Text>
                        <View style={styles.ratingContainer}>
                            {renderStars(4)}
                            <Text style={styles.reviewCount}>150 reviews</Text>
                        </View>
                    </View>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>Akowonjo, Lagos</Text>
                        
                        <View style={styles.wifiContainer}>
                            <WifiIcon width={16} height={16} />
                            <Text style={styles.wifiText}>WiFi Available</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Question */}
            <View style={styles.qaContainer}>
                <View style={styles.qaHeader}>
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1647685658173-94c4f42725fd?w=500&auto=format&fit=crop&q=60' }} 
                        style={styles.userImage}
                    />
                    <View style={styles.qaHeaderContent}>
                        <Text style={styles.userName}>Jane Doe</Text>
                        <Text style={styles.qaDate}>Akowonjo, Lagos</Text>
                    </View>

                    
                    <Text style={styles.qaDate}>18/07/24</Text>
                </View>
                <Text style={styles.qaText}>
                    Can I do photoshoot in the Cafe? Do I have to pay?
                </Text>
            </View>

            {/* Answer */}
            <View style={styles.qaContainer}>
                <View style={styles.qaHeader}>
                    <Image 
                        source={{ uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?w=500&auto=format&fit=crop&q=60' }} 
                        style={styles.userImage}
                    />
                    <View style={styles.qaHeaderContent}>
                        <Text style={styles.userName}>Westend Sports Bar</Text>
                        <Text style={styles.qaDate}>Akowonjo, Lagos</Text>
                    </View>
                    
                    <Text style={styles.qaDate}>18/07/24</Text>
                </View>
                <Text style={styles.qaText}>
                    No, you can't. But you can always use your phone to take a picture.
                </Text>
            </View>

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
        gap: 12,
        borderWidth: 1,
        borderColor: COLORS.backgroundGray,
        padding: 15,
        marginBottom: 16,
        borderRadius:15
    },
    businessImage: {
        width: 48,
        height: 48,
        borderRadius: 8,
        objectFit: 'cover',
    },
    headerContent: {
        flex: 1,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    businessName: {
        fontWeight: '600',
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
    },
    ratingContainer: {
        alignItems: 'center',
        flexDirection:'row',
        justifyContent:'center',
        gap:2
    },
    starContainer: {
        flexDirection: 'row',
        gap: 4,
    },
    reviewCount: {
        color: COLORS.textColor,
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 8,
        justifyContent:'space-between'
    },
    locationText: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    separator: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        marginHorizontal: 4,
    },
    wifiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 4,
    },
    wifiText: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    qaContainer: {
        marginBottom: 16,
    },
    qaHeader: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 8,
    },
    userImage: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    qaHeaderContent: {
        flex: 1,
    },
    userName: {
        fontWeight: '600',
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
    },
    qaDate: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    qaText: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        marginLeft: 44, // Indent text under avatar
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
});

export default QAInteraction;
