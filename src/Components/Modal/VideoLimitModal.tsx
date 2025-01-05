import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Dimensions, Image } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Close from '../../assets/images/Communities/Vector.svg';

const { width } = Dimensions.get('window');

const VideoLimitModal = ({
    visible,
    onClose,
    onReplaceVideo,
    onRemoveVideo,
    icon: Icon, // Optional icon component
    title = "Video limit",
    message = "Time limit for each video is 30 secs long",
    replaceText = "Replace video",
    removeText = "Remove video",
    imageUri, // New image URI prop
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

                    {/* Display Image if provided */}
                    {imageUri && (
                        <Image source={{ uri: imageUri }} style={styles.modalImage} />
                    )}

                    {/* Optional Icon */}
                    {Icon && (
                        <View style={styles.imageContainer}>
                            <Icon width={width * 0.8} height={120} />
                        </View>
                    )}

                    <Text style={styles.modalTitle}>
                        {title}
                    </Text>

                    <Text style={styles.modalSubtext}>
                        {message}
                    </Text>

                    <View style={styles.modalButtons}>
                        <TouchableOpacity
                            style={[styles.modalButton, styles.replaceButton]}
                            onPress={onReplaceVideo}
                        >
                            <Text style={styles.replaceText}>{replaceText}</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity
                            style={[styles.modalButton, styles.removeButton]}
                            onPress={onRemoveVideo}
                        >
                            <Text style={styles.removeText}>{removeText}</Text>
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
        justifyContent: 'center',
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
        width: '90%',
        maxHeight: '80%',
        borderRadius: 24,
        paddingTop: 20,
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
    modalImage: {
        width: 300,
        height: 150,
        borderRadius: 8,
        marginBottom: SIZES.medium,
    },
    imageContainer: {
        width: '100%',
        height: 120,
        marginVertical: SIZES.medium,
        borderRadius: 12,
        overflow: 'hidden',
    },
    modalTitle: {
        color: COLORS.textTitle,
        marginTop: SIZES.large,
        marginBottom: SIZES.small,
        textAlign: 'center',
        fontSize: SIZES.extraLarge,
        fontWeight: '600',
        width: '90%',
        fontFamily: FONTS.RADIO_CANADA_BOLD,
    },
    modalSubtext: {
        fontSize: SIZES.font,
        color: COLORS.textColor,
        marginBottom: SIZES.extraLarge,
        textAlign: 'center',
        width: '90%',
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    modalButtons: {
        width: '100%',
        gap: SIZES.base,
    },
    modalButton: {
        width: '100%',
        paddingVertical: 12,
        borderRadius: SIZES.buttonRadius,
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
    },
    replaceButton: {
        backgroundColor: COLORS.primary,
    },
    removeButton: {
        backgroundColor: COLORS.white,
    },
    replaceText: {
        color: COLORS.white,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
    removeText: {
        color: COLORS.textColor,
        fontSize: SIZES.font,
        fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    },
});

export default VideoLimitModal;
