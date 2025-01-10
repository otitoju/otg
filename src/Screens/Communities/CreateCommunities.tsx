import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Platform,
    StatusBar,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Placeholder from '../../assets/images/Others/placeholder.svg';
import Arrow from '../../assets/images/Communities/arrow-right.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/Button';
import CommunityModal from '../../Components/Modal/CommunityModal';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

const { width, height } = Dimensions.get('window');

const CreateCommunities = () => {
    const navigation: any = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [communityType, setCommunityType] = useState('Public');
    const [communityName, setCommunityName] = useState('');
    const [communityDescription, setCommunityDescription] = useState('');
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
    const [isCreating, setIsCreating] = useState(false);
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const loggedInUser: any = await AsyncStorage.getItem('user');
                const parsedUser = JSON.parse(loggedInUser);
                const extractedUserId = parsedUser.user.id;
                console.log('User ID:', extractedUserId);
                setUserId(extractedUserId);
            } catch (error) {
                console.error('Error retrieving user ID:', error);
                Alert.alert('Error', 'Failed to retrieve user information');
            }
        };

        fetchUserId();
    }, []);

    const selectImage = () => {
        launchImageLibrary(
            { mediaType: 'photo', quality: 1 },
            response => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    const selectedAsset: any = response.assets[0];
                    setSelectedImage(selectedAsset.uri);
                }
            }
        );
    };

const handleCreateCommunity = async () => {
    if (!communityName.trim() || !communityDescription.trim()) {
        Alert.alert('Error', 'Please fill in all required fields.');
        return;
    }

    if (!userId) {
        Alert.alert('Error', 'User ID not found. Please log in again.');
        return;
    }

    setIsCreating(true);

    const roomData = {
        name: communityName,
        type: 'group',
        description: communityDescription,
        image_url: selectedImage || '',
        status: communityType,
        created_by: userId, // Use actual userId
        member_ids: [userId], // Assign the current user as a member
    };

    console.log('Room data to be sent:', roomData);

    try {
        const apiUrl = 'http://192.168.0.114:5000/api/v1/chat/room/create';
        console.log('Sending request to:', apiUrl);

        const response = await axios.post(apiUrl, roomData);

        console.log('Response received:', response.data);

        if (response.data.success) {
            setIsSuccessModalVisible(true);
        } else {
            console.log('Failed to create community:', response.data.message);
            Alert.alert('Error', 'Failed to create the community. Please try again.');
        }
    } catch (error) {
        if (error.response) {
            // Server responded with a status other than 2xx
            console.log('Error response from server:', error.response.data);
        } else if (error.request) {
            // Request was made, but no response received
            console.log('No response received:', error.request);
        } else {
            // Something else caused the error
            console.log('Error setting up request:', error.message);
        }
        Alert.alert('Error', 'An error occurred while creating the community.');
    } finally {
        setIsCreating(false);
    }
};



    const handleInviteFriends = () => {
        console.log('Inviting friends...');
        setIsSuccessModalVisible(false);
        navigation.navigate('INVITEFREIENDS');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Arrow width={24} height={24} fill={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Create Community</Text>
                <View style={{ width: 30 }} />
            </View>

            {/* Form */}
            <ScrollView style={{ flex: 0.65, padding: 15 }} showsHorizontalScrollIndicator={false}>
                <View>
                    <View style={styles.imageWrapper}>
                        <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
                            {selectedImage ? (
                                <Image source={{ uri: selectedImage }} style={styles.image} />
                            ) : (
                                <View style={styles.placeholder}>
                                    <Placeholder width={30} height={30} />
                                    <Text style={styles.placeholderText}>Upload photo</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        {selectedImage && (
                            <TouchableOpacity onPress={selectImage}>
                                <Text
                                    style={[styles.placeholderText, { marginTop: 10, fontSize: SIZES.font }]}
                                >
                                    Change photo
                                </Text>
                            </TouchableOpacity>
                        )}
                    </View>

                    <Text style={styles.label}>What type of community do you want to create?</Text>
                    <View style={styles.radioContainer}>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setCommunityType('Public')}
                        >
                            <View style={[styles.circle, communityType === 'Public' && styles.selectedCircle]} />
                            <Text style={styles.radioText}>Public</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioButton}
                            onPress={() => setCommunityType('Private')}
                        >
                            <View style={[styles.circle, communityType === 'Private' && styles.selectedCircle]} />
                            <Text style={styles.radioText}>Private</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: 30 }}>
                        <Text style={styles.label}>Community name</Text>
                        <CustomInput
                            placeholder="Project Team"
                            value={communityName}
                            onChangeText={setCommunityName}
                        />
                        <Text style={styles.label}>Description</Text>
                        <CustomInput
                            placeholder="A group for managing project discussions and tasks."
                            value={communityDescription}
                            onChangeText={setCommunityDescription}
                            multiline={true}
                            numberOfLines={6}
                        />
                    </View>
                </View>
            </ScrollView>

            {/* Button */}
            <View style={{ flex: 0.25, padding: 15 }}>
                <CustomButton
                    title={isCreating ? 'Creating...' : 'Create Community'}
                    onPress={handleCreateCommunity}
                    disabled={isCreating}
                />
            </View>

            {/* Success Modal */}
            <CommunityModal
                visible={isSuccessModalVisible}
                onClose={() => setIsSuccessModalVisible(false)}
                type="success"
                title="Community Created Successfully"
                description="Your new community is ready! Start connecting with members and build engaging discussions."
                buttonText="Invite Friends"
                onButtonPress={handleInviteFriends}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBg,
        paddingTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomColor: COLORS.lightBorder,
        borderBottomWidth: 1,
        width: width,
        paddingBottom: 25,
    },
    headerText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        flex: 1, // Allows the text to take available space
        textAlign: 'center', // Centers the title text
        fontWeight: '600'
    },
    imageContainer: {
        width: 140,
        height: 140,
        borderRadius: 75,
        backgroundColor: COLORS.backgroundGray,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
    },
    placeholder: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    placeholderText: {
        color: COLORS.textColor,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        marginTop: 5,
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    imageWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 50
    },
    label: {
        marginBottom: 8,
        color: COLORS.textLabel,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    radioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20, // Spacing between radio buttons
    },
    circle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: COLORS.textColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },
    selectedCircle: {
        borderColor: COLORS.primary, // Primary color for active button
        backgroundColor: COLORS.primary, // Primary color for the selected button
    },
    radioText: {
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
});

export default CreateCommunities;
