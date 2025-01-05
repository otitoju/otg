import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';

const { width } = Dimensions.get('window');

const RequestModal = ({
    visible,
    onAccept,
    onDecline,
    onClose,
    icon: Icon,
    title,
    message,
    acceptText,
    declineText,
    iconFillColor = COLORS.bgGray, // Default fill color
    buttonStatus = 'neutral' // Default button status if not passed
}) => {
    // Determine the button color based on the buttonStatus prop
    const getButtonColor = () => {
        switch (buttonStatus) {
            case 'good':
                return COLORS.success;
            case 'bad':
                return COLORS.error;
            case 'neutral':
            default:
                return COLORS.primary;
        }
    };

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

                    <View style={styles.iconContainer}>
                        <Icon width={106} height={106} fill={iconFillColor} />
                    </View>

                    <Text style={styles.modalTitle}>
                        {title}
                    </Text>

                    <Text style={styles.modalSubtext}>
                        {message}
                    </Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.declineButton]}
                            onPress={onDecline}
                        >
                            <Text style={styles.declineText}>{declineText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.modalButton,
                                { backgroundColor: getButtonColor() }, // Dynamically set color
                                styles.acceptButton
                            ]}
                            onPress={onAccept}
                        >
                            <Text style={styles.acceptText}>{acceptText}</Text>
                        </TouchableOpacity>
                    </View>
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
    },
    modalView: {
        backgroundColor: COLORS.white,
        padding: SIZES.extraLarge,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        maxHeight: '80%',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        paddingTop: 50,
    },
    closeButton: {
        position: 'absolute',
        right: SIZES.medium,
        top: SIZES.medium,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        backgroundColor: COLORS.white,
        borderRadius: 50,
        padding: SIZES.medium,
        marginBottom: SIZES.medium,
    },
    modalTitle: {
        color: COLORS.textTitle,
        marginBottom: SIZES.small,
        textAlign: 'center',
        fontSize: SIZES.extraLarge,
        fontWeight: '600',
        width: '70%',
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    modalSubtext: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        marginBottom: 70,
        textAlign: 'center',
        width: '70%',
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    modalButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 55,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    declineButton: {
        backgroundColor: COLORS.bgGray,
        marginRight: 8,
    },
    acceptButton: {
        marginLeft: 8,
    },
    declineText: {
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    acceptText: {
        color: COLORS.white,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
});

export default RequestModal;
