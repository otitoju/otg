import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
    Platform,
    StatusBar,
    Dimensions,
    Image,
    ActivityIndicator,
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import WifiIcon from '../../assets/images/Home/wifi-blue.svg';
import Wifi from '../../assets/images/Home/wifi-grey.svg';
import NoWifi from '../../assets/images/Home/Wifi off.svg';
import CoffeeIcon from '../../assets/images/Home/coffee-2.svg';
import DefibrilatorIcon from '../../assets/images/Home/Heart.svg';
import HospitalIcon from '../../assets/images/Home/hospital-2.svg';
import CloseIcon from '../../assets/images/Posts/remove.svg';
import SearchIcon from '../../assets/images/Home/SearchIcon.svg';
import BackIcon from '../../assets/images/Profile/arrow-right.svg';
import StarIcon from '../../assets/images/Posts/star-filled.svg';
import HalfStarIcon from '../../assets/images/Posts/star.svg';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

// Updated dummy data with random Wi-Fi availability
const dummySearchResults = [
    { id: 1, name: 'Westend Sports Bar', location: 'Ikeja, Lagos', rating: 4.5, reviews: 150, amenities: ['wifi'], image: require('../../assets/images/Communities/image1.png') },
    { id: 2, name: 'The Freaky Bar', location: 'Victoria Island, Lagos', rating: 4.2, reviews: 120, amenities: [], image: require('../../assets/images/Communities/image2.png') },
    { id: 3, name: 'Bar ON', location: 'Lekki, Lagos', rating: 4.8, reviews: 180, amenities: ['wifi'], image: require('../../assets/images/Communities/image4.png') },
    { id: 4, name: 'Chill House', location: 'Yaba, Lagos', rating: 3.5, reviews: 80, amenities: [], image: require('../../assets/images/Communities/image1.png') },
    { id: 5, name: 'Cafe One', location: 'Ikeja, Lagos', rating: 3.8, reviews: 100, amenities: ['wifi'], image: require('../../assets/images/Communities/image2.png') },
    { id: 6, name: 'Lagos Lounge', location: 'Surulere, Lagos', rating: 4.3, reviews: 130, amenities: ['wifi'], image: require('../../assets/images/Communities/image1.png') },
    { id: 7, name: 'The Coffee Spot', location: 'Lekki, Lagos', rating: 4.0, reviews: 90, amenities: ['wifi'], image: require('../../assets/images/Communities/image2.png') },
    { id: 8, name: 'The Green Cafe', location: 'Victoria Island, Lagos', rating: 4.7, reviews: 220, amenities: ['wifi'], image: require('../../assets/images/Communities/image4.png') },
    { id: 9, name: 'Tropical Cafe', location: 'Ikoyi, Lagos', rating: 4.6, reviews: 140, amenities: [], image: require('../../assets/images/Communities/image1.png') },
    { id: 10, name: 'Central Park', location: 'Yaba, Lagos', rating: 3.9, reviews: 110, amenities: ['wifi'], image: require('../../assets/images/Communities/image2.png') },
    { id: 11, name: 'Beachfront Bar', location: 'Victoria Island, Lagos', rating: 4.4, reviews: 160, amenities: [], image: require('../../assets/images/Communities/image4.png') },
    { id: 12, name: 'Skyline Bar', location: 'Lekki, Lagos', rating: 4.1, reviews: 95, amenities: ['wifi'], image: require('../../assets/images/Communities/image1.png') },
    { id: 13, name: 'Sunset Cafe', location: 'Ikeja, Lagos', rating: 3.8, reviews: 105, amenities: [], image: require('../../assets/images/Communities/image2.png') },
    { id: 14, name: 'Urban Lounge', location: 'Ikoyi, Lagos', rating: 4.9, reviews: 250, amenities: ['wifi'], image: require('../../assets/images/Communities/image4.png') },
    { id: 15, name: 'The Chill Spot', location: 'Surulere, Lagos', rating: 4.0, reviews: 80, amenities: [], image: require('../../assets/images/Communities/image1.png') },
];


