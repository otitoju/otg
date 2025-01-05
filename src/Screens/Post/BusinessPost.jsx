import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Image,
  StatusBar,
  Platform,
  Dimensions,
  Modal,
  KeyboardAvoidingView,
  ActivityIndicator,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import FONTS, {COLORS, SIZES} from '../../constants/theme';
import InfoIcon from '../../assets/images/Posts/Info.svg';
import CloseIcon from '../../assets/images/Posts/remove.svg';
import ImageModal from '../../Components/Modal/VideoLimitModal'; // Import the modal component
import {Dropdown} from 'react-native-element-dropdown';
import {CreateNewBusinessPost} from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import CustomButton from '../../Components/Button';
import LoadingDots from '../../Components/LoadingDots';

const {width} = Dimensions.get('window');

const CreateBusinessPost = () => {
  const toast = useToast();
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const [postText, setPostText] = useState('');
  const [fetching, setFetching] = useState(false);
  const [loading, setLoading] = useState(false);

  const onUploadPress = () => {
    const options = {
      mediaType: 'mixed',
      selectionLimit: 0,
      videoQuality: 'low',
    };

    launchImageLibrary(options, response => {
      if (!response.didCancel && !response.errorCode) {
        const selectedAssets = response.assets.map(asset => asset.uri);
        setImages(prevImages => [...prevImages, ...selectedAssets]);
      }
    });
  };

  const removeImage = index => {
    setImages(prevImages => prevImages.filter((_, i) => i !== index));
  };

  const openImageModal = uri => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const handlePost = async () => {
    const loggedInUser = await AsyncStorage.getItem('businessData');
    const businessId = JSON.parse(loggedInUser).id;
    // console.log(businessId);
    setLoading(true);

    try {
      // setFetching(true);
      // Create FormData
      const formData = new FormData();
      formData.append('businessId', businessId);
      formData.append('postText', postText);

      // Append images to FormData
      images.forEach((imageUri, index) => {
        const imageName = `image_${index}.jpg`;
        formData.append('media', {
          uri: imageUri,
          type: 'image/jpeg',
          name: imageName,
        });
      });
      //   console.log(formData);
      //   Call API
      const response = await CreateNewBusinessPost(formData);
      console.log(response);

      if (response) {
        setLoading(false);
        setImages([]);
        setPostText('');
        toast.show('Post created successfully', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
      } else {
        setLoading(false);
        toast.show('Failed to create postb', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.show('An error occurred. Please try again.', {
        type: 'danger',
        placement: 'top',
        duration: 3000,
      });
    }
  };

  if (fetching) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        {/* <ActivityIndicator size="large" color={COLORS.primary} /> */}
        <LoadingDots />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <>
        <Text style={styles.headerText}>Create a Post</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Upload Image</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.imageScroll}>
            <TouchableOpacity
              style={[
                styles.uploadButton,
                images.length === 0 && styles.fullWidthButton,
              ]}
              onPress={onUploadPress}>
              {images.length !== 0 ? (
                <Text style={styles.plusIcon}>+</Text>
              ) : (
                <>
                  <Text style={styles.plusIcon}>+</Text>
                  <Text
                    style={{
                      fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
                      color: COLORS.textColor,
                    }}>
                    Upload photos and videos
                  </Text>
                  <Text
                    style={{
                      fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
                      color: COLORS.textColor,
                    }}>
                    Video limit: 30 secs per video
                  </Text>
                </>
              )}
            </TouchableOpacity>

            {images.map((uri, index) => (
              <TouchableOpacity key={index} onPress={() => openImageModal(uri)}>
                <View>
                  <Image source={{uri}} style={styles.uploadedImage} />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => removeImage(index)}>
                    <CloseIcon width={16} height={16} fill={COLORS.white} />
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          <TouchableOpacity style={styles.guidelinesButton}>
            <InfoIcon width={16} height={16} fill={COLORS.primary} />
            <Text style={styles.helperText}>See image/video guidelines</Text>
          </TouchableOpacity>
        </View>

        {/* Modal for viewing image */}
        <ImageModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          imageUri={selectedImage}
        />
        <View style={styles.section}>
          <Text
            style={{
              fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
              color: COLORS.black,
              fontSize: SIZES.medium,
            }}>
            Share some details about your post{' '}
            <Text
              style={{
                fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
                color: 'gray',
                fontSize: SIZES.medium,
              }}>
              (Optional)
            </Text>
          </Text>
          <TextInput
            style={[styles.input, styles.postTextInput]}
            multiline
            placeholder="What's on your mine?"
            onChangeText={setPostText}
            value={postText}
            placeholderTextColor={COLORS.textColor}
          />
        </View>

        <CustomButton
          title="Create Post"
          disabled={!postText || images.length === 0 || loading}
          loading={loading}
          onPress={() => {
            handlePost();
          }}
          style={{backgroundColor: COLORS.primary, marginTop: 10}}
        />

        <View style={styles.bottomButtons}>
          {/* <TouchableOpacity style={styles.draftButton}>
                            <Text style={styles.draftButtonText}>Save draft</Text>
                        </TouchableOpacity> */}
          {/* <TouchableOpacity disabled={loading} onPress={handlePost} style={styles.postButton}>
                        <Text style={styles.postButtonText}>Post</Text>
                    </TouchableOpacity> */}
        </View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    padding: SIZES.medium,
    marginTop: Platform.OS === 'ios' ? 30 : StatusBar.currentHeight,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  headerText: {
    fontSize: SIZES.extraLarge,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
    marginBottom: SIZES.large,
    color: COLORS.textTitle,
  },
  section: {
    marginBottom: SIZES.extraLarge,
  },
  sectionTitle: {
    fontSize: SIZES.font,
    fontFamily: FONTS.RADIO_CANADA_MEDIUM,
    color: COLORS.textTitle,
    marginBottom: SIZES.small,
  },
  optionalText: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    marginBottom: SIZES.small,
  },
  ratingContainer: {
    flexDirection: 'row',
    gap: SIZES.base,
  },
  input: {
    backgroundColor: COLORS.bgGray,
    borderRadius: 8,
    padding: SIZES.medium,
    marginBottom: SIZES.small,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
    color: COLORS.textColor,
  },
  postTextInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  imageScroll: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadButton: {
    width: 100,
    height: 150,
    backgroundColor: COLORS.bgGray,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: COLORS.textColor,
    marginRight: SIZES.small,
  },
  fullWidthButton: {
    width: width - 40, // Full width minus padding for margins
    height: 150, // Increased height when no images
  },
  plusIcon: {
    fontSize: 48, // Larger plus icon
    color: COLORS.textColor,
  },
  uploadedImage: {
    width: 100,
    height: 150,
    borderRadius: 8,
    marginRight: SIZES.small,
  },
  removeImageButton: {
    position: 'absolute',
    top: 5,
    right: 5,
  },
  amenityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: SIZES.small,
  },
  amenityLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amenityLabel: {
    marginLeft: SIZES.small,
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: SIZES.large,
    marginBottom: SIZES.buttonRadius,
  },
  draftButton: {
    flex: 1,
    backgroundColor: COLORS.bgGray,
    borderRadius: SIZES.buttonRadius,
    padding: SIZES.medium,
    alignItems: 'center',
    marginRight: SIZES.small,
  },
  draftButtonText: {
    fontSize: SIZES.font,
    color: COLORS.textColor,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  postButton: {
    flex: 1,
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.buttonRadius,
    padding: SIZES.medium,
    alignItems: 'center',
  },
  postButtonText: {
    fontSize: SIZES.font,
    color: COLORS.white,
    fontFamily: FONTS.RADIO_CANADA_BOLD,
  },
  guidelinesButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: SIZES.small,
  },
  helperText: {
    marginLeft: SIZES.small,
    color: COLORS.error,
    fontFamily: FONTS.RADIO_CANADA_REGULAR,
  },

  dropdown: {
    height: 50,

    borderRadius: 8,
    paddingHorizontal: 8,
    backgroundColor: COLORS.bgGray,
    color: COLORS.textColor,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: 'gray',
  },
  placeholderStyle: {
    fontSize: 12,
    color: COLORS.textColor,
  },
  selectedTextStyle: {
    fontSize: 12,
    color: COLORS.textColor,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 12,
    color: COLORS.textColor,
  },
  listItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  selectedItem: {
    backgroundColor: COLORS.bgGray,
  },
  listItemText: {
    color: '#333',
    fontSize: 12,
  },
});

export default CreateBusinessPost;
