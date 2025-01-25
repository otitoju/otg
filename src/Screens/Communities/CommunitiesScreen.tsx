import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Text, Alert, RefreshControl, StatusBar, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CommunityHeader from '../../Components/CommunityHeader';
import CommunityCard from '../../Components/CommunityCard';
import EmptyCommunitiesState from '../../Components/EmptyCommunitiesState';
import CommunityListItem from '../../Components/CommunityListItem';
import CommunityModal from '../../Components/Modal/CommunityModal';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import LoadingDots from '../../Components/LoadingDots';
import { useNavigation, useFocusEffect } from '@react-navigation/native';  // Added useFocusEffect
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
    const navigation = useNavigation();
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
        const newSocket = io('http://192.168.0.129:5001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (!userId || !socket) return;

        const handleRoomEvent = async () => {
            await fetchCommunities(); // Re-fetch communities on room event
        };

        socket.on('room_created', handleRoomEvent);
        socket.on('room_updated', handleRoomEvent);
        socket.on(`user_${userId}_rooms_updated`, handleRoomEvent);
        socket.on('group_left', async (data: { user_id: string }) => {
            if (data.user_id === userId) {
                await fetchCommunities(); // Re-fetch if the user left a group
            }
        });

        socket.emit('join_user', userId); // Connect user to socket

        return () => {
            socket.off('room_created', handleRoomEvent);
            socket.off('room_updated', handleRoomEvent);
            socket.off(`user_${userId}_rooms_updated`, handleRoomEvent);
            socket.off('group_left');
        };
    }, [socket, userId]);

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const loggedInUser = await AsyncStorage.getItem('user');
                const parsedUser = JSON.parse(loggedInUser);
                setUserId(parsedUser.user.id);
            } catch (error) {
                console.error('Error retrieving user ID:', error);
                Alert.alert('Error', 'Failed to retrieve user information');
            }
        };

        fetchUserId();
    }, []);

    useEffect(() => {
        if (userId) fetchCommunities();
    }, [userId]);

    // Added useFocusEffect to fetch communities when the screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            if (userId) fetchCommunities();
        }, [userId])
    );

    const fetchCommunities = async () => {
        if (!userId) return;

        setLoading(true);
        try {
            // Fetch Integrated Communities
            const integratedResponse = await axios.get(
                `http://192.168.0.129:5001/api/v1/chat/user/${userId}/rooms`
            );
            const integratedMapped = integratedResponse.data.success ? integratedResponse.data.data.map((room: any) => ({
                id: room.id,
                name: room.name,
                members: room.total_members,
                status: room.status as 'Public' | 'Private',
                image_url: room.image_url || require('../../assets/images/Communities/image1.png'),
                description: room.description,
                created_by: room.created_by,
                is_member: true,
            })) : [];

            setIntegratedCommunities(integratedMapped);

            // Fetch Other Communities
            const otherResponse = await axios.get('http://192.168.0.129:5001/api/v1/chat/rooms');
            const otherMapped = otherResponse.data.success ? otherResponse.data.data
                .map((room: any) => ({
                    id: room.id,
                    name: room.name,
                    members: room.total_members,
                    status: room.status as 'Public' | 'Private',
                    image_url: room.image_url || require('../../assets/images/Communities/image1.png'),
                    description: room.description,
                    created_by: room.created_by,
                    is_member: integratedMapped.some((integrated) => integrated.id === room.id),
                }))
                .filter((room: Community) => !integratedMapped.some((integrated) => integrated.id === room.id)) : [];

            setOtherCommunities(otherMapped);
        } catch (error) {
            console.error('Error fetching communities:', error);
            Alert.alert('Error', 'Failed to fetch communities');
        } finally {
            setLoading(false);
        }
    };

    const joinCommunity = async (roomId: number) => {
        if (!userId || !socket) return;

        setJoining(true);
        try {
            const response = await axios.post(
                'http://192.168.0.129:5001/api/v1/chat/room/member/add',
                { room_id: roomId, user_id: userId }
            );

            if (response.data.success) {
                socket.emit('room_joined', { room_id: roomId, user_id: userId });
                Alert.alert('Success', 'Successfully joined the community');
                await fetchCommunities();
                navigation.navigate('CHATSCREEN', { roomId });
            } else {
                Alert.alert('Error', response.data.message || 'Failed to join community');
            }
        } catch (error) {
            console.error('Error joining community:', error);
            Alert.alert('Error', 'Failed to join community. Please try again.');
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
                            <Text style={styles.membersText}>{selectedCommunity.members} Members</Text>
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

            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
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