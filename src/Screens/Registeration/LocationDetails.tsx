import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import Bookmark from '../../assets/images/Home/Bookmark.svg';
import ShareIcon from '../../assets/images/Home/ion_share-outline.svg';
import { LocationData } from '../../constants/data';
import ImageSlider from '../../Components/Slider';
import EnhancedImageSlider from '../../Components/EnhancedSlider';
import CoffeeIcon from '../../assets/images/Others/coffee.svg';
import PlantIcon from '../../assets/images/Home/plant.svg';
import LightHouseIcon from '../../assets/images/Home/light-home.svg';
import ArrowRightIcon from '../../assets/images/Profile/arrow right.svg';
import WifiIcon from '../../assets/images/Home/WifiIcon.svg';
import { ScrollView } from 'react-native-gesture-handler';
import CustomButton from '../../Components/Button';
import routes from '../../Routes/routes';
import MapContainer from '../../Components/MapContainer';
import ReviewContainer from '../../Components/ReviewContainer';

const iconMap: any = {
    wifiIcon: <WifiIcon width={18} height={18} />,
    coffeeIcon: <CoffeeIcon width={18} height={18} />,
    plantIcon: <PlantIcon width={18} height={18} />,
    lighthouseIcon: <LightHouseIcon width={18} height={18} />,
};

