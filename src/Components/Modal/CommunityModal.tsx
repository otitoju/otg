import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image, Dimensions } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';
import Check from '../../assets/images/Communities/check.svg';

const { width, height } = Dimensions.get('window');

interface CommunityModalProps {
    visible: boolean;
    onClose: () => void;
    type: 'details' | 'success';
    imageUrl?: any;  // Changed to accept local images using `require`
    title: string;
    subtitle?: React.ReactNode;
    description: string;
    buttonText: string;
    onButtonPress: () => void;
    createdBy?: string;
    createdDate?: string;
}

const CommunityModal: React.FC<CommunityModalProps> = ({
    visible,
    onClose,
    type,
    imageUrl,
    title,
    subtitle,
    description,
    buttonText,
    onButtonPress,
    createdBy,
    createdDate,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.backgroundView} />

                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Close color={COLORS.textColor} />
                    </TouchableOpacity>

                    {type === 'details' && imageUrl && (
                        <Image source={imageUrl} style={styles.communityImage} />
                    )}

                    {type === 'success' && (
                        <View style={styles.successIconContainer}>
                            <Check width={150} height={150} />
                        </View>
                    )}

                    <Text style={styles.title}>{title}</Text>

                    {subtitle && <View style={styles.subtitleContainer}>{subtitle}</View>}

                    <Text style={styles.description}>{description}</Text>

                    {type === 'details' && createdBy && createdDate && (
                        <Text style={styles.createdInfo}>
                            Created by {createdBy} • {createdDate}
                        </Text>
                    )}

                    <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                        <Text style={styles.buttonText}>{buttonText}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 9999
    },
    // backgroundView: {
    //     backgroundColor: COLORS.white,
    //     width: '90%',
    //     height: '35%',
    //     position: 'absolute',
    //     bottom: '10%',
    //     borderTopLeftRadius: 24,
    //     borderTopRightRadius: 24,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     elevation: 3,
    //     opacity: 0.8
    // },
    modalView: {
        backgroundColor: COLORS.white,
        padding: SIZES.extraLarge,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxHeight: '80%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
    },
    closeButton: {
        position: 'absolute',
        right: SIZES.medium,
        top: SIZES.medium,
        zIndex: 1,
        width: 30,
        height: 30
    },
    communityImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: SIZES.medium,
    },
    successIconContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    title: {
        color: COLORS.textTitle,
        marginBottom: SIZES.small,
        textAlign: 'center',
        fontSize: SIZES.extraLarge,
        fontWeight: '600',
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    subtitleContainer: {
        alignItems: 'center',
        marginBottom: SIZES.small,
    },
    description: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
        marginBottom: SIZES.large,
        textAlign: 'center',
    },
    createdInfo: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
        marginBottom: SIZES.medium,
    },
    button: {
        backgroundColor: COLORS.primary,
        borderRadius: 55,
        padding: SIZES.medium,
        width: '100%',
        alignItems: 'center',
        marginVertical: 19
    },
    buttonText: {
        fontSize: SIZES.font,
        color: COLORS.white,
        fontWeight: '600',
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
    },
});

export default CommunityModal;
