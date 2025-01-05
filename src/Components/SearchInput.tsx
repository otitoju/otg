import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import SearchIcon from '../assets/images/Home/SearchIcon.svg'
import { COLORS, SIZES } from '../constants/theme';

const SearchInput = ({ placeholder, value, onChangeText }: any) => {
    return (
        <View style={styles.container}>
            {/* Search Icon */}
            <SearchIcon width={20} height={20} style={styles.icon} />

            {/* Input Field */}
            <TextInput
                style={styles.input}
                placeholder={placeholder}
                placeholderTextColor="#999"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 25,
        paddingHorizontal: 10,
        height: 40,
        backgroundColor: COLORS.backgroundGray,
    },
    icon: {
        marginRight: 8,
    },
    input: {
        flex: 1,
        color: '#212121',
        fontSize: SIZES.small,
    },
});

export default SearchInput;
