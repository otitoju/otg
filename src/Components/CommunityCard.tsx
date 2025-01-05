import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity , Dimensions} from 'react-native';
import PeopleIcon from '../assets/images/Communities/people.svg';
import FONTS, { COLORS, SIZES } from '../constants/theme';

interface CommunityCardProps {
    name: string;
    members: number;
    image: any; // Accepting image as a require statement
    onPress: () => void; // Function to handle card press
}

const { width, height } = Dimensions.get('window');

const CommunityCard: React.FC<CommunityCardProps> = ({ name, members, image, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <View style={styles.imageContainer}>
            <Image source={image} style={styles.cardImage} />
            <View style={styles.textOverlay}>
                <Text style={styles.cardTitle}>{name}</Text>
                <View style={styles.membersContainer}>
                    <PeopleIcon width={16} height={14} fill={COLORS.white} />
                    <Text style={styles.cardMembers}>{members} Members</Text>
                </View>
            </View>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        width: width*.4,
        marginRight: SIZES.medium,
        borderRadius: SIZES.base,
        overflow: 'hidden',
        backgroundColor: COLORS.white, // Added background color for better visibility
        shadowColor: COLORS.black, // Optional: add shadow for better depth
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3, // For Android shadow effect
    },
    imageContainer: {
        position: 'relative', // Required for absolute positioning of text
    },
    cardImage: {
        width: '100%',
        height: height*0.13,
        borderRadius: SIZES.base,
    },
    textOverlay: {
        position: 'absolute', // Position the overlay on top of the image
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background for readability
        borderTopLeftRadius: SIZES.base, // Optional: rounded corners for the overlay
        borderTopRightRadius: SIZES.base, // Optional: rounded corners for the overlay
    },
    cardTitle: {
        color: COLORS.white, // Change color as needed for visibility
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    membersContainer: {
        flexDirection: 'row', // Aligns icon and text horizontally
        alignItems: 'center', // Centers items vertically
    },
    cardMembers: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.white,
        marginLeft: 5, // Space between icon and text
    },
});

export default CommunityCard;
