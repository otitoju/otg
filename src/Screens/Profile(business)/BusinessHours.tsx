import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Platform,
    StatusBar,
    SafeAreaView,
    Dimensions,
    ScrollView
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';
import ClockIcon from '../../assets/images/Profile/Vector.svg';

const { width } = Dimensions.get('window');

const BusinessHoursScreen = ({ navigation }) => {
    const businessHours = [
        { day: 'Monday', hours: '9:00AM - 8:00PM' },
        { day: 'Tuesday', hours: '9:00AM - 8:00PM' },
        { day: 'Wednesday', hours: '9:00AM - 8:00PM' },
        { day: 'Thursday', hours: '9:00AM - 8:00PM' },
        { day: 'Friday', hours: '9:00AM - 8:00PM' },
        { day: 'Saturday', hours: '9:00AM - 8:00PM' },
        { day: 'Sunday', hours: '1:00PM - 8:00PM' },
    ];

    return (
        <View style={styles.mainContainer}>
            <StatusBar
                barStyle="dark-content"
                backgroundColor={COLORS.white}
            />
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    {/* Header */}
                    <View style={styles.header}>
                        <TouchableOpacity 
                            style={styles.backButton}
                            onPress={() => navigation.goBack()}
                        >
                            <BackIcon width={24} height={24} color={COLORS.black} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Opening and Closing Time</Text>
                    </View>

                    <ScrollView style={styles.contentContainer}>
                        {/* Status Banner */}
                        <View style={styles.statusBanner}>
                            <ClockIcon width={20} height={20} color={COLORS.error} />
                            <Text style={styles.statusText}>
                                <Text style={styles.closedText}>Closed</Text>
                                <Text style={styles.openingText}> · Opens 9:00AM</Text>
                            </Text>
                        </View>

                        {/* Business Hours */}
                        <View style={styles.hoursContainer}>
                            {businessHours.map((schedule, index) => (
                                <View 
                                    key={schedule.day} 
                                    style={[
                                        styles.scheduleItem,
                                        index === businessHours.length - 1 && styles.lastItem
                                    ]}
                                >
                                    <Text style={styles.dayText}>{schedule.day}</Text>
                                    <Text style={styles.hoursText}>{schedule.hours}</Text>
                                </View>
                            ))}
                        </View>
                    </ScrollView>

                    {/* Edit Button */}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity 
                            style={styles.editButton}
                            onPress={() => navigation.navigate('EditBusinessHours')}
                        >
                            <Text style={styles.editButtonText}>Edit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    },
    safeArea: {
        flex: 1,
    },
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundGray,
    },
    backButton: {
        padding: SIZES.small,
        marginRight: SIZES.small,
    },
    headerTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
        width: width * 0.65,
        textAlign: 'center'
    },
    contentContainer: {
        flex: 1,
    },
    statusBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.medium,   
    },
    statusText: {
        marginLeft: SIZES.small,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    closedText: {
        color: COLORS.error,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    openingText: {
        color: COLORS.textColor,
    },
    hoursContainer: {
       
    },
    scheduleItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.large,
        marginBottom: 1,
        marginVertical: SIZES.font,
        backgroundColor: COLORS.backgroundGray,
        width:width-20,
        marginHorizontal:'auto',
        borderRadius:5
    },
    lastItem: {
        marginBottom: 0,
    },
    dayText: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.black,
    },
    hoursText: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
    },
    buttonContainer: {
        padding: SIZES.medium,
    },
    editButton: {
        backgroundColor: COLORS.primary,
        borderRadius: SIZES.buttonRadius,
        paddingVertical: SIZES.medium,
        alignItems: 'center',
    },
    editButtonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
});

export default BusinessHoursScreen;