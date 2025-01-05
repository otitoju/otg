import React, { useEffect } from 'react';
import { View, Text, Image, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import { GetUserById, UpdateUser } from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';

const ProfileForm = ({ profileImage, handleChangePhoto }: any) => {
    const toast = useToast();
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [userName, setUserName] = React.useState('');
    const [bio, setBio] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [loading, setLoading] = React.useState(false);


    const GetUserProfile = async () => {

        try {
            const loggedInUser: any = await AsyncStorage.getItem('user');
            let userId = JSON.parse(loggedInUser).user.id;

            const response = await GetUserById(userId);

            if (response.info) {
                setFirstName(response.info.firstName);
                setLastName(response.info.lastName);
                setUserName(response.info.username);
                setBio(response.info.bio);
                setPhoneNumber(response.info.phone_number);
                setEmail(response.info.email);
            }
        } catch (error) {
            
            toast.show("Please try again, something went wrong", {
                type: 'danger',
                placement: 'top',
                duration: 5000,
            }); 
        }
    }

    useEffect(() => {
        GetUserProfile();
    }, []);

    const handleSubmit = async () => {
        try {
            const loggedInUser: any = await AsyncStorage.getItem('user');
            let userId = JSON.parse(loggedInUser).user.id;

            if(!userId) {
                toast.show("Please try again, something went wrong", {
                    type: 'danger',
                    placement: 'top',
                    duration: 5000,
                });
                return;
            }

            setLoading(true);

            let payload = {
                firstName: firstName,
                lastName: lastName,
                bio: bio,
                phone_number: phoneNumber,
            }

            const response = await UpdateUser(userId, payload);
            if(response) {
                setLoading(false);
                toast.show("Profile updated successfully", {
                    type: 'success',
                    placement: 'top',
                    duration: 5000,
                });
            }
        } catch (error) {
            setLoading(false);
            
            toast.show("Please try again, something went wrong", {
                type: 'danger',
                placement: 'top',
                duration: 5000,
            });
        }
    }

    return (
        <View style={styles.formContainer}>
            <View style={styles.profileImageContainer}>
                <Image
                    source={profileImage}
                    style={styles.profileImage}
                />
                <TouchableOpacity onPress={handleChangePhoto}>
                    <Text style={styles.changePhotoText}>Change photo</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Firstname</Text>
                <TextInput
                    style={styles.input}
                    value={firstName}
                    onChangeText={(text) => setFirstName(text)}
                    placeholderTextColor={COLORS.textLabel}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Lastname</Text>
                <TextInput
                    style={styles.input}
                    value={lastName}
                    onChangeText={(text) => setLastName(text)}
                    placeholderTextColor={COLORS.textLabel}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>User name</Text>
                <TextInput
                    style={styles.input}
                    value={userName}
                    onChangeText={(text) => setUserName(text)}
                    placeholderTextColor={COLORS.textColor}
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Phone number</Text>
                <View style={styles.phoneInputContainer}>
                    <View style={styles.countryCode}>
                        <Image
                            source={require('../../assets/images/Profile/NG.png')}
                            style={styles.flagIcon}
                        />
                        <Text style={styles.countryCodeText}>+234</Text>
                    </View>
                    <TextInput
                        style={styles.phoneInput}
                        value={phoneNumber}
                        onChangeText={(text) => setPhoneNumber(text)}
                        placeholderTextColor={COLORS.textColor}
                        keyboardType="phone-pad"
                    />
                </View>
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Email address</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                    placeholderTextColor={COLORS.textColor}
                    keyboardType="email-address"
                />
            </View>

            <View style={styles.inputGroup}>
                <Text style={styles.label}>Bio</Text>
                <TextInput
                    style={[styles.input, styles.bioInput]}
                    value={bio}
                    onChangeText={(text) => setBio(text)}
                    multiline
                    numberOfLines={3}
                    placeholderTextColor={COLORS.textColor}
                />
            </View>

            <TouchableOpacity disabled={loading} style={styles.saveButton} onPress={handleSubmit}>
                <Text style={styles.saveButtonText}>Save Changes</Text>
                {loading && <ActivityIndicator size="small" color={COLORS.primary} />}
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    formContainer: {
        paddingHorizontal: SIZES.medium,
    },
    profileImageContainer: {
        alignItems: 'center',
        marginVertical: SIZES.extraLarge,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SIZES.small,
    },
    changePhotoText: {
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    inputGroup: {
        marginBottom: SIZES.medium,
    },
    label: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        marginBottom: SIZES.small / 2,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    input: {
        backgroundColor: '#F3F4F6',
        borderRadius: SIZES.small,
        padding: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        fontSize: SIZES.font,
        color: COLORS.textColor,
    },
    bioInput: {
        height: 100,
        textAlignVertical: 'top',
    },
    phoneInputContainer: {
        flexDirection: 'row',
        backgroundColor: '#F3F4F6',
        borderRadius: SIZES.small,
        alignItems: 'center',
    },
    countryCode: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: SIZES.medium,
        paddingRight: SIZES.small,
    },
    flagIcon: {
        width: 24,
        height: 16,
        marginRight: SIZES.small / 2,
    },
    countryCodeText: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        fontSize: SIZES.font,
        color: COLORS.textColor,    
    },
    phoneInput: {
        flex: 1,
        padding: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        fontSize: SIZES.font,
        color: COLORS.textColor,
    },
    saveButton: {
        backgroundColor: COLORS.primary,
        flexDirection: 'row',
        justifyContent: 'center',
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

export default ProfileForm;
