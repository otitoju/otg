import { View, Text, Platform, StatusBar, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import WifiScanner from '../../Components/WifiScanner'
import FONTS, { COLORS, SIZES } from '../../constants/theme'
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
export default function WifiScreen() {
    const navigation: any = useNavigation();
    return (
        <View style={{
            flex: 1, padding: SIZES.medium,
            marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight, backgroundColor: COLORS.white,
        }}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 15 }}>
                    <ArrowBack width={25} height={25} />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>Wi-Fi Scanner</Text>
            </View>
            <WifiScanner />
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
   
})