const LocationDetails = () => {
    const route = useRoute<any>();
    const navigation: any = useNavigation();
    const [data, setData] = React.useState<any>({});
    const [activeTab, setActiveTab] = useState('reviews');
    const locationId: any = route?.params?.locationId;

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

    useEffect(() => {
        GetLocationDetail();
    }, [locationId]);

    const GetLocationDetail = () => {
        const data = LocationData.find((item: any) => item.id === locationId);

        if (data) {
            setData(data);
        }
    }

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
                    <ArrowBack width={25} height={25} />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: SIZES.font, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>{data?.name?.length > 20 ? data?.name.substring(0, 20) + '...' : data?.name}</Text>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <ShareIcon width={20} height={20} />
                    <View style={{ marginHorizontal: 10 }} />
                    <Bookmark width={20} height={20} />
                </View>
            </View>

            <View style={styles.horizontalLine} />

            <EnhancedImageSlider images={data?.images} />
            <View style={{ flex: 1, padding: 15, marginTop: 30, }}>

                <View style={[, { marginHorizontal: 5 }]}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ color: COLORS.textTitle, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.font }}>{data?.location}</Text>
                            <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, fontSize: SIZES.small }}>({data?.distance})</Text>
                        </View>

                        <View style={[styles.ratingsContainer, { marginBottom: 0 }]}>
                            <CustomRatingBar rating={4} />
                            <Text style={styles.reviews}>{data.reviews}</Text>
                        </View>
                    </View>

                    <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                        {data?.facilities?.slice(0, 2).map((facility: any, idx: any) => (
                            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} key={idx}>
                                <TouchableOpacity>
                                    {iconMap[facility.icon]}
                                </TouchableOpacity>
                                <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, fontSize: SIZES.small }}>{facility.name} ({facility.rating})</Text>
                            </View>
                        ))}
                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{ marginTop: 5, flexDirection: 'row', alignItems: 'center' }}>
                            {data?.facilities?.slice(2).map((facility: any, idx: any) => (
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }} key={idx}>
                                    <TouchableOpacity>
                                        {iconMap[facility.icon]}
                                    </TouchableOpacity>
                                    <Text style={{ color: COLORS.textPlaceholder, fontFamily: FONTS.RADIO_CANADA_REGULAR, marginLeft: 5, fontSize: SIZES.small }}>{facility.name} ({facility.rating})</Text>
                                </View>
                            ))}
                        </View>
                    </View>
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.headerText}>About</Text>
                    <Text style={{ fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textTitle, marginTop: 5 }}>{data?.about}</Text>

                    <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', }}>
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.primary, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small, textDecorationLine: 'underline' }}>View website</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.primary, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small, textDecorationLine: 'underline', marginHorizontal: 15 }}>Menu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <Text style={{ color: COLORS.primary, fontFamily: FONTS.RADIO_CANADA_REGULAR, fontSize: SIZES.small, textDecorationLine: 'underline' }}>Leave a review</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[styles.headerText, { fontSize: SIZES.font }]}>Opening hours</Text>
                            <ArrowRightIcon width={20} height={15} />
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <WifiIcon width={20} height={20} />
                                <Text style={{ color: COLORS.error, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.small, marginLeft: 5 }}>Closed</Text>
                                <Text style={{ color: COLORS.textTitle, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.small, marginLeft: 5 }}>Opens 9:00 AM</Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.locationContainer}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={[styles.headerText, { fontSize: SIZES.font }]}>WiFi</Text>
                            <ArrowRightIcon width={20} height={15} />
                        </View>

                        <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center', }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <WifiIcon width={20} height={20} />
                                <Text style={{ color: COLORS.textColor, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.small, marginLeft: 5 }}>Not connected</Text>

                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.headerText}>Location</Text>
                        <Text style={{ fontSize: SIZES.small, fontFamily: FONTS.RADIO_CANADA_REGULAR, color: COLORS.textTitle, marginTop: 5 }}>{data?.location}</Text>

                        <View style={{ marginTop: 20, width: '100%', height: 200, borderRadius: 70 }}>
                            <MapContainer />
                        </View>

                        <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                            <Text style={{ color: COLORS.textHeader, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, fontSize: SIZES.font, }}>Have you visited here?</Text>

                            <CustomButton title="Make a Post" onPress={() => { navigation.navigate(routes.HOMESCREEN) }} textStyle={{ color: COLORS.black }} style={{ color: COLORS.primary, marginTop: 10, backgroundColor: COLORS.lightBg, borderWidth: 1, borderColor: COLORS.black, }} />
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.tabBar}>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'reviews' && styles.activeTab]}
                                onPress={() => setActiveTab('reviews')}
                            >
                                <Text style={[styles.tabText, activeTab === 'reviews' && styles.activeTabText]}>Reviews</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.tab, activeTab === 'faq' && styles.activeTab]}
                                onPress={() => setActiveTab('faq')}
                            >
                                <Text style={[styles.tabText, activeTab === 'faq' && styles.activeTabText]}>FAQ</Text>
                            </TouchableOpacity>
                        </View>


                        <View style={styles.content}>
                            {activeTab === 'reviews' ? (
                                
                                // <Text>No reviews available</Text>
                                <ReviewContainer />
                            ) : (
                               
                                <Text>No FAQ available</Text>
                            )}
                        </View>
                    </View>
                </View>

            </View>

            <View style={{ marginVertical: 20 }} />
        </ScrollView>
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
        justifyContent: 'space-between',
        height: 50,
        paddingHorizontal: 15,
    },
    horizontalLine: {
        height: 1,
        backgroundColor: '#ccc',
        width: '100%',
        marginTop: 10,
    },
    locationContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,

        marginTop: 20,
    },
    address: {
        fontSize: SIZES.small,
        color: COLORS.textPlaceholder,
        marginBottom: 10,
        fontFamily: FONTS.RADIO_CANADA_REGULAR
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
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
        marginRight: 10
    },
    starImgStyle: {
        width: 12,
        height: 12,
        resizeMode: 'cover'
    },
    headerText: {
        fontSize: SIZES.medium,
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
    },
    tabBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    tabText: {
        fontSize: SIZES.font,
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
    },
    activeTab: {
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
    },
    activeTabText: {
        color: COLORS.primary,
    },
    content: {
        padding: 0,
        marginTop: 10,
    },
    contentText: {
        fontSize: 16,
        paddingVertical: 10,
        color: '#333',
    },
})

export default LocationDetails