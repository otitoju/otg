import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Image,
    Platform,
    Linking,
    Alert,
} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import FONTS, { COLORS, SIZES } from '../../constants/theme';

const LocationPermissionScreen = () => {
    const [permissionStep, setPermissionStep] = useState(1);


    const openSettings = () => {
        Linking.openSettings();
    };

    const LocationIcon = () => (
        <View style={styles.iconContainer}>
            <View style={styles.iconInner}>
                <Image
                    source={require('../../assets/images/location/location.png')}
                    style={styles.icon}
                    resizeMode="contain"
                />
            </View>
        </View>
    );

    const renderScreen1 = () => (
        <View style={styles.contentContainer}>
            <LocationIcon />
            <Text style={styles.title}>Where are you?</Text>
            <Text style={styles.description}>
                You'll need to enable your location in order to use this app.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={() => setPermissionStep(2)}
            >
                <Text style={styles.buttonText}>Open Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.remindButton}
                onPress={() => setPermissionStep(3)}
            >
                <Text style={styles.remindText}>Remind me later</Text>
            </TouchableOpacity>
            <View style={styles.secureTextContainer}>
                <Image
                    source={require('../../assets/images/location/location.png')}
                    style={styles.lockIcon}
                />
                <Text style={styles.secureText}>
                    Magical secured text to make all security concerns go away.
                </Text>
            </View>
        </View>
    );

    const renderScreen2 = () => (
        <View style={styles.alertContainer}>
            <View style={styles.alertContent}>
                <Text style={styles.alertTitle}>
                    Allow "App" to use your location?
                </Text>
                <Text style={styles.alertDescription}>
                    Your precise location is used to show your position on the map, get directions, estimate travel times and improve search results
                </Text>
                <View style={styles.preciseContainer}>
                    <Text style={styles.preciseText}>✓ Precise: On</Text>
                </View>
                <Image
                    source={require('../../assets/images/location/map.png')}
                    style={styles.mapPreview}
                />
                <TouchableOpacity
                    style={styles.alertButton}
                    onPress={() => requestLocationPermission()}
                >
                    <Text style={styles.alertButtonText}>Allow Once</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.alertButton}
                    onPress={() => requestLocationPermission()}
                >
                    <Text style={styles.alertButtonText}>Allow While Using the App</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.alertButton, styles.dontAllowButton]}
                    onPress={() => setPermissionStep(1)}
                >
                    <Text style={styles.dontAllowText}>Don't Allow</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    const renderScreen3 = () => (
        <View style={styles.contentContainer}>
            <LocationIcon />
            <Text style={styles.title}>Enable precise location</Text>
            <Text style={styles.description}>
                Your location will be used to show people near you.
            </Text>
            <TouchableOpacity
                style={styles.button}
                onPress={openSettings}
            >
                <Text style={styles.buttonText}>Open Settings</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.remindButton}
                onPress={() => {}}
            >
                <Text style={styles.remindText}>Remind me later</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            {permissionStep === 1 && renderScreen1()}
            {permissionStep === 2 && renderScreen2()}
            {permissionStep === 3 && renderScreen3()}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        paddingHorizontal: 24,
        paddingTop: 100,
    },
    iconContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#aaa',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 24,
    },
    iconInner: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon: {
        width: 100,
        height: 100,
        tintColor: '#fff',
    },
    title: {
        fontSize: SIZES.extraLarge,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.black,
        marginBottom: 8,
        textAlign: 'center',
    },
    description: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
        textAlign: 'center',
        marginBottom: 32,
        width:'70%'
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.buttonRadius,
        width: '100%',
        height: 56,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    remindButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
    },
    remindText: {
        color: COLORS.textColor,
        fontSize: 16,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    secureTextContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        position: 'absolute',
        bottom: 40,
        paddingHorizontal: 24,
         width:'75%',
        
    },
    lockIcon: {
        width: 16,
        height: 16,
        marginRight: 8,
    },
    secureText: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
         textAlign:'center'
    },
    alertContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContent: {
        backgroundColor: COLORS.white,
        borderRadius: 14,
        width: '90%',
        padding: 20,
    },
    alertTitle: {
        fontSize: 17,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 8,
    },
    alertDescription: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        textAlign: 'center',
        marginBottom: 16,
    },
    preciseContainer: {
        marginBottom: 16,
    },
    preciseText: {
        fontSize: SIZES.font,
        color: COLORS.primary,
    },
    mapPreview: {
        width: '100%',
        height: 182,
        borderRadius: 12,
        marginBottom: 16,
    },
    alertButton: {
        height: 44,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 0.5,
        borderBottomColor: COLORS.lightBorder,
    },
    alertButtonText: {
        color: COLORS.primary,
        fontSize: SIZES.large,
    },
    dontAllowButton: {
        borderBottomWidth: 0,
    },
    dontAllowText: {
        color: COLORS.primary,
        fontSize: SIZES.large,
    },
});

export default LocationPermissionScreen;
