import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, StatusBar, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackArrow from '../../assets/images/Profile/arrow-right.svg';
import Clock from '../../assets/images/Setup/clock.svg';
import DownArrow from '../../assets/images/Setup/Right.svg'; // Add your down arrow SVG

interface TimeSlot {
    opening: Date;
    closing: Date;
}

interface BusinessHours {
    [key: string]: TimeSlot;
}

const BusinessHoursScreen = ({ navigation }) => {
    const [businessHours, setBusinessHours] = useState<BusinessHours>({
        Monday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
        Tuesday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
        Wednesday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
        Thursday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
        Friday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
        Saturday: { opening: new Date('2024-01-01T10:00:00'), closing: new Date('2024-01-01T17:00:00') },
    });

    const [showPicker, setShowPicker] = useState(false);
    const [activeDay, setActiveDay] = useState<string | null>(null);
    const [activeType, setActiveType] = useState<'opening' | 'closing' | null>(null);

    const handleTimeChange = (day: string, type: 'opening' | 'closing', time: Date) => {
        setBusinessHours(prev => ({
            ...prev,
            [day]: {
                ...prev[day],
                [type]: time
            }
        }));
    };

    const formatTime = (date: Date) => {
        return date.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    const showTimePicker = (day: string, type: 'opening' | 'closing') => {
        setActiveDay(day);
        setActiveType(type);
        setShowPicker(true);
    };

    const handleTimePickerChange = (event: any, selectedTime?: Date) => {
        setShowPicker(false);
        if (selectedTime && activeDay && activeType) {
            handleTimeChange(activeDay, activeType, selectedTime);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <BackArrow width={24} height={24} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Opening and Closing Time</Text>
            </View>

            <ScrollView style={styles.content}>
                {Object.entries(businessHours).map(([day, times]) => (
                    <View key={day} style={styles.dayContainer}>
                        <Text style={styles.dayText}>{day}</Text>
                        <View style={styles.timeContainer}>
                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => showTimePicker(day, 'opening')}
                            >
                                <Clock width={20} height={20} color={COLORS.primary} />
                                <Text style={styles.timeText}>{formatTime(times.opening)}</Text>
                                <Text style={styles.amPmText}>
                                    {times.opening.getHours() >= 12 ? 'PM' : 'AM'}
                                    <DownArrow width={10} height={10} style={styles.arrow} /> {/* Add arrow here */}
                                </Text>
                            </TouchableOpacity>

                            <Text style={styles.toText}>to</Text>

                            <TouchableOpacity
                                style={styles.timeButton}
                                onPress={() => showTimePicker(day, 'closing')}
                            >
                                <Clock width={20} height={20} color={COLORS.primary} />
                                <Text style={styles.timeText}>{formatTime(times.closing)}</Text>
                                <Text style={styles.amPmText}>
                                    {times.closing.getHours() >= 12 ? 'PM' : 'AM'}
                                    <DownArrow width={10} height={10} style={styles.arrow} /> {/* Add arrow here */}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
            </ScrollView>

            <TouchableOpacity
                style={styles.nextButton}
                onPress={() => navigation.navigate('SETUPBUSINESS', { businessHours })}
            >
                <Text style={styles.nextButtonText}>Save changes</Text>
            </TouchableOpacity>

            {showPicker && (
                <DateTimePicker
                    value={
                        activeDay && activeType
                            ? businessHours[activeDay][activeType]
                            : new Date()
                    }
                    mode="time"
                    is24Hour={false}
                    display="spinner"
                    onChange={handleTimePickerChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SIZES.medium,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundGray,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    },
    headerTitle: {
        marginLeft: SIZES.medium,
        fontSize: SIZES.large,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
        textAlign: 'center',
        width: '80%'
    },
    content: {
        flex: 1,
        padding: SIZES.medium,
    },
    dayContainer: {
        marginBottom: SIZES.medium,
    },
    dayText: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
        marginBottom: SIZES.small,
    },
    timeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: SIZES.medium,
        padding: SIZES.medium,
    },
    timeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.backgroundGray,
        padding: SIZES.small,
        borderRadius: SIZES.small,
    },
    timeText: {
        marginLeft: SIZES.small,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.textTitle,
        flex: 1,
    },
    amPmText: {
        fontSize: SIZES.small,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
        marginLeft: SIZES.small,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    arrow: {
        marginLeft: SIZES.extraSmall, // Adjust spacing between AM/PM and the arrow
    },
    toText: {
        marginHorizontal: SIZES.medium,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
    },
    nextButton: {
        backgroundColor: COLORS.primary,
        margin: SIZES.medium,
        padding: SIZES.medium,
        borderRadius: 55,
        alignItems: 'center',
    },
    nextButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default BusinessHoursScreen;
