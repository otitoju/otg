import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StatusBar, StyleSheet,Platform } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Profile/arrow-right.svg';
import CommunityModal from '../../Components/Modal/CommunityModal';
import { launchImageLibrary } from 'react-native-image-picker'; 
import ProfileForm from './ProfileForm';
import InterestsForm from './InterestsForm';

const EditProfileScreen = ({ navigation }) => {
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [profileImage, setProfileImage] = useState(require('../../assets/images/Communities/image1.png')); 
    const [activeTab, setActiveTab] = useState('profile');

    const handleSaveChanges = () => {
        setShowSuccessModal(true);
    };

    const handleCloseModal = () => {
        setShowSuccessModal(false);
        navigation.goBack();
    };

    const handleChangePhoto = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 0.5, includeBase64: false },
            (response) => {
                if (response.assets) {
                    setProfileImage({ uri: response.assets[0].uri });
                }
            }
        );
    };

    return (
        <>
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                        <BackIcon width={24} height={24} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Edit Profile</Text>
                    <View style={{ width: 24 }} />
                </View>

                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={activeTab === 'profile' ? styles.activeTab : styles.tab}
                        onPress={() => setActiveTab('profile')}
                    >
                        <Text style={activeTab === 'profile' ? styles.activeTabText : styles.tabText}>
                            Profile
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={activeTab === 'interests' ? styles.activeTab : styles.tab}
                        onPress={() => setActiveTab('interests')}
                    >
                        <Text style={activeTab === 'interests' ? styles.activeTabText : styles.tabText}>
                            Interests
                        </Text>
                    </TouchableOpacity>
                </View>

                {activeTab === 'profile' ? (
                    <ProfileForm profileImage={profileImage} handleChangePhoto={handleChangePhoto} />
                ) : (
                    <InterestsForm />
                )}

                
            </ScrollView>

            <CommunityModal
                visible={showSuccessModal}
                onClose={handleCloseModal}
                type="success"
                title="Changes Saved"
                buttonText="Done"
                onButtonPress={handleCloseModal}
            />
        </>
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
    tabContainer: {
        flexDirection: 'row',
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E7EB',
    },
    tab: {
        paddingVertical: SIZES.small,
        marginRight: SIZES.large,
    },
    activeTab: {
        paddingVertical: SIZES.small,
        marginRight: SIZES.large,
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    tabText: {
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    activeTabText: {
        color: COLORS.primary,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        margin: SIZES.medium,
        padding: SIZES.medium,
        borderRadius: SIZES.buttonRadius,
        alignItems: 'center',
        marginTop: SIZES.extraLarge,
    },
    saveButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default EditProfileScreen;
