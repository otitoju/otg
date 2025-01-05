import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import { LocationData, NotificationList } from '../../constants/data';
import WifiIcon from '../../assets/images/Home/WifiIcon.svg';

const NearLocations = () => {
    const navigation: any = useNavigation();
    const [defaultRating, setDefaultRating] = useState(2);
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5]);


    const CustomRatingBar = ({ rating }: any) => {
        return (
            <View style={styles.customRatingBarStyle}>
                {
                    maxRating.map((item: any, key: number) => (
                        <TouchableOpacity

                            activeOpacity={0.7}
                            key={item}
                            onPress={() => undefined}
                        >
                            <Image
                                style={styles.starImgStyle}
                                source={
                                    item <= rating ? require('../../assets/images/Home/star.png') : require('../../assets/images/Home/star-unfilled.png')
                                }
                            />

                        </TouchableOpacity>
                    ))
                }
            </View>
        )
    }


    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 15 }}>
                    <ArrowBack width={25} height={25} />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>Locations near you</Text>
            </View>
            <View style={styles.horizontalLine} />

            <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                {
                    LocationData?.map((location, index) => (
                        <View key={index} style={styles.notificationContainer}>
                            <View style={styles.profileContainer}>
                                <Image
                                    source={{ uri: location.images[0] }}
                                    style={styles.profileImage}
                                />
                                <View style={styles.textContainer}>
                                    <Text style={styles.nameText}>{location.name.length > 20 ? location.name.substring(0, 20) + '...' : location.name}</Text>
                                    <Text style={styles.timeText}>{location.location.length > 20 ? location.location.substring(0, 20) + '...' : location.location}</Text>
                                </View>
                            </View>



                            <View>
                                <View style={styles.ratingsContainer}>
                                    <CustomRatingBar rating={location.rating} />
                                    <Text style={styles.reviews}>{location.reviews} reviews</Text>
                                </View>

                                <View style={styles.wifiContainer}>
                                  
                                    {
                                        location.wifi && (
                                            <WifiIcon width={16} height={16} />
                                        )
                                    }
                                    {
                                        !location.wifi && (
                                            <Image
                                                source={require('../../assets/images/Home/wifi-unavailable.png')}
                                                style={{ width: 16, height: 16 }}
                                            />
                                        )}

                                    <Text style={styles.wifiText}>WiFi {location.wifi ? 'available' : 'unavailable'}</Text>
                                </View>
                            </View>

                        </View>
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.lightBg,
        paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,

    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        position: 'relative',
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginTop: 10,
    },
    notificationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,

    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 8,
        marginRight: 10,
    },
    textContainer: {
        flexDirection: 'column',
    },
    nameText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.textTitle,
    },
    timeText: {
        fontSize: SIZES.base + 2,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM
    },
    followButton: {
        backgroundColor: '#E6ECFF80',
        borderRadius: 8,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    followButtonText: {
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        fontSize: SIZES.small,
        color: COLORS.primary,
    },
    ratingsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    stars: {
        flexDirection: 'row',
        marginRight: 8,
    },
    reviews: {
        fontSize: 10,
        color: '#1E293B',
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    starImgStyle: {
        width: 10,
        height: 10,
        resizeMode: 'cover'
    },
    wifiContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    wifiText: {
        marginLeft: 5,
        fontSize: 10,
        color: COLORS.textPlaceholder,
        fontFamily: FONTS.RADIO_CANADA_REGULAR
    },
});

export default NearLocations