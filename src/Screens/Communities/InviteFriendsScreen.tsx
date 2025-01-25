import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, StatusBar, Alert, Platform } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';
import Search from '../../assets/images/Communities/Search.svg';
import { useNavigation, useRoute } from '@react-navigation/native';
import LoadingDots from '../../Components/LoadingDots';

const { width, height } = Dimensions.get('window');

interface Friend {
    id: number;
    firstName: string | null;
    lastName: string | null;
    username: string;
    email: string;
    picture: string | null;
}

type NavigationProps = {
    roomId: number;
    inviterId: string;
};

const InviteFriendsScreen: React.FC = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { roomId, inviterId } = route.params as NavigationProps;

    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFriends, setSelectedFriends] = useState<number[]>([]);
    const [friends, setFriends] = useState<Friend[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sendingInvites, setSendingInvites] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch('http://192.168.0.129:5001/api/v1/users');
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            // Convert inviterId to number for consistent comparison
            const inviterIdAsNumber = Number(inviterId);
            // Filter out the current user from the friends list using number comparison
            const filteredUsers = data.info.filter((user: Friend) => user.id !== inviterIdAsNumber);
            setFriends(filteredUsers);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch users');
            setLoading(false);
            console.error('Error fetching users:', err);
        }
    };

    const sendInvitations = async () => {
        if (selectedFriends.length === 0) {
            Alert.alert('Error', 'Please select at least one friend to invite.');
            return;
        }
    
        setSendingInvites(true);
        try {
            const invitationData = {
                inviter_id: inviterId,
                room_id: roomId,
                invitees: selectedFriends
            };
    
            console.log('Sending invitation data:', invitationData);
    
            const response = await fetch('http://192.168.0.129:5001/api/v1/chat/invitation/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(invitationData)
            });
    
            const responseText = await response.text();
            let responseData;
    
            try {
                responseData = JSON.parse(responseText);
            } catch (parseError) {
                console.error('Non-JSON response:', responseText);
                throw new Error(`Server returned invalid JSON. Status: ${response.status}`);
            }
    
            if (!response.ok) {
                throw new Error(responseData.message || `Server error: ${response.status}`);
            }
    
            Alert.alert('Success', 'Invitations sent successfully', [
                { 
                    text: 'OK', 
                    onPress: () => {
                        navigation.navigate('CHATSCREEN', { roomId });
                    } 
                }
            ]);
        } catch (err) {
            console.error('Error sending invitations:', err);
            let errorMessage = 'Failed to send invitations. Please try again.';
            if (err instanceof Error) {
                errorMessage = err.message;
            }
            Alert.alert('Error', errorMessage);
        } finally {
            setSendingInvites(false);
        }
    };

    const filteredFriends = friends.filter(friend =>
        (friend.firstName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (friend.lastName?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFriendSelection = (userId: number) => {
        setSelectedFriends(prev =>
            prev.includes(userId)
                ? prev.filter(id => id !== userId)
                : [...prev, userId]
        );
    };

    const getDisplayName = (friend: Friend) => {
        if (friend.firstName && friend.lastName) {
            return `${friend.firstName} ${friend.lastName}`;
        }
        return friend.username;
    };

    const renderFriendItem = ({ item }: { item: Friend }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() => toggleFriendSelection(item.id)} // Changed to use item.id
        >
            {item.picture ? (
                <Image source={{ uri: item.picture }} style={styles.avatar} resizeMode="cover" />
            ) : (
                <View style={[styles.avatar, styles.placeholderAvatar]}>
                    <Text style={styles.avatarText}>
                        {getDisplayName(item).charAt(0).toUpperCase()}
                    </Text>
                </View>
            )}
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{getDisplayName(item)}</Text>
                <Text style={styles.friendUsername}>@{item.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    selectedFriends.includes(item.id) && styles.checkboxSelected // Changed to use item.id
                ]}
                onPress={() => toggleFriendSelection(item.id)} // Changed to use item.id
            />
        </TouchableOpacity>
    );

    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <LoadingDots />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchUsers}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerStyle}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Close width={25} height={14} fill={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Invite friends</Text>
                <View style={{ width: 30 }} />
            </View>

            <View style={styles.searchContainer}>
                <Search width={20} height={20} color={COLORS.textColor} style={styles.searchIcon} />
                <TextInput
                    style={styles.searchInput}
                    placeholder="Type a name"
                    value={searchQuery}
                    onChangeText={setSearchQuery}
                    placeholderTextColor={COLORS.textColor}
                />
            </View>

            <FlatList
                data={filteredFriends}
                renderItem={renderFriendItem}
                keyExtractor={item => item.id.toString()}
                style={styles.friendList}
            />

            <View style={styles.footer}>
                <TouchableOpacity
                    style={[styles.footerButton, styles.sendFooterButton]}
                    onPress={() => Alert.alert('Coming soon', 'This feature will be available soon!')}
                >
                    <Text style={styles.footerButtonText}>Copy link</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.footerButton,
                        styles.sendInviteButton,
                        (sendingInvites || selectedFriends.length === 0) && styles.disabledButton
                    ]}
                    onPress={sendInvitations}
                    disabled={sendingInvites || selectedFriends.length === 0}
                >
                    <Text style={[styles.footerButtonText, styles.sendInviteText]}>
                        {sendingInvites ? 'Sending...' : `Send Invite (${selectedFriends.length})`}
                    </Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
    errorText: {
        color: COLORS.textTitle,
        fontSize: SIZES.large,
        marginBottom: SIZES.medium,
    },
    retryButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: SIZES.extraLarge,
        paddingVertical: SIZES.small,
        borderRadius: 8,
    },
    retryButtonText: {
        color: COLORS.white,
        fontSize: SIZES.font,
    },
    headerStyle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        borderBottomColor: COLORS.lightBorder,
        borderBottomWidth: 1,
        width: width,
        paddingVertical: 25,
        marginBottom: 30
    },
    headerText: {
        fontSize: SIZES.extraLarge,
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        flex: 1,
        textAlign: 'center',
        fontWeight: '600'
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.lightBg,
        borderRadius: 24,
        marginHorizontal: SIZES.medium,
        marginBottom: SIZES.medium,
        paddingHorizontal: SIZES.small,
    },
    searchIcon: {
        marginRight: SIZES.small,
    },
    searchInput: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        fontSize: SIZES.font,
        flex: 1,
        paddingVertical: SIZES.small,
    },
    friendList: {
        flex: 1,
    },
    friendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: SIZES.small,
    },
    placeholderAvatar: {
        backgroundColor: COLORS.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: COLORS.white,
        fontSize: SIZES.large,
        fontWeight: 'bold',
    },
    friendInfo: {
        flex: 1,
    },
    friendName: {
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
    },
    friendUsername: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: COLORS.textColor,
        justifyContent: 'center',
        alignItems: 'center',
    },
    checkboxSelected: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: SIZES.medium,
        paddingHorizontal: 15,
        borderTopColor: COLORS.lightBorder,
        borderTopWidth: 1,
        width: width,
        paddingVertical: 25,
    },
    sendFooterButton: {
        backgroundColor: COLORS.lightBg,
    },
    footerButton: {
        flex: 1,
        paddingVertical: SIZES.font,
        borderRadius: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: SIZES.small / 2,
    },
    footerButtonText: {
        fontSize: SIZES.font,
        color: COLORS.textTitle,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    sendInviteButton: {
        backgroundColor: COLORS.primary,
    },
    sendInviteText: {
        color: COLORS.white,
    },
    disabledButton: {
        opacity: 0.5,
    },
});

export default InviteFriendsScreen;