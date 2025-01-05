import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
    Dimensions,
    TextInput,
    ScrollView,
    Image, // Import Image for displaying uploaded logo
} from 'react-native';
import * as ImagePicker from 'react-native-image-picker'; // Import ImagePicker
import DocumentPicker from 'react-native-document-picker'; // Import DocumentPicker
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Profile/arrow-right.svg';
import DropdownIcon from '../../assets/images/Setup/Right 2.svg';
import CancelIcon from '../../assets/images/Setup/Combined Shape.svg';
import PlusIcon from '../../assets/images/Setup/Vector.svg';


const { width } = Dimensions.get('window');

const BusinessDetailsScreen = ({ navigation }) => {
    const [businessData, setBusinessData] = useState({
        name: '',
        type: '',
        address: '',
        description: '',
        amenities: [],
        logo: null,
    });
    const [showBusinessTypeDropdown, setShowBusinessTypeDropdown] = useState(false);
    const [showAmenitiesDropdown, setShowAmenitiesDropdown] = useState(false);

    const businessTypes = ['Restaurant', 'Cafe', 'Retail', 'Service'];
    const amenitiesOptions = ['Wi-Fi', 'Parking', 'Air Conditioning', 'Pet Friendly'];

    const toggleAmenitiesDropdown = () => setShowAmenitiesDropdown((prev) => !prev);

    const selectAmenity = (amenity) => {
        setBusinessData((prevState) => {
            const amenities = [...prevState.amenities, amenity];
            return { ...prevState, amenities };
        });
        setShowAmenitiesDropdown(false); // Close dropdown after selection
    };

    const removeAmenity = (amenity) => {
        setBusinessData((prevState) => {
            const amenities = prevState.amenities.filter((a) => a !== amenity);
            return { ...prevState, amenities };
        });
    };

    const toggleBusinessTypeDropdown = () => setShowBusinessTypeDropdown((prev) => !prev);

    const selectBusinessType = (type) => {
        setBusinessData({ ...businessData, type });
        setShowBusinessTypeDropdown(false);
    };

    const handleLogoUpload = async () => {
        // Prompt user to select an image
        const options = {
            mediaType: 'photo',
            quality: 1,
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                setBusinessData((prevState) => ({ ...prevState, logo: response.assets[0].uri }));
            }
        });
    };

    return (
        <View style={styles.mainContainer}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
            <SafeAreaView style={styles.safeArea}>
                <ScrollView style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                            <BackIcon width={24} height={24} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Business Details</Text>
                        <View style={{ width: 24 }} />
                    </View>

                    {/* Form Content */}
                    <View style={styles.contentContainer}>
                        {/* Business Name Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Business Name</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Business Name"
                                placeholderTextColor={COLORS.textColor + '50'}
                                value={businessData.name}
                                onChangeText={(text) => setBusinessData({ ...businessData, name: text })}
                            />
                        </View>

                        {/* Business Type Dropdown */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Business Type</Text>
                            <TouchableOpacity style={styles.dropdownButton} onPress={toggleBusinessTypeDropdown}>
                                <Text style={styles.dropdownText}>{businessData.type || 'e.g. Restaurant'}</Text>
                                <DropdownIcon width={20} height={20} />
                            </TouchableOpacity>
                            {showBusinessTypeDropdown && (
                                <View style={styles.dropdownList}>
                                    {businessTypes.map((item) => (
                                        <TouchableOpacity key={item} onPress={() => selectBusinessType(item)} style={styles.dropdownItem}>
                                            <Text style={styles.dropdownItemText}>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Business Address Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Business Address</Text>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Address"
                                placeholderTextColor={COLORS.textColor + '50'}
                                value={businessData.address}
                                onChangeText={(text) => setBusinessData({ ...businessData, address: text })}
                            />
                        </View>

                        {/* Business Description Input */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Describe your business</Text>
                            <TextInput
                                style={[styles.input, styles.textArea]}
                                placeholder="Enter Description"
                                placeholderTextColor={COLORS.textColor + '50'}
                                multiline={true}
                                numberOfLines={4}
                                value={businessData.description}
                                onChangeText={(text) => setBusinessData({ ...businessData, description: text })}
                            />
                        </View>

                        {/* Amenities Dropdown */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Add Amenities</Text>
                            <TouchableOpacity style={styles.dropdownButton} onPress={toggleAmenitiesDropdown}>
                                <View style={styles.selectedAmenitiesContainer}>
                                    {businessData.amenities.length > 0 ? (
                                        businessData.amenities.map((amenity) => (
                                            <View key={amenity} style={styles.selectedAmenity}>
                                                <Text style={styles.selectedAmenityText}>{amenity}</Text>
                                                <TouchableOpacity onPress={() => removeAmenity(amenity)} style={styles.cancelIcon}>
                                                    <CancelIcon width={10} height={10} color={COLORS.white} />
                                                </TouchableOpacity>
                                            </View>
                                        ))
                                    ) : (
                                        <Text style={styles.dropdownText}>Select amenities</Text>
                                    )}
                                </View>
                                <DropdownIcon width={20} height={20} />
                            </TouchableOpacity>
                            {showAmenitiesDropdown && (
                                <View style={styles.dropdownList}>
                                    {amenitiesOptions.map((item) => (
                                        <TouchableOpacity key={item} onPress={() => selectAmenity(item)} style={styles.dropdownItem}>
                                            <Text style={styles.dropdownItemText}>{item}</Text>
                                        </TouchableOpacity>
                                    ))}
                                </View>
                            )}
                        </View>

                        {/* Upload Logo Section */}
                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Upload logo</Text>
                            {businessData.logo ? (
                                <Image source={{ uri: businessData.logo }} style={styles.uploadedImage} />
                            ) : (
                                <TouchableOpacity style={styles.uploadContainer} onPress={handleLogoUpload}>
                                     <PlusIcon width={14} height={24} />
                                    <Text style={styles.uploadText}>Upload Business Logo</Text>
                                    <Text style={styles.uploadSubText}>PNG, JPEG, JPG. Max of 200KB</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    </View>

                    {/* Next Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={styles.nextButton} onPress={() => navigation.navigate('SETUPBUSINESS')}>
                            <Text style={styles.nextButtonText}>Save changes</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
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
        width: width,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bgGray,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    },
    backButton: {
        padding: SIZES.small,
        marginLeft: -SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.large,
        fontWeight: '600',
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    contentContainer: {
        flex: 1,
        padding: SIZES.medium,
    },
    inputContainer: {
        marginBottom: SIZES.medium,
    },
    label: {
        fontSize: SIZES.medium,
        color: COLORS.black,
        marginBottom: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    input: {
        backgroundColor: COLORS.bgGray,
        borderRadius: SIZES.small,
        padding: SIZES.small,
        fontSize: SIZES.medium,
        color: COLORS.black,
    },
    textArea: {
        minHeight: 100,
        maxHeight: 150,
    },
    dropdownButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.bgGray,
        borderRadius: SIZES.small,
        padding: SIZES.small,
    },
    dropdownText: {
        fontSize: SIZES.medium,
        color: COLORS.textColor,
    },
    dropdownList: {
        backgroundColor: COLORS.white,
        borderRadius: SIZES.small,
        elevation: 2,
        marginTop: SIZES.small,
        position: 'absolute',
        zIndex: 1,
        width: '100%',
    },
    dropdownItem: {
        padding: SIZES.small,
    },
    dropdownItemText: {
        fontSize: SIZES.medium,
        color: COLORS.black,
    },
    selectedAmenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    selectedAmenity: {
        backgroundColor: COLORS.black,
        borderRadius: SIZES.small,
        padding: 4,
        marginRight: 5,
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectedAmenityText: {
        color: COLORS.white,
        fontSize: SIZES.small,
        marginRight: 5,
    },
    cancelIcon: {
        padding: 4,
    },
    uploadedImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
        borderRadius: SIZES.small,
        marginTop: SIZES.small,
    },
    uploadContainer: {
        borderWidth: 1,
        borderColor: COLORS.black,
        borderRadius: SIZES.small,
        padding: SIZES.medium,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: SIZES.small,
        borderStyle:'dashed',
        paddingVertical:30
    },
    uploadText: {
        color: COLORS.black,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    uploadSubText: {
        color: COLORS.black + '80',
        fontSize: SIZES.font,
        textAlign: 'center',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    buttonContainer: {
        paddingHorizontal: SIZES.medium,
        paddingBottom: SIZES.large,
    },
    nextButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: SIZES.medium,
        borderRadius: SIZES.buttonRadius,
        alignItems: 'center',
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default BusinessDetailsScreen;
