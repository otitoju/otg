import React, { useState, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Dimensions,
    Image,
    TouchableOpacity,
    SafeAreaView,
    ImageBackground,
} from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import routes from '../../Routes/routes';

const { width, height } = Dimensions.get('window');

type Props = {
    navigation: NativeStackNavigationProp<any>;
};

const slides = [
    {
        id: '1',
        title: 'Get free wifi On the Go!',
        description: 'Join and gain access to our extensive network of free wifi locations, across your city.',
        image: require('../../assets/images/Onboarding/bg-1.png'),
        messages: [
            { text: 'Next cafe has great reviews', style: { top: '20%', left: '60%' } },
            { text: '23 free wifi locations found nearby', style: { top: '30%', left: '48%' } },
        ],
    },
    {
        id: '2',
        title: 'A community for everyone',
        description: 'Connect with interesting people. No matter who you are or what you do, there\'s a community just for you.',
        image: require('../../assets/images/Onboarding/bg-2.png'),
        messages: [
            { text: 'Chat!', style: { top: '15%', left: '-2%' } },
            { text: 'Create activities and meetups', style: { top: '25%', left: '52%' } },
            { text: 'Make new friends!', style: { top: '35%', left: '2%' } },
        ],
    },
    {
        id: '3',
        title: 'Health services at your fingertips',
        description: 'Find the nearest & best equipped healthcare center in case of an emergency.',
        image: require('../../assets/images/Onboarding/bg-3.png'),
        messages: [
            { text: 'Get the help you need on time', style: { top: '40%', left: '25%' } },
        ],
    },
];

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
    const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
    const flatListRef = useRef<FlatList>(null);

    const handleSignUp = () => {
        navigation.navigate(routes.CREATEACCOUNTSCREEN);
    };

    const handleSignIn = () => {
        navigation.navigate(routes.LOGIN);
    };

    const renderSlide = ({ item }: { item: typeof slides[0] }) => {
        return (
            <View style={styles.slideContainer}>
                <ImageBackground source={item.image} style={styles.backgroundImage}>
                    <LinearGradient
                        colors={['transparent', 'rgba(255,255,255,0.8)', COLORS.white]}
                        style={styles.gradient}
                    >
                        <View style={styles.messagesContainer}>
                            {item.messages.map((message, index) => (
                                <View key={index} style={[styles.messageContainer, message.style]}>
                                    <Text style={styles.messageText}>{message.text}</Text>
                                </View>
                            ))}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.description}>{item.description}</Text>
                        </View>
                    </LinearGradient>
                </ImageBackground>
            </View>
        );
    };

    const renderDots = () => (
        <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
                <View
                    key={index}
                    style={[
                        styles.dot,
                        {
                            width: currentSlideIndex === index ? 20 : 8,
                            backgroundColor: currentSlideIndex === index ? COLORS.primary : COLORS.inActiveButton,
                        },
                    ]}
                />
            ))}
        </View>
    );

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems[0]) {
            setCurrentSlideIndex(viewableItems[0].index);
        }
    }).current;

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                ref={flatListRef}
                data={slides}
                renderItem={renderSlide}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={{ viewAreaCoveragePercentThreshold: 50 }}
                keyExtractor={(item) => item.id}
            />
            {renderDots()}
            <View style={styles.bottomContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignUp}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
                <View style={styles.signInContainer}>
                    <Text style={styles.signInText}>I have an Account, </Text>
                    <TouchableOpacity onPress={handleSignIn}>
                        <Text style={styles.signInLink}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    slideContainer: {
        width,
        height,
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    gradient: {
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: 180,
    },
    messagesContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
    messageContainer: {
        position: 'absolute',
        backgroundColor: COLORS.white,
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    messageText: {
        fontSize: SIZES.font,
        color: COLORS.black,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    textContainer: {
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        color: COLORS.textTitle,
        textAlign: 'center',
        marginBottom: 10,
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    description: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        textAlign: 'center',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        lineHeight: 20,
    },
    dotsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        position: 'absolute',
        bottom: 140,
        width: '100%',
    },
    dot: {
        height: 5,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    bottomContainer: {
        padding: 20,
        position: 'absolute',
        bottom: 0,
        width: '100%',
        backgroundColor: COLORS.white,
    },
    button: {
        backgroundColor: COLORS.primary,
        height: 56,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: COLORS.white,
        fontSize: SIZES.medium,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
    signInContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signInText: {
        color: COLORS.textColor,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    signInLink: {
        color: COLORS.primary,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default OnboardingScreen;
