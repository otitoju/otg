import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Platform,
    StatusBar,
    TouchableOpacity,
    ActivityIndicator,
    Alert,
    PermissionsAndroid,
    TextInput,
    FlatList,
    Modal,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import CustomButton from '../../Components/Button';
import routes from '../../Routes/routes';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY || 'AIzaSyCa5kGaulUELkBaNEgiB66PdSQ4EqWpsKo';

const LocationPermission = () => {
    const navigation = useNavigation();
    const [defaultRegion, setDefaultRegion] = useState({
        latitude: 6.5244,
        longitude: 3.3792,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    });
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [searching, setSearching] = useState(false);
    const [nextPageToken, setNextPageToken] = useState(null);
    const [selectedBusinessType, setSelectedBusinessType] = useState('');
    const [showBusinessTypeModal, setShowBusinessTypeModal] = useState(false);

    const businessTypes = [
        'accounting', 'airport', 'art_gallery', 'bar', 'beauty_salon', 'bicycle_store', 'book_store', 'bowling_alley',
        'cafe', 'car_dealer', 'car_rental', 'car_wash',
        'casino', 'city_hall', 'embassy', 'gym', 'hair_care', 'hardware_store', 'home_goods_store',
        'hospital', 'insurance_agency', 'library',
        'light_rail_station', 'liquor_store', 'local_government_office', 'lodging',
        'meal_delivery', 'meal_takeaway', 'moving_company',
        'museum', 'night_club', 'painter', 'pet_store', 'pharmacy',

        'restaurant', 'school',
        'shopping_mall', 'spa', 'supermarket',
        'train_station', 'transit_station',

    ];

    const requestLocationPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Location Permission',
                    message: 'This app needs access to your location to show nearby places.',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
            return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
            console.warn('Permission Error:', err);
            Alert.alert('Error', 'Failed to request location permission.');
            return false;
        }
    };

    const fetchPlaces = async (latitude, longitude, pageToken = null) => {
        if (!selectedBusinessType) {
            Alert.alert('Error', 'Please select a business type first.');
            return;
        }

        setLoading(true);
        try {
            const params = {
                location: `${latitude},${longitude}`,
                radius: 5000,
                type: selectedBusinessType,
                key: GOOGLE_MAPS_API_KEY,
            };

            if (pageToken) {
                params.pagetoken = pageToken;
            }

            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
                { params }
            );

            if (pageToken) {
                setPlaces(prev => [...prev, ...(response.data.results || [])]);
            } else {
                setPlaces(response.data.results || []);
            }

            setNextPageToken(response.data.next_page_token);
        } catch (error) {
            console.error('Fetch Places Error:', error.response?.data || error.message);
            Alert.alert('Error', 'Failed to fetch nearby places. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const loadMorePlaces = () => {
        if (nextPageToken && !loading) {
            fetchPlaces(defaultRegion.latitude, defaultRegion.longitude, nextPageToken);
        }
    };

    const geocodeSearchQuery = async (query) => {
        if (!query) {
            Alert.alert('Error', 'Please enter a location to search.');
            return;
        }
        setSearching(true);
        try {
            const response = await axios.get(
                'https://maps.googleapis.com/maps/api/geocode/json',
                {
                    params: {
                        address: query,
                        key: GOOGLE_MAPS_API_KEY,
                    },
                }
            );

            const result = response.data.results[0];
            if (result) {
                const { lat, lng } = result.geometry.location;
                setDefaultRegion({
                    latitude: lat,
                    longitude: lng,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                });
                fetchPlaces(lat, lng);
            } else {
                Alert.alert('Error', 'Location not found. Try a different search term.');
            }
        } catch (error) {
            console.error('Geocoding Error:', error.message);
            Alert.alert('Error', 'Failed to find the location.');
        } finally {
            setSearching(false);
        }
    };

    useEffect(() => {
        const initializeLocation = async () => {
            const hasPermission = await requestLocationPermission();
            if (!hasPermission) {
                Alert.alert('Error', 'Location permission denied. Enable location services to continue.');
                return;
            }

            Geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setDefaultRegion({
                        latitude,
                        longitude,
                        latitudeDelta: 0.05,
                        longitudeDelta: 0.05,
                    });
                },
                (error) => {
                    console.error('Geolocation Error:', error);
                    Alert.alert('Error', 'Unable to fetch current location. Defaulting to Lagos.');
                },
                { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
            );
        };
        initializeLocation();
    }, []);

    const onMapPress = (e) => {
        const { latitude, longitude } = e.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        setPlaces((prevPlaces) => [
            ...prevPlaces,
            {
                place_id: 'custom_marker',
                geometry: { location: { lat: latitude, lng: longitude } },
                name: 'Custom Location',
                vicinity: 'Selected Location',
            },
        ]);
    };

    const BusinessTypeModal = () => (
        <Modal
            visible={showBusinessTypeModal}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setShowBusinessTypeModal(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Select Business Type</Text>
                    <FlatList
                        data={businessTypes}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                style={styles.businessTypeItem}
                                onPress={() => {
                                    setSelectedBusinessType(item);
                                    setShowBusinessTypeModal(false);
                                    fetchPlaces(defaultRegion.latitude, defaultRegion.longitude);
                                }}
                            >
                                <Text style={styles.businessTypeText}>
                                    {item.split('_').map(word =>
                                        word.charAt(0).toUpperCase() + word.slice(1)
                                    ).join(' ')}
                                </Text>
                            </TouchableOpacity>
                        )}
                    />
                    <CustomButton
                        title="Close"
                        onPress={() => setShowBusinessTypeModal(false)}
                    />
                </View>
            </View>
        </Modal>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Text style={styles.backText}>Back</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search location"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    onSubmitEditing={() => geocodeSearchQuery(searchQuery)}
                />
                {searching && <ActivityIndicator size="small" color="#0000ff" />}
            </View>

            <View style={styles.businessTypeContainer}>
                <TouchableOpacity
                    style={styles.businessTypeButton}
                    onPress={() => setShowBusinessTypeModal(true)}
                >
                    <Text style={styles.businessTypeButtonText}>
                        {selectedBusinessType
                            ? selectedBusinessType.split('_').map(word =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            ).join(' ')
                            : 'Select Business Type'}
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={{ flex: 1 }}>
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator size="large" color="#0000ff" />
                        <Text style={styles.loaderText}>Loading nearby places...</Text>
                    </View>
                ) : (
                    <MapView
                        style={StyleSheet.absoluteFillObject}
                        onPress={onMapPress}
                        showsUserLocation={true}
                        region={defaultRegion}
                        showsMyLocationButton={true}
                    >
                        {places.map((place) => (
                            <Marker
                                key={place.place_id}
                                coordinate={{
                                    latitude: place.geometry.location.lat,
                                    longitude: place.geometry.location.lng,
                                }}
                                title={place.name}
                                description={place.vicinity}
                            />
                        ))}
                    </MapView>
                )}
            </View>

            <BusinessTypeModal />

            <View style={styles.footer}>
                <CustomButton
                    title="Load More"
                    onPress={loadMorePlaces}
                    disabled={!nextPageToken || loading}
                />
                <CustomButton
                    title="Refresh"
                    onPress={() => fetchPlaces(defaultRegion.latitude, defaultRegion.longitude)}
                />
                <CustomButton
                    title="Skip"
                    onPress={() => navigation.navigate(routes.HOMESCREEN)}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight
    },
    headerStyle: {
        padding: 15
    },
    backText: {
        fontSize: 16,
        color: '#007aff',
        fontWeight: 'bold'
    },
    searchContainer: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 40,
        width: '80%',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 10,
        fontSize: 16
    },
    businessTypeContainer: {
        padding: 10,
        alignItems: 'center'
    },
    businessTypeButton: {
        backgroundColor: '#007aff',
        padding: 10,
        borderRadius: 5,
        width: '80%'
    },
    businessTypeButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderText: {
        marginTop: 10,
        fontSize: 16,
        color: '#333'
    },
    footer: {
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        width: '90%',
        maxHeight: '80%'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    businessTypeItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee'
    },
    businessTypeText: {
        fontSize: 16
    }
});

export default LocationPermission;