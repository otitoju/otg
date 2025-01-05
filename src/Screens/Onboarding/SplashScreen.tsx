import React, { useEffect } from 'react';
import { View, StatusBar, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import routes from '../../Routes/routes';

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

const SplashScreen: React.FC<Props> = ({ navigation }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            navigation.replace(routes.ONBOARDING);
        }, 5000);

        return () => clearTimeout(timer);
    }, [navigation]);

    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
            <View style={styles.logoContainer}>
                <Image
                    source={require('../../assets/images/Onboarding/Logo.png')}
                    style={styles.logo}
                    resizeMode="contain"
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo: {
        width: 200,
        height: 200,
        marginBottom: 10,
        tintColor: COLORS.white,
    },
    textImage: {
        width: 120,
        height: 40,
        marginTop: 8,
    },
});

export default SplashScreen;