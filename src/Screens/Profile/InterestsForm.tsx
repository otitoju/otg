import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import FONTS, { COLORS, SIZES } from '../../constants/theme';

// Import icons as SVGs
import Mic from '../../assets/images/Profile/Users.svg';
import Running from '../../assets/images/Profile/Users.svg';
import Cook from '../../assets/images/Profile/Burger.svg';
import UtensilsCrossed from '../../assets/images/Profile/Vector.svg';
import Coffee from '../../assets/images/Home/Coffee.svg';
import Building2 from '../../assets/images/Profile/badge.svg';
import Palmtree from '../../assets/images/Profile/personal details icon.svg';
import Building from '../../assets/images/Profile/map.svg';
import Beer from '../../assets/images/Profile/Users.svg';
import Edit from '../../assets/images/Profile/edit icon.svg';

const InterestSection = ({ title, items, onEdit, toggleSelection, sectionName }: any) => {
    const renderIcon = (name) => {
        const iconProps = { 
            width: 16, 
            height: 16,
            fill: '#000'
        };

        switch (name) {
            case 'singing': return <Mic {...iconProps} />;
            case 'running': return <Running {...iconProps} />;
            case 'cooking': return <Cook {...iconProps} />;
            case 'food-tasting': return <UtensilsCrossed {...iconProps} />;
            case 'cafe': return <Coffee {...iconProps} />;
            case 'co-workspace': return <Building2 {...iconProps} />;
            case 'beach-house': return <Palmtree {...iconProps} />;
            case 'hotel': return <Building {...iconProps} />;
            case 'bar': return <Beer {...iconProps} />;
            default: return null;
        }
    };

    const InterestTag = ({ label, iconName, isSelected, index }) => (
        <TouchableOpacity 
            style={[ 
                styles.tag, 
                isSelected && styles.selectedTag 
            ]}
            onPress={() => toggleSelection(index, sectionName)}
        >
            <View style={styles.tagContent}>
                {renderIcon(iconName)}
                <Text style={[ 
                    styles.tagText, 
                    isSelected && styles.selectedTagText 
                ]}>
                    {label}
                </Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity style={{flexDirection:'row', gap:5}} onPress={onEdit}>
                    <Edit width={10} height={10}/>
                    <Text style={styles.editButton}>Edit</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.tagsContainer}>
                {items.map((item, index) => (
                    <InterestTag
                        key={index}
                        label={item.label}
                        iconName={item.iconName}
                        isSelected={item.isSelected}
                        index={index}
                    />
                ))}
            </View>
        </View>
    );
};

const InterestsScreen = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    
    const [hobbies, setHobbies] = useState([
        { label: 'Singing', iconName: 'singing', isSelected: true },
        { label: 'Running', iconName: 'running', isSelected: false },
        { label: 'Cooking', iconName: 'cooking', isSelected: true },
        { label: 'Food tasting', iconName: 'food-tasting', isSelected: false }
    ]);

    const [places, setPlaces] = useState([
        { label: 'Cafe', iconName: 'cafe', isSelected: false },
        { label: 'Co-workspace', iconName: 'co-workspace', isSelected: false },
        { label: 'Beach house', iconName: 'beach-house', isSelected: true },
        { label: 'Hotel', iconName: 'hotel', isSelected: false },
        { label: 'Bar', iconName: 'bar', isSelected: true }
    ]);

    const handleEditToggle = () => {
        setIsEditMode(!isEditMode);
    };

    const toggleSelection = (index, sectionName) => {
        let updatedItems = [];
        if (sectionName === 'hobbies') {
            updatedItems = [...hobbies];
            updatedItems[index].isSelected = !updatedItems[index].isSelected;
            setHobbies(updatedItems);
        } else if (sectionName === 'places') {
            updatedItems = [...places];
            updatedItems[index].isSelected = !updatedItems[index].isSelected;
            setPlaces(updatedItems);
        }
    };

    return (
        <View style={styles.container}>
            <InterestSection
                title="Hobbies"
                items={hobbies}
                onEdit={handleEditToggle}
                toggleSelection={toggleSelection} 
                sectionName="hobbies"
            />
            {isEditMode && (
                <InterestSection
                    title="Select More Hobbies"
                    items={[
                        { label: 'Reading', iconName: 'singing', isSelected: false },
                        { label: 'Traveling', iconName: 'running', isSelected: false }
                    ]}
                    onEdit={handleEditToggle}
                    toggleSelection={toggleSelection}
                    sectionName="hobbies"
                />
            )}

            <InterestSection
                title="Places to visit"
                items={places}
                onEdit={handleEditToggle}
                toggleSelection={toggleSelection} 
                sectionName="places"
            />
            {isEditMode && (
                <InterestSection
                    title="Select More Places"
                    items={[
                        { label: 'Mountain', iconName: 'cafe', isSelected: false },
                        { label: 'Park', iconName: 'bar', isSelected: false }
                    ]}
                    onEdit={handleEditToggle}
                    toggleSelection={toggleSelection}
                    sectionName="places"
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        padding: SIZES.medium,
    },
    section: {
        marginBottom: SIZES.extraLarge,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: SIZES.medium,
    },
    sectionTitle: {
        fontSize: SIZES.large,
        fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
        color: COLORS.textTitle,
    },
    editButton: {
        fontSize: SIZES.font,
        color: COLORS.primary,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    tagsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: -SIZES.small / 2,
    },
    tag: {
        backgroundColor: COLORS.bgGray,
        borderRadius: 20,
        paddingHorizontal: SIZES.medium,
        paddingVertical: SIZES.small,
        margin: SIZES.small / 2,
    },
    selectedTag: {
        backgroundColor: COLORS.primary,
    },
    tagContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tagText: {
        marginLeft: 6,
        fontSize: SIZES.font,
        color: COLORS.textColor,
        fontFamily: FONTS.RADIO_CANADA_REGULAR,
    },
    selectedTagText: {
        color: COLORS.white,
    },
});

export default InterestsScreen;
