import { Platform } from "react-native";

export const COLORS = {
    primary: "#0145FE",
    mainblue:'#E6ECFF',
    textTitle: "#0F172A", 
    textHeader: "#1E293B", 
    textColor: "#64748B",
    white: "#FFF",
    lightBg: "#F1F5F9",
    textLabel: "#0F0B1C",
    textPlaceholder: '#94A3B8',
    backgroundGray: '#E6EBF0',
    
    black: "#000000",
    bgGray: "#F4F6F8",
    faintGray: "#919EAB",
    successBg: "#E9FCD4",
    success: "#229A16",
    warningBg: "#FFF7CD",
    warning: "#B78103",
    errorBg: "#FFE7D9",
    error: "#B72136",
    defaultBg: "",
    defaultText: "",
    inActiveButton: "#E0E0E0",
    lightBorder:"#cccccc",

    lightSuccess: 'rgba(76, 175, 80, 0.2)', // Light green for public
    lightWarning: 'rgba(255, 193, 7, 0.2)', 
};
  
export const SIZES = {
    base: 8,
    small: 12,
    font: 14,
    medium: 16,
    large: 18,
    extraLarge: 24,
    buttonRadius: 55  
};

// Define the font names exactly as they appear in the font files
const FONT_NAMES = {
    bold: 'RadioCanadaBig-Bold',
    medium: 'RadioCanadaBig-Medium',
    regular: 'RadioCanadaBig-Regular',
    semiBold: 'RadioCanadaBig-SemiBold',
};

const FONTS = {
    ...Platform.select({
        ios: {
            RADIO_CANADA_REGULAR: 'RadioCanadaBig-Regular',
            RADIO_CANADA_MEDIUM: 'RadioCanadaBig-Medium',
            RADIO_CANADA_SEMIBOLD: 'RadioCanadaBig-SemiBold',
            RADIO_CANADA_BOLD: 'RadioCanadaBig-Bold',
        },
        android: {
            RADIO_CANADA_REGULAR: 'RadioCanadaBig-Regular',
            RADIO_CANADA_MEDIUM: 'RadioCanadaBig-Medium',
            RADIO_CANADA_SEMIBOLD: 'RadioCanadaBig-SemiBold',
            RADIO_CANADA_BOLD: 'RadioCanadaBig-Bold',
        }
    })
}

// Create the fonts configuration
// export const FONTS = {
//     regular: FONT_NAMES.regular,
//     medium: FONT_NAMES.medium,
//     semiBold: FONT_NAMES.semiBold,
//     bold: FONT_NAMES.bold,
    
//     // Font styles for different text types
//     h1: {
//         fontFamily: FONT_NAMES.bold,
//         fontSize: SIZES.extraLarge,
//     },
//     h2: {
//         fontFamily: FONT_NAMES.semiBold,
//         fontSize: SIZES.large,
//     },
//     h3: {
//         fontFamily: FONT_NAMES.medium,
//         fontSize: SIZES.medium,
//     },
//     body: {
//         fontFamily: FONT_NAMES.regular,
//         fontSize: SIZES.font,
//     },
//     label: {
//         fontFamily: FONT_NAMES.medium,
//         fontSize: SIZES.small,
//     }
// };

// // Font family helper function
// export const getFontFamily = (weight: 'regular' | 'medium' | 'semiBold' | 'bold') => {
//     return FONTS[weight] || FONTS.regular;
// };

export default FONTS;