import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    StatusBar
} from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import BackIcon from '../../assets/images/Home/back.svg';
import SearchIcon from '../../assets/images/Home/SearchIcon.svg';

const { width, height } = Dimensions.get('window');

const AnalyticsScreen = () => {
    const [activeTab, setActiveTab] = useState('week');

    const profileData = {
        week: { labels: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'], datasets: [{ data: [15, 35, 10, 25, 30, 15] }] },
        month: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ data: [50, 75, 60, 80] }] },
        custom: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ data: [90, 85, 70, 60, 95] }] }
    };

    const storeData = {
        week: { labels: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'], datasets: [{ data: [40, 25, 15, 10, 5, 0] }] },
        month: { labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'], datasets: [{ data: [30, 50, 20, 40] }] },
        custom: { labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'], datasets: [{ data: [65, 55, 75, 50, 85] }] }
    };

    const chartConfig = {
        backgroundColor: COLORS.white,
        backgroundGradientFrom: COLORS.white,
        backgroundGradientTo: COLORS.white,
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 82, 255, ${opacity})`,
        style: { borderRadius: 16 },
        propsForBackgroundLines: { strokeDasharray: '', stroke: "#E3E3E3", strokeWidth: 1 },
        propsForLabels: { fontFamily: FONTS.RADIO_CANADA_MEDIUM, fontSize: 12 }
    };

    const storeChartConfig = {
        ...chartConfig,
        color: (opacity = 1) => `rgba(156, 220, 255, ${opacity})`
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton}>
                    <BackIcon width={24} height={24} color={COLORS.textColor} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Profile Visits</Text>
            </View>

            <View style={styles.tabContainer}>
                {['week', 'month', 'custom'].map((tab) => (
                    <TouchableOpacity
                        key={tab}
                        onPress={() => setActiveTab(tab)}
                        style={[styles.tab, activeTab === tab && styles.activeTab]}
                    >
                        <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                            {tab === 'week' ? 'This week' : tab === 'month' ? 'This month' : 'Custom'}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            <View style={styles.searchInfo}>
                <SearchIcon width={20} height={20} color={COLORS.textColor} />
                <Text style={styles.searchText}>
                    {activeTab === 'week' ? 'You appeared in 25 searches this week' : activeTab === 'month' ? 'You appeared in 90 searches this month' : 'Custom search data'}
                </Text>
            </View>

            <View style={styles.chartSection}>
                <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>Profile clicks</Text>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statsNumber}>{activeTab === 'week' ? '456' : activeTab === 'month' ? '1,200' : 'Custom'}</Text>
                        <Text style={styles.statsChange}>{activeTab === 'week' ? '+7%' : activeTab === 'month' ? '+15%' : 'Custom %'}</Text>
                    </View>
                </View>
                <BarChart
                    data={profileData[activeTab]}
                    width={width - 50}
                    height={180}
                    chartConfig={chartConfig}
                    style={styles.chart}
                    showBarTops={false}
                    fromZero
                    withInnerLines
                    segments={4}
                />
            </View>

            <View style={styles.chartSection}>
                <View style={styles.chartHeader}>
                    <Text style={styles.chartTitle}>Store visits</Text>
                    <View style={styles.statsContainer}>
                        <Text style={styles.statsNumber}>{activeTab === 'week' ? '360' : activeTab === 'month' ? '980' : 'Custom'}</Text>
                        <Text style={[styles.statsChange, activeTab === 'week' ? {} : styles.negativeChange]}>
                            {activeTab === 'week' ? '-2%' : activeTab === 'month' ? '+5%' : 'Custom %'}
                        </Text>
                    </View>
                </View>
                <BarChart
                    data={storeData[activeTab]}
                    width={width - 50}
                    height={180}
                    chartConfig={storeChartConfig}
                    style={styles.chart}
                    showBarTops={false}
                    fromZero
                    withInnerLines
                    segments={4}
                />
            </View>

            <View style={styles.upgradeContainer}>
                <View style={{ marginBottom: 25 }}>
                    <Text style={styles.upgradeText}>
                        Upgrade to view more profile
                    </Text>
                    <Text style={styles.upgradeText}>
                        data about your businesses
                    </Text>
                </View>
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.backgroundGray,
        marginBottom: 20
    },
    backButton: {
        marginRight: 20,
    },
    headerTitle: {
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.black,
        width: width * 0.65,
        textAlign: 'center'
    },
    tabContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    tab: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        marginRight: 10,
        borderRadius: 20,
        backgroundColor: COLORS.bgGray,
    },
    activeTab: {
        backgroundColor: COLORS.primary,
    },
    tabText: {
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.textColor,
    },
    activeTabText: {
        color: COLORS.white,
    },
    searchInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        padding: 12,
        borderRadius: 8,
        marginBottom: 20,
        elevation: 4
    },
    searchText: {
        marginLeft: 10,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.textColor,
    },
    chartSection: {
        marginBottom: 20,
        elevation: 4,
        backgroundColor: COLORS.white,
        padding: 5,
        borderRadius: 8
    },
    chartHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    chartTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.textTitle,
    },
    statsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    statsNumber: {
        fontSize: SIZES.large,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
        color: COLORS.textTitle,
        marginRight: 8,
    },
    statsChange: {
        color: COLORS.success,
        backgroundColor: COLORS.successBg,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    negativeChange: {
        color: COLORS.error,
        backgroundColor: COLORS.errorBg,
        borderRadius: 5,
    },
    chart: {
        marginVertical: 8,
        borderRadius: 16,
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
        paddingHorizontal: 24,
        borderRadius: 25,
        borderWidth: 1,
        borderColor: COLORS.black,
    },
    upgradeButtonText: {
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
        color: COLORS.black,
        fontSize: SIZES.medium
    },
});

export default AnalyticsScreen;
