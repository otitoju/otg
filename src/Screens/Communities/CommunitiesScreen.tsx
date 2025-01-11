import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, RefreshControl, StatusBar, Dimensions, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CommunityHeader from '../../Components/CommunityHeader';
import CommunityCard from '../../Components/CommunityCard';
import EmptyCommunitiesState from '../../Components/EmptyCommunitiesState';
import CommunityListItem from '../../Components/CommunityListItem';
import CommunityModal from '../../Components/Modal/CommunityModal';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import LoadingDots from '../../Components/LoadingDots';
import { useNavigation } from '@react-navigation/native';
import io from 'socket.io-client';

const { width, height } = Dimensions.get('window');

interface Community {
    id: number;
    name: string;
    members: number;
    status: 'Public' | 'Private';
    image_url: string;
    description?: string;
    created_by?: string;
    is_member?: boolean;
}

const CommunityScreen: React.FC = () => {
    const navigation: any = useNavigation();
    const [isDetailsModalVisible, setIsDetailsModalVisible] = useState(false);
    const [selectedCommunity, setSelectedCommunity] = useState<Community | null>(null);
    const [integratedCommunities, setIntegratedCommunities] = useState<Community[]>([]);
    const [otherCommunities, setOtherCommunities] = useState<Community[]>([]);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [joining, setJoining] = useState(false);
    const [userId, setUserId] = useState<string | null>(null);
    const [socket, setSocket] = useState<any>(null);

    useEffect(() => {
        // Initialize socket connection
        const newSocket = io('http://192.168.0.114:5000');
        setSocket(newSocket);

        return () => {
            if (newSocket) {
                newSocket.disconnect();
            }
        };
    }, []);

    useEffect(() => {
        if (socket && userId) {
            // Listen for general room updates
            socket.on('room_created', (newRoom: any) => {
                fetchCommunities();
            });

            socket.on('room_updated', (updatedRoom: any) => {
                fetchCommunities();
            });

            // Listen for user-specific room updates
            socket.on(`user_${userId}_rooms_updated`, (data: any) => {
                fetchCommunities();
            });

            // Connect user to socket
            socket.emit('join_user', userId);
        }

        return () => {
            if (socket) {
                socket.off('room_created');
                socket.off('room_updated');
                socket.off(`user_${userId}_rooms_updated`);
            }
        };
    }, [socket, userId]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const loggedInUser: any = await AsyncStorage.getItem('user');
                const parsedUser = JSON.parse(loggedInUser);
                const extractedUserId = parsedUser.user.id;
                console.log('User ID:', extractedUserId);
                setUserId(extractedUserId);
            } catch (error) {
                console.error('Error retrieving user ID:', error);
                Alert.alert('Error', 'Failed to retrieve user information');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) {
            fetchCommunities();
        }
    }, [userId]);

    const fetchCommunities = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            // Fetch Integrated Communities
            const integratedResponse = await axios.get(
                `http://192.168.0.114:5000/api/v1/chat/user/${userId}/rooms`
            );
            let integratedMapped: Community[] = [];
            if (integratedResponse.data.success) {
                integratedMapped = integratedResponse.data.data.map((room: any) => ({
                    id: room.id,
                    name: room.name,
                    members: room.total_members,
                    status: room.status as 'Public' | 'Private',
                    image_url: room.image_url || require('../../assets/images/Communities/image1.png'),
                    description: room.description,
                    created_by: room.created_by,
                    is_member: true,
                }));

                // Log Integrated Communities
                console.log(`Integrated Communities (${integratedMapped.length}):`);
                integratedMapped.forEach((community, index) => {
                    console.log(`${index + 1}. ${community.name} - Image URL:`, community.image_url);
                });

                setIntegratedCommunities(integratedMapped);
            }

            // Fetch Other Communities
            const otherResponse = await axios.get(
                'http://192.168.0.114:5000/api/v1/chat/rooms'
            );
            if (otherResponse.data.success) {
                const otherMapped = otherResponse.data.data
                    .map((room: any) => ({
                        id: room.id,
                        name: room.name,
                        members: room.total_members,
                        status: room.status as 'Public' | 'Private',
                        image_url: room.image_url || require('../../assets/images/Communities/image1.png'),
                        description: room.description,
                        created_by: room.created_by,
                        is_member: integratedMapped.some((integrated) => integrated.id === room.id)
                    }))
                    .filter(
                        (room: Community) =>
                            !integratedMapped.some((integrated) => integrated.id === room.id)
                    );

                // Log Other Communities
                console.log(`Other Communities (${otherMapped.length}):`);
                otherMapped.forEach((community, index) => {
                    console.log(`${index + 1}. ${community.name} - Image URL:`, community.image_url);
                });

                setOtherCommunities(otherMapped);
            }
        } catch (error) {
            console.error('Error fetching communities:', error);
            Alert.alert('Error', 'Failed to fetch communities');
        } finally {
            setLoading(false);
        }
    };



    const joinCommunity = async (roomId: number) => {
        if (!userId) return;

        setJoining(true);
        try {
            const response = await axios.post(
                'http://192.168.0.114:5000/api/v1/chat/room/member/add',
                {
                    room_id: roomId,
                    user_id: userId
                }
            );

            if (response.data.success) {
                Alert.alert('Success', 'Successfully joined the community');
                await fetchCommunities();
                navigation.navigate('CHATSCREEN', { roomId });
            } else {
                Alert.alert('Error', response.data.message || 'Failed to join community');
            }
        } catch (error: any) {
            console.error('Error joining community:', error);
            Alert.alert(
                'Error',
                error.response?.data?.message || 'Failed to join community. Please try again.'
            );
        } finally {
            setJoining(false);
            setIsDetailsModalVisible(false);
        }
    };

    const handleCommunityAction = (community: Community) => {
        if (!userId) return;

        if (community.created_by === userId) {
            navigation.navigate('INVITEFREIENDS', { communityId: community.id });
        } else if (community.is_member) {
            navigation.navigate('CHATSCREEN', { roomId: community.id });
        } else {
            joinCommunity(community.id);
        }
    };

    const onRefresh = async () => {
        if (!userId) return;

        setRefreshing(true);
        await fetchCommunities();
        setRefreshing(false);
    };

    const openCommunityModal = (community: Community) => {
        setSelectedCommunity({
            ...community,
            image_url: typeof community.image_url === 'string'
                ? { uri: community.image_url }
                : community.image_url || require('../../assets/images/Communities/placeholder.png'),
        });
        setIsDetailsModalVisible(true);
    };

    const renderStatus = (status: 'Public' | 'Private') => (
        <View style={[
            styles.statusContainer,
            { backgroundColor: status === 'Private' ? COLORS.warning + '20' : COLORS.success + '20' },
        ]}>
            <Text style={[
                styles.statusText,
                { color: status === 'Private' ? COLORS.warning : COLORS.success },
            ]}>
                {status}
            </Text>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading Communities...</Text>
                <LoadingDots />
            </View>
        );
    }


    return (
        <View style={styles.container}>
            <CommunityHeader onAddPress={() => navigation.navigate('CREATECOMMUNITIES')} />

            {selectedCommunity && (
                <CommunityModal
                    visible={isDetailsModalVisible}
                    onClose={() => setIsDetailsModalVisible(false)}
                    type="details"
                    imageUrl={selectedCommunity.image_url}
                    title={selectedCommunity.name}
                    subtitle={
                        <View style={styles.modalSubtitleContainer}>
                            <Text style={styles.membersText}>
                                {selectedCommunity.members} Members
                            </Text>
                            <Text style={styles.bulletPoint}> • </Text>
                            {renderStatus(selectedCommunity.status)}
                        </View>
                    }
                    description={selectedCommunity.description || "No description available"}
                    buttonText={
                        selectedCommunity.created_by === userId
                            ? "Invite Friends"
                            : (selectedCommunity.is_member
                                ? "Open Community"
                                : (joining ? "Joining..." : "Join Community"))
                    }
                    onButtonPress={() => handleCommunityAction(selectedCommunity)}
                    disabled={joining}
                    createdBy={selectedCommunity.created_by || "Unknown"}
                    createdDate="Not Available"
                />
            )}

            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
                }
            >
                {/* Integrated Communities Section */}
                <Text style={styles.sectionTitle}>Integrated Communities</Text>
                {integratedCommunities.length > 0 ? (
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.cardContainer}>
                        {integratedCommunities.map((community) => (
                            <CommunityCard
                                key={community.id}
                                name={community.name}
                                members={community.members}
                                image={typeof community.image_url === 'string'
                                    ? { uri: community.image_url }
                                    : community.image_url}
                                onPress={() => openCommunityModal(community)}
                            />
                        ))}
                    </ScrollView>
                ) : (
                    <EmptyCommunitiesState type="integrated" />
                )}

                {/* Other Communities Section */}
                <Text style={styles.sectionTitle}>Other Communities</Text>
                {otherCommunities.length > 0 ? (
                    otherCommunities.map((community) => (
                        <CommunityListItem
                            key={community.id}
                            name={community.name}
                            members={community.members}
                            image={typeof community.image_url === 'string'
                                ? { uri: community.image_url }
                                : community.image_url}
                            status={community.status}
                            onPress={() => openCommunityModal(community)}
                        />
                    ))
                ) : (
                    <EmptyCommunitiesState type="other" />
                )}
            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center',
        width: width,
    },
    sectionTitle: {
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textHeader,
        marginLeft: SIZES.medium,
        marginTop: SIZES.medium,
        marginBottom: SIZES.small,
        fontSize: SIZES.large,
    },
    cardContainer: {
        paddingLeft: SIZES.medium,
        width: width,
    },
    statusContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 52,
    },
    statusText: {
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        fontSize: SIZES.font,
    },
    modalSubtitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: SIZES.small,
    },
    membersText: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
    },
    bulletPoint: {
        color: COLORS.textColor,
        marginHorizontal: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
        width: width,
    },
    loadingText: {
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        fontSize: SIZES.large,
        color: COLORS.textHeader,
        marginBottom: 20,
    }
});

export default CommunityScreen;