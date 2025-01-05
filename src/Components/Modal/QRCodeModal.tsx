import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';
import QRCode from 'react-native-qrcode-svg';

const { width } = Dimensions.get('window');

interface QRCodeModalProps {
    visible: boolean;
    onClose: () => void;
    wifiName: string;
    wifiPassword: string;
    onButtonPress: () => void;
}

const QRCodeModal: React.FC<QRCodeModalProps> = ({
    visible,
    onClose,
    wifiName,
    wifiPassword,
    onButtonPress,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Close color={COLORS.textColor} />
                    </TouchableOpacity>

                    <View style={styles.contentContainer}>
                        {/* QR Code Container */}
                        <View style={styles.qrContainer}>
                            <QRCode
                                value={`WIFI:S:${wifiName};T:WPA;P:${wifiPassword};;`}
                                size={200}
                            />
                        </View>

                        {/* Loading Text Section */}
                        <View style={styles.loadingTextContainer}>
                            <Text style={styles.title}>Loading...</Text>
                            <Text style={styles.description}>
                                Attaching WiFi setup to QR Code
                            </Text>
                        </View>

                        {/* Button */}
                        <TouchableOpacity style={styles.button} onPress={onButtonPress}>
                            <Text style={styles.buttonText}>Cancel</Text>
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
        zIndex: 9999
    },
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
    contentContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: SIZES.extraLarge,
    },
    qrContainer: {
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
        borderRadius: 12,
        marginVertical: SIZES.medium,
        alignItems: 'center',
        justifyContent: 'center',
    },
    loadingTextContainer: {
        alignItems: 'center',
        marginVertical: SIZES.medium,
    },
    title: {
        color: COLORS.textTitle,
        marginBottom: SIZES.small,
        textAlign: 'center',
        fontSize: SIZES.extraLarge,
        fontWeight: '600',
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    description: {
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
        color: COLORS.textColor,
        textAlign: 'center',
        fontSize: SIZES.medium,
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

export default QRCodeModal;