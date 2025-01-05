import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';
import Search from '../../assets/images/Communities/Search.svg';
import { useNavigation } from '@react-navigation/native'; 

const { width, height } = Dimensions.get('window');

interface Friend {
    id: string;
    name: string;
    username: string;
    avatar: any; // Changed to any for better handling of local and remote images
}

const InviteFriendsScreen: React.FC = () => {
    const navigation = useNavigation(); // Get the navigation object
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedFriends, setSelectedFriends] = useState<string[]>([]);

    const friends: Friend[] = [
        { id: '1', name: 'Jane Doe', username: '@annydoe', avatar: require('../../assets/images/Communities/Ellipse.png') },
        { id: '2', name: 'Jane Doe', username: '@annydoe', avatar: require('../../assets/images/Communities/Ellipse1.png') },
        { id: '3', name: 'Jane Doe', username: '@annydoe', avatar: require('../../assets/images/Communities/Ellipse2.png') },
    ];

    const filteredFriends = friends.filter(friend =>
        friend.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleFriendSelection = (friendId: string) => {
        setSelectedFriends(prev =>
            prev.includes(friendId)
                ? prev.filter(id => id !== friendId)
                : [...prev, friendId]
        );
    };

    const renderFriendItem = ({ item }: { item: Friend }) => (
        <TouchableOpacity
            style={styles.friendItem}
            onPress={() => toggleFriendSelection(item.id)}
        >
            <Image source={item.avatar} style={styles.avatar} resizeMode="cover" />
            <View style={styles.friendInfo}>
                <Text style={styles.friendName}>{item.name}</Text>
                <Text style={styles.friendUsername}>{item.username}</Text>
            </View>
            <TouchableOpacity
                style={[
                    styles.checkbox,
                    selectedFriends.includes(item.id) && styles.checkboxSelected
                ]}
                onPress={() => toggleFriendSelection(item.id)}
            >
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            {/* Header Component */}
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
                />
            </View>

            <FlatList
                data={filteredFriends}
                renderItem={renderFriendItem}
                keyExtractor={item => item.id}
                style={styles.friendList}
            />

            <View style={styles.footer}>
                <TouchableOpacity style={[styles.footerButton, styles.sendFooterButton]}>
                    <Text style={styles.footerButtonText}>Copy link</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.footerButton, styles.sendInviteButton]}
                    onPress={() => navigation.navigate('CHAT')}
                >
                    <Text style={[styles.footerButtonText, styles.sendInviteText]}>
                        Send Invite
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
        width: 50, // Adjusted for better visibility
        height: 50,
        borderRadius: 25, // Ensures the avatar is circular
        marginRight: SIZES.small,
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
});

export default InviteFriendsScreen;
