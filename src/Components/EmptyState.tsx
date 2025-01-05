import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import Nochat from '../assets/images/Chat/speech_bubble_chat_talk_communication_icon_3d_background_illustration.svg';
import FONTS, { COLORS, SIZES } from '../constants/theme';

const { width, height } = Dimensions.get('window');

const EmptyState = ({ upgrade }) => (
    <View style={styles.emptyState}>
        <View style={styles.iconContainer}>
            <Nochat width={106} height={106} fill={COLORS.white} />
        </View>
        <Text style={styles.emptyText}>No chats</Text>
        <Text style={styles.emptySubtext}>
            Send messages to your favorite spots directly today.
        </Text>
        <View style={{ flex: 0.25 }}>
            <TouchableOpacity style={styles.sendButton}>
                <Text style={styles.sendButtonText}>Send message</Text>
            </TouchableOpacity>
            {upgrade && (
                <TouchableOpacity style={styles.upgradeButton}>
                    <Text style={styles.upgradeButtonText}>Upgrade</Text>
                </TouchableOpacity>
            )}
        </View>
    </View>
);

const styles = StyleSheet.create({
    emptyState: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        height: height * 0.85
    },
    iconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16
    },
    emptyText: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 8,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.black
    },
    emptySubtext: {
        textAlign: 'center',
        color: COLORS.textColor,
        marginBottom: 24,
        width: '60%',
        fontFamily: FONTS.bold,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    sendButton: {
        backgroundColor: COLORS.primary,
        paddingVertical: 12,
        width: width * 0.9,
        borderRadius: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12
    },
    sendButtonText: {
        color: '#FFFFFF',
        fontWeight: '500',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    upgradeButton: {
        backgroundColor: COLORS.backgroundGray,
        paddingVertical: 12,
        width: width * 0.9,
        borderRadius: 55,
        height: 55,
        justifyContent: 'center',
        alignItems: 'center',
    },
    upgradeButtonText: {
        color: COLORS.black,
        fontWeight: '500',
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
});

export default EmptyState;
