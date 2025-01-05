import React, { useState } from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

const CustomInput = ({ placeholder, secureTextEntry, keyBoardType, maxLength, multiline = false, onChangeText, value, icon, numberOfLines }: any) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <View style={[styles.container, { borderRadius: multiline ? 12 : 25 }]}>
            {icon && <Image
                source={icon}
                style={styles.toggleIcon}
            />}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor={COLORS.textPlaceholder}
                secureTextEntry={secureTextEntry && !isPasswordVisible}
                value={value}
                onChangeText={onChangeText}
                keyboardType={keyBoardType || 'default'}
                maxLength={maxLength}
                multiline={multiline}
                numberOfLines={numberOfLines}
                textAlignVertical={multiline ? 'top' : 'center'}
            />
            {secureTextEntry && (
                <TouchableOpacity
                    style={styles.toggleButton}
                    onPress={togglePasswordVisibility}
                >
                    {/* <Image
                        source={isPasswordVisible ? require('../assets/images/loginIcons/icon-show.png') : require('../assets/images/loginIcons/icon-show.png')}
                        style={styles.toggleIcon}
                    /> */}
                </TouchableOpacity>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',

        borderRadius: 25,

        // paddingVertical: 4,
        marginBottom: 16,
        backgroundColor: COLORS.backgroundGray,

        paddingHorizontal: 10,
    },
    input: {
        flex: 1,
        color: '#212121',
        fontSize: SIZES.small,
        //    backgroundColor: COLORS.faintGray,
        //     borderRadius: 8,
    },
    toggleButton: {
        padding: 8,
    },
    toggleIcon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
    },
});

export default CustomInput;
