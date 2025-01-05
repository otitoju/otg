import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Platform,
    StatusBar,
    Dimensions,
    Animated,
    ImageBackground  // Import ImageBackground
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';

const { width, height } = Dimensions.get('window');

const visitorsData = [
    {
        id: 1,
        name: 'Jane Doe',
        location: 'Ikeja, Lagos',
        time: '2 mins ago',
        image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400',
        blurred: false
    },
    {
        id: 2,
        name: 'Tommy Glease',
        location: 'Ikeja, Lagos',
        time: '5 mins ago',
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
        blurred: false
    },
    {
        id: 3,
        name: 'Sarah Williams',
        location: 'Ikeja, Lagos',
        time: '15 mins ago',
        image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400',
        blurred: true
    },
    {
        id: 4,
        name: 'Michael Roberts',
        location: 'Ikeja, Lagos',
        time: '30 mins ago',
        image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400',
        blurred: true
    }
];

const ProfileVisitsScreen = ({ navigation }) => {
    const [blurValue, setBlurValue] = useState(new Animated.Value(0));
    const [visibleCards, setVisibleCards] = useState(4);

    useEffect(() => {
        const animateBlur = () => {
            Animated.timing(blurValue, {
                toValue: visibleCards > 3 ? 10 : 0,
                duration: 100,
                useNativeDriver: true,
            }).start();
        };
        animateBlur();

        return () => {
            blurValue.setValue(0);
        };
    }, [visibleCards]);

    const handleScroll = (event) => {
        const { nativeEvent } = event;
        const scrollPosition = nativeEvent.contentOffset.y;

        if (scrollPosition >= 100) {
            setVisibleCards(Math.min(visibleCards + 1, 4));
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <BackIcon width={24} height={24} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Recent Profile Visits</Text>
            </View>

            {/* Visitors List */}
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollViewContent}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            >
                {visitorsData.slice(0, visibleCards).map((visitor) => (
                    <Animated.View key={visitor.id} style={styles.visitorItem}>
                        <View style={styles.visitorInfo}>
                            <Image
                                source={{ uri: visitor.image }}
                                style={styles.visitorImage}
                                blurRadius={visitor.blurred ? 10 : 0}  // Apply blur conditionally
                            />
                            <View style={styles.visitorDetails}>
                                <Text style={styles.visitorName}>{visitor.name}</Text>
                                <Text style={styles.visitorLocation}>{visitor.location}</Text>
                            </View>
                        </View>
                        <View style={styles.rightContent}>
                            <Text style={styles.timeAgo}>{visitor.time}</Text>
                            {!visitor.blurred && (
                                <TouchableOpacity style={styles.messageButton}>
                                    <Text style={styles.messageText}>Message</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </Animated.View>
                ))}
            </ScrollView>

            {/* Upgrade Prompt with Blur Background */}
            <ImageBackground 
                source={{ uri: 'https://via.placeholder.com/1x1' }}  // Placeholder image for blur effect
                style={styles.upgradeContainer}
                blurRadius={10}  // Set blur radius as desired
            >
                <View style={{ marginBottom: 25 }}>
                    <Text style={styles.upgradeText}>
                        Upgrade to view more profile
                    </Text>
                    <Text style={styles.upgradeText}>
                        data about your businesses
                    </Text>
                </View>
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade</Text>
                </TouchableOpacity>
            </ImageBackground>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundGray,
    },
    backButton: {
        padding: SIZES.small,
        marginRight: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
        width: width * 0.65,
        textAlign: 'center'
    },
    scrollView: {
        flex: 1,
    },
    scrollViewContent: {
        alignItems: 'center',
    },
    visitorItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.backgroundGray,
        borderRadius: 8,
        width: width * 0.9,
        marginBottom: 5,
        alignSelf: 'center',
    },
    visitorInfo: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    visitorImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
    },
    visitorDetails: {
        marginLeft: SIZES.small,
    },
    visitorName: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.black,
        marginBottom: 2,
    },
    visitorLocation: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    rightContent: {
        alignItems: 'flex-end',
    },
    timeAgo: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        marginBottom: 4,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    messageButton: {
        paddingVertical: 4,
    },
    messageText: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        textDecorationLine: 'underline'
    },
    upgradeContainer: {
        padding: SIZES.extraLarge,
        alignItems: 'center',
        position: 'absolute',
        width: width,
        top: height / 3,
        backgroundColor: '#ffffffcc',
        height: height / 1.6,
        paddingTop: 70,
    },
    upgradeText: {
        fontSize: SIZES.large,
        color: COLORS.black,
        textAlign: 'center',
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    upgradeButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 15,
        paddingHorizontal: 55,
        borderRadius: SIZES.buttonRadius,
    },
    upgradeButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default ProfileVisitsScreen;
