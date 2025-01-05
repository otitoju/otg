import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
    Dimensions
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';
import PersonalIcon from '../../assets/images/Profile/personal details icon.svg';
import VerificationIcon from '../../assets/images/Profile/badge.svg';
import TimeIcon from '../../assets/images/Profile/clock.svg';
import SocialIcon from '../../assets/images/Profile/message bubble.svg';
import WifiIcon from '../../assets/images/Profile/wifi.svg';
import VerifiedIcon from '../../assets/images/Profile/status-verified.svg'; // New icon for "Verified"
import AwaitingIcon from '../../assets/images/Profile/awaiting-status.svg'; // New icon for "Awaiting"

const { width, height } = Dimensions.get('window');

const BusinessProfileSetupScreen = ({ navigation }) => {
    const menuItems = [
        { 
            id: 1, 
            title: 'Personal Details', 
            route: 'BUSINESSDETAILSSCREEN',
            icon: PersonalIcon,
        },
        { 
            id: 2, 
            title: 'Business Verification', 
            route: 'BUSINESSVERIFICATIONSCREEN',
            icon: VerificationIcon,
            status: 'awaiting' // 'awaiting' or 'verified' as possible statuses
        },
        { 
            id: 3, 
            title: 'Opening and closing time', 
            route: 'BUSINESSHOURSSCREEN',
            icon: TimeIcon,
        },
        { 
            id: 4, 
            title: 'Socials', 
            route: 'SOCIALLINKS',
            icon: SocialIcon,
        },
        { 
            id: 5, 
            title: 'WiFi Connection', 
            route: 'WIFICONNECTION',
            icon: WifiIcon,
        },
    ];

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.contentContainer}>
                        <View style={styles.header}>
                            <TouchableOpacity style={styles.backButton}>
                                <BackIcon width={24} height={24} color={COLORS.black} />
                            </TouchableOpacity>
                            <Text style={styles.headerTitle}>Business Profile</Text>
                        </View>

                        <View style={styles.menuContainer}>
                            {menuItems.map((item) => (
                                <TouchableOpacity
                                    key={item.id}
                                    style={styles.menuItem}
                                    onPress={() => navigation.navigate(item.route)}
                                >
                                    <View style={styles.iconContainer}>
                                        <item.icon color={COLORS.black} width={24} height={24} />
                                    </View>
                                    <Text style={styles.menuText}>{item.title}</Text>
                                    {item.status && (
                                        <View>
                                            {item.status === 'verified' ? (
                                                <VerifiedIcon width={84} height={26} />
                                            ) : (
                                                <AwaitingIcon  width={84} height={26} />
                                            )}
                                          
                                        </View>
                                    )}
                                    <Text style={styles.chevron}>›</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        marginTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
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
    menuContainer: {
        paddingHorizontal: SIZES.medium,
        paddingTop: SIZES.medium,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: SIZES.medium,
        backgroundColor: COLORS.bgGray,
        padding: 20,
        paddingHorizontal: 30,
        marginTop: 20,
        borderRadius: 5
    },
    iconContainer: {
        marginRight: SIZES.medium,
    },
    menuText: {
        flex: 1,
        fontSize: SIZES.medium,
        color: COLORS.black,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.small,
        paddingVertical: SIZES.small / 2,
        borderRadius: SIZES.small,
        marginRight: SIZES.small,
    },
    awaitingBackground: {
        backgroundColor: '#FFF9E7',
    },
    verifiedBackground: {
        backgroundColor: '#E7F9E7',
    },
    statusText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        marginLeft: 5, // Adds space between icon and text
    },
    awaitingText: {
        color: COLORS.warning,
    },
    verifiedText: {
        color: COLORS.success,
    },
    chevron: {
        fontSize: SIZES.large,
        color: COLORS.textColor,
        marginLeft: SIZES.small,
    },
});

export default BusinessProfileSetupScreen;
