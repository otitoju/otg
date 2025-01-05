import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, StatusBar, ScrollView } from 'react-native';
import { BarChart, PieChart } from 'react-native-chart-kit'; // Keep PieChart import
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';

const { width, height } = Dimensions.get('window');

const AnalyticsPage = () => {
    const [showUpgrade, setShowUpgrade] = useState(true);

    const clicksData = {
        labels: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'],
        datasets: [{ data: [150, 400, 100, 300, 350, 200] }],
    };

    const genderData = [
        {
            name: 'Male',
            population: 50,
            color: COLORS.primary,
            legendFontColor: COLORS.textColor,
            legendFontFamily: FONTS.RADIO_CANADA_MEDIUM,
        },
        {
            name: 'Female',
            population: 100,
            color: COLORS.error,
            legendFontColor: COLORS.textColor,
            legendFontFamily: FONTS.RADIO_CANADA_MEDIUM,
        },
    ];

    const ageData = {
        labels: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        datasets: [{ data: [150, 350, 100, 200, 250, 150] }],
    };

    const chartConfig = {
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        color: (opacity = 1) => `rgba(75, 123, 229, ${opacity})`,
        strokeWidth: 2,
        decimalPlaces: 0,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={styles.container}>
            <ScrollView
                contentContainerStyle={{ paddingBottom: showUpgrade ? height / 2.5 : 20 }}
                showsVerticalScrollIndicator={false}
                scrollEnabled={!showUpgrade} // Disable scrolling when upgrade is shown
            >
                <View style={styles.header}>
                    <TouchableOpacity style={styles.backButton}>
                        <BackIcon width={24} height={24} color={COLORS.textColor} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Profile Clicks</Text>
                </View>

                <View style={styles.statsContainer}>
                    <Text style={styles.statNumber}>456</Text>
                    <Text style={styles.statChange}>+4%</Text>
                </View>

                <View style={styles.chartContainer}>
                    <Text style={styles.sectionTitle}>Profile Clicks</Text>
                    <BarChart
                        data={clicksData}
                        width={width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        style={styles.chart}
                        showBarTops={false}
                        withInnerLines={false}
                    />
                </View>

                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.sectionTitle}>Gender Distribution</Text>
                        <TouchableOpacity>
                            <Text style={styles.viewButton}>View Details</Text>
                        </TouchableOpacity>
                    </View>
                    <PieChart // Still using PieChart to create a doughnut chart
                        data={genderData}
                        width={width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        accessor="population"
                        backgroundColor="transparent"
                        paddingLeft="15"
                        style={styles.chart}
                        innerRadius="50%" // Set inner radius to create a doughnut effect
                    />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Age Distribution</Text>
                    <BarChart
                        data={ageData}
                        width={width - 40}
                        height={220}
                        chartConfig={chartConfig}
                        style={styles.chart}
                        showBarTops={false}
                        withInnerLines={false}
                    />
                </View>
            </ScrollView>

            {showUpgrade && (
                <View style={styles.upgradeContainer}>
                    <View style={{ marginBottom: 25 }}>
                        <Text style={styles.upgradeText}>Upgrade to view more profile</Text>
                        <Text style={styles.upgradeText}>data about your businesses</Text>
                    </View>
                    <TouchableOpacity style={styles.upgradeButton} onPress={() => setShowUpgrade(false)}>
                        <Text style={styles.upgradeButtonText}>Upgrade</Text>
                    </TouchableOpacity>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 0,
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundGray,
        marginBottom: 20,
    },
    backButton: {
        marginRight: 20,
    },
    headerTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
        width: width * 0.65,
        textAlign: 'center',
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    statNumber: {
        fontSize: 24,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.textTitle,
        marginRight: SIZES.small,
    },
    statChange: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.success,
    },
    chartContainer: {
        marginBottom: SIZES.extraLarge,
    },
    chart: {
        marginVertical: SIZES.medium,
        borderRadius: 16,
    },
    section: {
        marginBottom: SIZES.extraLarge,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.textTitle,
    },
    viewButton: {
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.primary,
    },
    upgradeContainer: {
        padding: SIZES.extraLarge,
        alignItems: 'center',
        position: 'absolute',
        width: width,
        top: height / 1.4,
        backgroundColor: '#ffffffcc',
        height: height / 2.5,
        paddingTop: 70,
    },
    upgradeText: {
        fontSize: SIZES.large,
        color: COLORS.black,
        textAlign: 'center',
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    upgradeButton: {
        backgroundColor: COLORS.white,
        paddingVertical: 12,
        paddingHorizontal: 44,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    upgradeButtonText: {
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.black,
        fontSize: SIZES.medium,
    },
});

export default AnalyticsPage;
