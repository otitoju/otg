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
import StarIcon from '../../assets/images/Posts/star.svg';
import StarFilledIcon from '../../assets/images/Posts/star-filled.svg';
import WifiIcon from '../../assets/images/Posts/wifi.svg';
import CoffeeIcon from '../../assets/images/Posts/coffee.svg';
import AmbienceIcon from '../../assets/images/Posts/ambience.svg';
import CoworkingIcon from '../../assets/images/Posts/coworking.svg';
import InfoIcon from '../../assets/images/Posts/Info.svg';
import CloseIcon from '../../assets/images/Posts/remove.svg';
import ImageModal from '../../Components/Modal/VideoLimitModal'; // Import the modal component
import {Dropdown} from 'react-native-element-dropdown';
import {CreatePost, GetBusiness} from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useToast} from 'react-native-toast-notifications';
import CustomButton from '../../Components/Button';
import LoadingDots from '../../Components/LoadingDots';

const {width} = Dimensions.get('window');

const data = [
  {label: 'Item 1', value: '1'},
  {label: 'Item 2', value: '2'},
  {label: 'Item 3', value: '3'},
  {label: 'Item 4', value: '4'},
  {label: 'Item 5', value: '5'},
  {label: 'Item 6', value: '6'},
  {label: 'Item 7', value: '7'},
  {label: 'Item 8', value: '8'},
];

