import { View, Text, StyleSheet, Image, Platform, StatusBar, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import FONTS, { COLORS, SIZES } from '../../constants/theme';
import Placeholder from '../../assets/images/Others/placeholder.svg';
import { launchImageLibrary } from 'react-native-image-picker';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/Button';
import { useNavigation } from '@react-navigation/native';
import routes from '../../Routes/routes';

const CreateProfile = () => {
  const navigation: any = useNavigation();
  const [selectedImage, setSelectedImage] = useState(null);

  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        quality: 1,
      },
      response => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.errorCode) {
          console.log('ImagePicker Error: ', response.errorMessage);
        } else if (response.assets && response.assets.length > 0) {
          const selectedAsset: any = response.assets[0];
          setSelectedImage(selectedAsset.uri);

        }
      }
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>Create a profile</Text>
        <Text style={styles.stepStyle}>Step 1 of 2</Text>
      </View>

      <Text style={[styles.stepStyle, { marginTop: 5 }]}>Fill the details below to create a profile</Text>

      <ScrollView  style={{ flex: 0.65 }} showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.imageWrapper}>
            <TouchableOpacity style={styles.imageContainer} onPress={selectImage}>
              {selectedImage ? (
                <Image source={{ uri: selectedImage }} style={styles.image} />
              ) : (
                <>
                  <View style={styles.placeholder}>
                    <Placeholder width={30} height={30} />
                    <Text style={styles.placeholderText}>Add a photo</Text>
                  </View>
                </>
              )}
            </TouchableOpacity>

            {selectedImage && <TouchableOpacity onPress={selectImage}>
              <Text style={[styles.placeholderText, { marginTop: 10, fontSize: SIZES.font }]}>Change photo</Text>
            </TouchableOpacity>}
          </View>

          <View style={{ marginTop: 30 }}>
            <Text style={styles.label}>Create username</Text>
            <CustomInput placeholder="@janedoe" />

            <Text style={styles.label}>Add a Bio</Text>
            <CustomInput placeholder="Enter a short bio of yourself" multiline={true} numberOfLines={6} />
          </View>
        </View>
      </ScrollView>


      <View style={{ flex: 0.25 }}>
        <CustomButton title="Continue" onPress={() => { navigation.navigate(routes.INTERESTPROFILE) }} />

        <CustomButton title="Skip" onPress={() => { navigation.navigate(routes.HOMESCREEN) }} textStyle={{ color: COLORS.black }} style={{ color: COLORS.primary, marginTop: 10, backgroundColor: COLORS.backgroundGray, }} />
      </View>


    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightBg,
    paddingTop: Platform.OS === 'ios' ? 40 : StatusBar.currentHeight,
    padding: 15,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20
  },
  headerText: {
    fontSize: SIZES.extraLarge,
    color: COLORS.textTitle,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
  },
  stepStyle: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_REGULAR
  },
  imageContainer: {
    width: 140,
    height: 140,
    borderRadius: 75,
    backgroundColor: COLORS.backgroundGray,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  placeholder: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: COLORS.textColor,
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    marginTop: 5
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  imageWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40
  },
  label: {
    marginBottom: 8,
    color: COLORS.textLabel,
    fontSize: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_SEMIBOLD
  },

});

export default CreateProfile