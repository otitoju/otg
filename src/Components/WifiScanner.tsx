
import React, { useEffect, useState } from 'react';
import { View, Text, Button, FlatList, PermissionsAndroid, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import CustomButton from './Button';

const WifiScanner = () => {
    const [wifiList, setWifiList] = useState<string[]>([]);
    const [isScanning, setIsScanning] = useState(false);


    useEffect(() => {
        scanWifi();
    }, []);

    const requestPermissions = async () => {
        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
                ]);
                return (
                    granted['android.permission.ACCESS_FINE_LOCATION'] === 'granted' &&
                    granted['android.permission.ACCESS_COARSE_LOCATION'] === 'granted'
                );
            } catch (err) {
                console.error('Permission request failed:', err);
                return false;
            }
        }
        return true;
    };

    const scanWifi = async () => {
   
        const hasPermission = await requestPermissions();
        if (!hasPermission) return;

        try {
            setIsScanning(true);
            const networks = await WifiManager.loadWifiList();

            setWifiList(networks.map(network => network.SSID));
            setIsScanning(false);
        } catch (err) {
            console.error('Failed to scan Wi-Fi:', err);
            setIsScanning(false);
        }
    };

    if (isScanning) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 14, fontWeight: 'bold', marginBottom: 16, color: '#333' }}>Searching for Wi-Fi networks...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* <TouchableOpacity style={styles.scanButton} onPress={scanWifi}>
                <Text style={styles.scanButtonText}>Scan Wi-Fi</Text>
            </TouchableOpacity> */}
            <CustomButton title="Scan Wi-Fi" onPress={scanWifi} />

            {wifiList.length > 0 ? (
                <FlatList
                    data={wifiList}
                    keyExtractor={(item, index) => `${item}-${index}`}
                    renderItem={({ item }) => (
                        <View style={styles.listItem}>
                            <Text style={styles.listItemText}>{item}</Text>
                        </View>
                    )}
                />
            ) : (
                <Text style={styles.noWifiText}>No Wi-Fi networks found. Tap "Scan Wi-Fi" to try again.</Text>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f9f9f9',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 16,
        color: '#333',
    },
    scanButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        alignSelf: 'center',
        marginBottom: 16,
    },
    scanButtonText: {
        fontSize: 18,
        color: 'white',
        fontWeight: '600',
    },
    listItem: {
        backgroundColor: 'white',
        padding: 16,
        marginVertical: 8,
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1,
        elevation: 2,
    },
    listItemText: {
        fontSize: 16,
        color: '#333',
    },
    noWifiText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 16,
    },
});


export default WifiScanner;