const CreatePostScreen = () => {
  const toast = useToast();
  const [images, setImages] = useState<any>([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [ratings, setRatings] = useState<any>({
    overall: 0,
    wifi: 0,
    coffee: 0,
    ambience: 0,
    coworking: 0,
  });

  const [review, setReview] = useState('');
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [businesses, setBusinesses] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const GetBusinesses = async () => {
    try {
      setFetching(true);
      const info = await GetBusiness();
      if (info) {
        console.log(info.data);
        setBusinesses(info.data);
        setFetching(false);
      }
    } catch (error) {
      console.log(error);
      setFetching(false);
    }
  };

  useEffect(() => {
    GetBusinesses();
  }, []);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && {color: '#ccc'}]}>
          Location name
        </Text>
      );
    }
    return null;
  };

  const onUploadPress = () => {
    const options: any = {
      mediaType: 'mixed',
      selectionLimit: 0,
      videoQuality: 'low',
    };

    launchImageLibrary(options, (response: any) => {
      if (!response.didCancel && !response.errorCode) {
        const selectedAssets = response.assets.map((asset: any) => asset.uri);
        setImages((prevImages: any) => [...prevImages, ...selectedAssets]);
      }
    });
  };

  const removeImage = (index: any) => {
    setImages((prevImages: any) =>
      prevImages.filter((_: any, i: any) => i !== index),
    );
  };

  const openImageModal = (uri: any) => {
    setSelectedImage(uri);
    setModalVisible(true);
  };

  const handlePost = async () => {
    const loggedInUser: any = await AsyncStorage.getItem('user');
    const userId = JSON.parse(loggedInUser).user.id;
    setLoading(true);

    try {
      if (!selectedBusiness || !review) {
        setLoading(false);
        toast.show('Please select a business and write a review', {
          type: 'danger',
          placement: 'top',
          duration: 3000,
        });
        return;
      }

      // Create FormData
      const formData = new FormData();
      formData.append('userId', userId);
      formData.append('businessId', selectedBusiness.value);
      formData.append('description', review);
      formData.append('rating', ratings.overall.toString());

      // Append images to FormData
      images.forEach((imageUri: string, index: number) => {
        const imageName = `image_${index}.jpg`;
        formData.append('media', {
          uri: imageUri,
          type: 'image/jpeg',
          name: imageName,
        });
      });

      // Call API
      const response = await CreatePost(formData);

      if (response) {
        setLoading(false);
        setImages([]);
        setReview('');
        setSelectedBusiness(null);
        setRatings({overall: 0, wifi: 0, coffee: 0, ambience: 0, coworking: 0});
        setValue(null);
        toast.show('Post created successfully', {
          type: 'success',
          placement: 'top',
          duration: 3000,
        });
      } else {
        setLoading(false);
        toast.show('Failed to create post', {
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

  // const handlePost = async () => {

  //     console.log(images);

  //     const loggedInUser: any = await AsyncStorage.getItem('user');
  //     let userId = JSON.parse(loggedInUser).user.id;
  //     setLoading(true);
  //     try {

  //         if(!selectedBusiness || !review ) {
  //             setLoading(false);
  //             toast.show("Please select a business", {
  //                 type: 'danger',
  //                 placement: 'top',
  //                 duration: 3000,
  //             });
  //             return;
  //         }

  //         let data = {
  //             userId: userId,
  //             businessId: selectedBusiness.value,
  //             description: review,
  //             rating: ratings.overall,
  //             images: images,
  //         }

  //         const info = await CreatePost(data);

  //         if(info) {
  //             setLoading(false);
  //             setImages([]);
  //             setReview('');
  //             setSelectedBusiness(null);
  //             setRatings({ overall: 0, wifi: 0, coffee: 0, ambience: 0, coworking: 0 });
  //             setValue(null);
  //             toast.show("Post created successfully", {
  //                 type: 'success',
  //                 placement: 'top',
  //                 duration: 3000,
  //             });
  //         }

  //     } catch (error) {
  //         console.log(error);
  //         setLoading(false);
  //     }
  // };

  const renderRatingStars = (category: any) => {
    return (
      <View style={styles.ratingContainer}>
        {[1, 2, 3, 4, 5].map(star => (
          <TouchableOpacity
            key={star}
            onPress={() =>
              setRatings((prev: any) => ({...prev, [category]: star}))
            }>
            {star <= ratings[category] ? (
              <StarFilledIcon width={20} height={20} fill={COLORS.primary} />
            ) : (
              <StarIcon width={20} height={20} fill={COLORS.textColor} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderAmenity = (Icon: any, label: any, category: any) => (
    <View style={styles.amenityRow}>
      <View style={styles.amenityLabelContainer}>
        <Icon width={20} height={20} fill={COLORS.textColor} />
        <Text style={styles.amenityLabel}>{label}</Text>
      </View>
      {renderRatingStars(category)}
    </View>
  );

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
          <Text style={styles.sectionTitle}>Location Name</Text>
          <View style={{}}>
            <View style={[{padding: 1}, {width: '100%'}]}>
              <Dropdown
                style={[styles.dropdown, isFocus && {borderColor: 'blue'}]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={businesses?.map((item: any) => {
                  return {
                    label: item.name,
                    value: item.id,
                  };
                })}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus ? 'Select location' : '...'}
                searchPlaceholder="Search location..."
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={(item: any) => {
                  setValue(item.value);
                  setSelectedBusiness(item);
                  setIsFocus(false);
                }}
                renderItem={item => (
                  <View
                    style={[
                      styles.listItem,
                      item.value === value && styles.selectedItem,
                    ]}>
                    <Text style={styles.listItemText}>{item.label}</Text>
                  </View>
                )}
              />
            </View>
          </View>
        </View>

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

            {images.map((uri: any, index: any) => (
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

        {/* <View style={styles.section}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.sectionTitle}>Share some details about your post </Text>
                            <Text style={styles.optionalText}>(optional)</Text>
                        </View>
                        <TextInput
                            style={[styles.input, styles.reviewInput]}
                            multiline
                            placeholder="Review"
                            value={review}
                            onChangeText={setReview}
                            placeholderTextColor={COLORS.textColor}
                        />
                    </View> */}

        <View style={styles.section}>
          <Text
            style={{
              fontFamily: FONTS.RADIO_CANADA_SEMIBOLD,
              color: COLORS.black,
              fontSize: SIZES.medium,
            }}>
            Review
          </Text>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text style={{fontFamily: FONTS.RADIO_CANADA_MEDIUM}}>
              Overall rating
            </Text>
            {renderRatingStars('overall')}
          </View>
          <TextInput
            style={[styles.input, styles.reviewInput]}
            multiline
            placeholder="How was your experience?"
            onChangeText={setReview}
            placeholderTextColor={COLORS.textColor}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Amenities</Text>
          {renderAmenity(WifiIcon, 'Wifi', 'wifi')}
          {renderAmenity(CoffeeIcon, 'Coffee', 'coffee')}
          {renderAmenity(AmbienceIcon, 'Ambience', 'ambience')}
          {renderAmenity(CoworkingIcon, 'Co-working space', 'coworking')}
        </View>

        <CustomButton
          title="Create Post"
          disabled={
            !selectedBusiness || !review || images.length === 0 || loading
          }
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
  reviewInput: {
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

export default CreatePostScreen;