const SearchScreen = () => {

    const navigation = useNavigation(); // Initialize navigation

    const [searchTerm, setSearchTerm] = useState('');
    const [recentSearches, setRecentSearches] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const clearSearch = () => {
        setSearchTerm('');
    };

    // Function to render stars, including half-filled stars
    const renderStars = (rating) => {
        const stars = [];
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(rating)) {
                stars.push(<StarIcon key={i} width={10} height={10} fill={COLORS.warning} />);
            } else if (i === Math.floor(rating) && rating % 1 !== 0) {
                stars.push(<HalfStarIcon key={i} width={10} height={10} fill={COLORS.warning} />);
            } else {
                stars.push(<StarIcon key={i} width={10} height={10} fill={COLORS.backgroundGray} />);
            }
        }
        return stars;
    };

    // Function to handle search and show activity indicator
    const handleSearch = () => {
        setIsLoading(true);
        setTimeout(() => {
            const filteredResults = dummySearchResults
                .sort(() => 0.5 - Math.random())
                .slice(0, Math.floor(Math.random() * dummySearchResults.length) + 1);  // Randomize results count
            setRecentSearches(filteredResults);
            setIsLoading(false);
        }, 1000); // Simulate a network delay
    };

    const renderSearchResultCard = (item) => (
        <TouchableOpacity style={styles.resultCard} key={item.id}>
            <Image source={item.image} style={styles.resultImage} />
            <View style={styles.resultContent}>
                <View>
                    <Text style={styles.resultTitle}>{item.name}</Text>
                    <View style={styles.locationContainer}>
                        <Text style={styles.locationText}>{item.location}</Text>
                    </View>
                </View>
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={styles.ratingContainer}>
                        <View style={styles.starsContainer}>{renderStars(item.rating)}</View>
                        <Text style={styles.reviewCount}>{item.reviews} reviews</Text>
                    </View>

                    {/* Wi-Fi Availability */}
                    <View style={styles.wifiAvailabilityContainer}>
                        {item.amenities.includes('wifi') ? (
                            <>
                                <Wifi width={16} height={16} fill={COLORS.primary} />
                                <Text style={styles.wifiText}>Available</Text>
                            </>
                        ) : (
                            <>
                                <NoWifi width={16} height={16} fill={COLORS.alert} />
                                <Text style={styles.wifiText}>Unavailable</Text>
                            </>
                        )}
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderQuickSearchItem = (Icon, label, color = COLORS.textColor, fill = COLORS.backgroundGray) => (
        <TouchableOpacity
            style={styles.quickSearchItem}
            onPress={() => {
                setSearchTerm(label); // Set the search term to the label of the quick search
                handleSearch(); // Trigger search
            }}
        >
            <Icon width={20} height={20} color={color} fill={fill} />
            <Text style={styles.quickSearchLabel}>{label}</Text>
        </TouchableOpacity>
    );

    const renderQuickSearch = () => (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick search</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.quickSearchRow}>
                {renderQuickSearchItem(WifiIcon, 'WiFi', COLORS.primary, COLORS.lightGray)}
                {renderQuickSearchItem(CoffeeIcon, 'Coffee', COLORS.secondary, COLORS.bgGray)}
                {renderQuickSearchItem(DefibrilatorIcon, 'Defibrillator', COLORS.alert, COLORS.alert)}
                {renderQuickSearchItem(HospitalIcon, 'Hospital', COLORS.success, COLORS.bgGray)}
            </ScrollView>
        </View>
    );

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>

                    <BackIcon width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Search</Text>
                <View style={{ width: 24 }} />
            </View>

            <View style={styles.searchContainer}>
                <SearchIcon width={16} height={16} fill={COLORS.white} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Search"
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    onSubmitEditing={handleSearch}
                    placeholderTextColor={COLORS.textColor}
                />
                {searchTerm.length > 0 && (
                    <TouchableOpacity onPress={clearSearch}>
                        <CloseIcon width={20} height={20} fill={COLORS.textColor} />
                    </TouchableOpacity>
                )}
                {isLoading && <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 10 }} />}
            </View>

            <View style={styles.section}>
                {renderQuickSearch()}

                <Text style={styles.sectionTitle}>
                    {searchTerm
                        ? <Text style={{ fontFamily: FONTS.RADIO_CANADA_REGULAR }}><Text style={{ fontFamily: FONTS.RADIO_CANADA_REGULAR }}>{recentSearches.length}</Text> results for <Text style={{ color: COLORS.primary, fontFamily:FONTS.RADIO_CANADA_BOLD }}>"{searchTerm}"</Text></Text>
                        : 'Your recent searches'}
                </Text>

                <View style={styles.resultsContainer}>
                    {recentSearches.length > 0 ? (
                        recentSearches.map(item => renderSearchResultCard(item))
                    ) : (
                        <Text style={styles.noResultsText}>No recent searches found.</Text>
                    )}
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.bgGray,
        marginBottom: 20,
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
    section: {
        marginBottom: SIZES.extraLarge,
    },
    sectionTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.bgGray,
        borderRadius: SIZES.buttonRadius,
        paddingHorizontal: SIZES.small,
        marginVertical: SIZES.medium,
    },
    searchInput: {
        flex: 1,
        fontSize: SIZES.medium,
        color: COLORS.textColor,
        marginLeft: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    quickSearchRow: {
        flexDirection: 'row',
    },
    quickSearchItem: {
        alignItems: 'center',
        marginRight: SIZES.medium,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
        borderWidth: 1,
        borderColor: COLORS.backgroundGray,
        paddingHorizontal: 15,
        paddingVertical: 7,
        borderRadius: SIZES.buttonRadius,
    },
    quickSearchLabel: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    quickSearchContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: SIZES.small,
        marginVertical: SIZES.small,
    },
    quickSearchButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.small,
        backgroundColor: COLORS.lightPrimary,
        borderRadius: SIZES.radius,
    },
    quickSearchText: {
        fontSize: SIZES.small,
        color: COLORS.primary,
        marginLeft: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    resultsContainer: {
        paddingVertical: SIZES.small,
    },
    noResultsText: {
        textAlign: 'center',
        fontSize: SIZES.medium,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    resultCard: {
        flexDirection: 'row',
        marginBottom: SIZES.medium,
        borderWidth: 1,
        borderColor: COLORS.backgroundGray,
        paddingVertical: SIZES.medium,
        paddingHorizontal: SIZES.small,
        marginHorizontal: SIZES.small,
        borderRadius: SIZES.small
    },
    resultImage: {
        width: 40,
        height: 40,
        borderRadius: 5,
    },
    resultContent: {
        flex: 1,
        paddingHorizontal: SIZES.small,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    resultTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
    },
    locationContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    locationText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    starsContainer: {
        flexDirection: 'row',
        marginRight: 5,
    },
    reviewCount: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    wifiAvailabilityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5,
    },
    wifiText: {
        fontSize: SIZES.small,
        color: COLORS.textColor,
        marginLeft: 5,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
});

export default SearchScreen;
