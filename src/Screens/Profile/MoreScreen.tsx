import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, StatusBar } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import RequestModal from './../../Components/Modal/RequestModal';
import BackIcon from '../../assets/images/Profile/arrow-right.svg';
import UserIcon from '../../assets/images/Profile/Users.svg';
import InfoIcon from '../../assets/images/Profile/Image.svg';
import SettingIcon from '../../assets/images/Profile/Settings.svg';
import LogOut from '../../assets/images/Profile/logout.svg';
import DeleteIcon from '../../assets/images/Profile/Prompts.svg';
import WifiIcon from '../../assets/images/Home/WifiIcon.svg';

import WifiScanner from '../../Components/WifiScanner';
import routes from '../../Routes/routes';


const MoreScreen = ({ navigation }) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);

    const handleDelete = () => {
        // Handle delete account
        setShowDeleteModal(false);
    };

    const handleLogout = () => {
        // Handle logout
        setShowLogoutModal(false);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackIcon width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>More</Text>
                <View style={{ width: 24 }} />
            </View>

            <TouchableOpacity style={styles.menuItem}   onPress={() => {
              navigation.navigate('INVITEFREIENDSCREEN');
            }}>
                <UserIcon width={24} height={24} color={COLORS.textColor} />
                <Text style={styles.menuText}>Invite Friends</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}   onPress={() => {
              navigation.navigate(routes.WIFISCREEN);
            }}>
                <WifiIcon width={24} height={24} color={COLORS.textColor} />
                <Text style={styles.menuText}>Check Available WiFi</Text>
            </TouchableOpacity>


            <TouchableOpacity style={styles.menuItem}>
                <InfoIcon width={24} height={24} color={COLORS.textColor} />
                <Text style={styles.menuText}>About on the go</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setShowDeleteModal(true)}
            >
                <SettingIcon width={24} height={24} color={COLORS.textColor} />
                <Text style={styles.menuText}>Delete account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.menuItem}
                onPress={() => setShowLogoutModal(true)}
            >
                <SettingIcon width={24} height={24} color={COLORS.textColor} />
                <Text style={styles.menuText}>Log out</Text>
            </TouchableOpacity>

            <RequestModal
                visible={showDeleteModal}
                onClose={() => setShowDeleteModal(false)}
                onAccept={handleDelete}
                onDecline={() => setShowDeleteModal(false)}
                icon={DeleteIcon}
                title="Delete account?"
                message="You would be able to appeal for your account in the next 48 hours after which, your account would be totally deleted."
                acceptText="Delete"
                declineText="Cancel"
                buttonStatus="bad"  // Set to 'bad' for error color
            />


            {/* Logout Modal */}
            <RequestModal
                visible={showLogoutModal}
                onClose={() => setShowLogoutModal(false)}
                onAccept={handleLogout}
                onDecline={() => setShowLogoutModal(false)}
                icon={LogOut}
                title="Log out?"
                message=""
                acceptText="Yes"
                declineText="Cancel"
                iconFillColor={COLORS.primary}
            />
        </View>
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
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: '600',
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.medium,
        backgroundColor: COLORS.bgGray,
        marginHorizontal: SIZES.medium,
        marginVertical: SIZES.small / 2,
        borderRadius: SIZES.medium,
    },
    menuText: {
        marginLeft: SIZES.medium,
        fontSize: SIZES.medium,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_BOLD,

    },
});

export default MoreScreen;