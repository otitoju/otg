import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Profile/arrow-right.svg';

// Import social icons (assuming they're SVG components)
import LinkIcon from '../../assets/images/Profile/link.svg';
import SMSIcon from '../../assets/images/Profile/sms.svg';
import InstagramIcon from '../../assets/images/Profile/instagram.svg';
import EmailIcon from '../../assets/images/Profile/email.svg';
import WhatsappIcon from '../../assets/images/Profile/whatsapp.svg';
import TwitterIcon from '../../assets/images/Profile/instagram.svg';

const ShareButton = ({ icon: Icon, label, onPress }) => (
    <TouchableOpacity style={styles.shareButton} onPress={onPress}>
        <Icon width={48} height={48} />
        <Text style={styles.shareLabel}>{label}</Text>
    </TouchableOpacity>
);

const InviteFriendsScreen = ({ navigation }) => {
    const handleShare = (platform) => {
        // Handle sharing logic for different platforms
        console.log(`Sharing via ${platform}`);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Invite Friends</Text>
                <View style={{ width: 24 }} />
            </View>

            <Image
                source={require('../../assets/images/Profile/friends-car.png')}
                style={styles.image}
                resizeMode="cover"
            />

            <Text style={styles.title}>
                Lets invite friends to try ON-THE-GO!
            </Text>

            <Text style={styles.subtitle}>
                They can enjoy all the perks just like you
            </Text>

            <Text style={styles.sectionTitle}>
                Invite friends via
            </Text>

            <View style={styles.shareGrid}>
                <ShareButton
                    icon={LinkIcon}
                    label="Copy link"
                    onPress={() => handleShare('link')}
                />
                <ShareButton
                    icon={SMSIcon}
                    label="SMS"
                    onPress={() => handleShare('sms')}
                />
                <ShareButton
                    icon={InstagramIcon}
                    label="Instagram"
                    onPress={() => handleShare('instagram')}
                />
                <ShareButton
                    icon={EmailIcon}
                    label="Email"
                    onPress={() => handleShare('email')}
                />
                <ShareButton
                    icon={WhatsappIcon}
                    label="Whatsapp"
                    onPress={() => handleShare('whatsapp')}
                />
                <ShareButton
                    icon={TwitterIcon}
                    label="Twitter"
                    onPress={() => handleShare('twitter')}
                />
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.medium,
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    },
    backButton: {
        padding: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: '600',
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    image: {
        width: '95%',
        height: 200,
        borderRadius: SIZES.medium,
        marginHorizontal: SIZES.medium,
        marginVertical: SIZES.medium,
        alignSelf: 'center',
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontWeight: '600',
        color: COLORS.textTitle,
        textAlign: 'center',
        marginHorizontal: SIZES.large,
        marginTop: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    subtitle: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        textAlign: 'center',
        marginHorizontal: SIZES.large,
        marginTop: SIZES.small,
        marginBottom: SIZES.extraLarge,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        color: COLORS.black,
        marginHorizontal: SIZES.large,
        marginBottom: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    shareGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        paddingHorizontal: SIZES.medium,
    },
    shareButton: {
        width: '18%', // Adjust width for 5 items in a row
        alignItems: 'center',
        marginBottom: SIZES.large,
    },
    shareLabel: {
        fontSize: SIZES.font - 2,
        color: COLORS.textColor,
        marginTop: SIZES.small, // Add space between icon and label
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
});

export default InviteFriendsScreen;
