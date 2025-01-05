import { View, Text, StyleSheet, Platform, StatusBar, TouchableOpacity, Image, ActivityIndicator } from 'react-native'
import React, { useEffect } from 'react'
import FONTS, { COLORS, SIZES } from '../../constants/theme'
import ArrowBack from '../../assets/images/Others/arrow-right.svg';
import { useNavigation } from '@react-navigation/native';
import { NotificationList } from '../../constants/data';
import { ScrollView } from 'react-native-gesture-handler';
import { AddFollower, GetNotifications } from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from 'react-native-toast-notifications';
import BottomSheetModal from '../../Components/BottomSheet';
import LoadingDots from '../../Components/LoadingDots';
import { calculateTimeAgo } from '../../constants/utils';

const Notifications = () => {
    const navigation: any = useNavigation();
    const toast = useToast();
    const [loading, setLoading] = React.useState(false);
    const [notifications, setNotifications] = React.useState([]);
      const [following, setFollowing] = React.useState(false);
    

    const GetAllNotifications = async () => {
        setLoading(true);
        try {
            const loggedInUser: any = await AsyncStorage.getItem('user');
            let userId = JSON.parse(loggedInUser).user.id;

            const response = await GetNotifications(userId);
          
            if (response.notifications) {
                setLoading(false);
                setNotifications(response.notifications);
            }
        } catch (error: any) {
 
            setLoading(false);
            if (error.response.data.message) {
                toast.show(error.response.data.message, {
                    type: 'danger',
                    placement: 'top',
                    duration: 3000,
                });
            }
            else {
                toast.show("Something went wrong", {
                    type: 'danger',
                    placement: 'top',
                    duration: 3000,
                });
            }
        }
    }

    useEffect(() => {
        GetAllNotifications();
    }, []);

    const handleAddFollower = async (userId: any, followerId: any) => {
        setFollowing(true);
        try {
          const response = await AddFollower(userId, followerId);
    
          if (response) {
            setFollowing(false);
            GetAllNotifications();
          }
        } catch (error) {
          setFollowing(false);
          console.log(error);
        }
      };

    

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                <LoadingDots />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: 'absolute', left: 15 }}>
                    <ArrowBack width={25} height={25} />
                </TouchableOpacity>

                <Text style={{ textAlign: 'center', fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>Notification</Text>
            </View>
            <View style={styles.horizontalLine} />

            {notifications.length > 0 ? (
                <ScrollView style={{ marginTop: 20 }} showsVerticalScrollIndicator={false}>
                    {
                        notifications?.map((person :any, index) => (
                            <View key={index} style={styles.notificationContainer}>
                                <View style={styles.profileContainer}>
                                    <Image
                                        source={{ uri: 'https://images.unsplash.com/photo-1599110364868-364162848518?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fHVzZXJzfGVufDB8fDB8fHww' }}
                                        style={styles.profileImage}
                                    />
                                    <View style={styles.textContainer}>
                                        <Text style={styles.nameText}>{person.message}</Text>
                                        <Text style={styles.timeText}>{calculateTimeAgo(person.createdAt)}</Text>
                                    </View>
                                </View>


                                {person.notificationType ==='followed' && (
                                    <TouchableOpacity onPress={() => handleAddFollower(person.followerId, person.userId)} style={styles.followButton}>
                                        <Text style={styles.followButtonText}>Follow Back</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        ))
                    }
                </ScrollView>
            ) : (
                < View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                    <Text style={{ fontSize: SIZES.large, fontFamily: FONTS.RADIO_CANADA_SEMIBOLD, color: COLORS.textTitle }}>No Notifications</Text>
                </View>
            )

            }

        </View >
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
        marginBottom: 20,
        marginHorizontal: 15,

    },
    profileContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
    }
})

export default Notifications