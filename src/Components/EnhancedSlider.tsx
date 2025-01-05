import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import {COLORS} from '../constants/theme';

const {width} = Dimensions.get('window');

const EnhancedImageSlider = ({images}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);

  // Handle scrolling to the correct index
  const onScroll = (event: any) => {
    const slideIndex = Math.floor(
      event.nativeEvent.contentOffset.x / (width - 40),
    ); // Adjust for margin
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      {/* Image Slider */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollViewContent}>
        {images.map((image: any, index: any) => (
          <View key={index} style={styles.imageContainer}>
            <Image source={{uri: image}} style={styles.image} />

            {/* Display current index and total images */}
            <Text style={styles.indexText}>{`${activeIndex + 1}/${
              images.length
            }`}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Dot Pagination */}
      {images.length > 0 && (
        <View style={styles.pagination}>
          {images.map((_: any, index: any) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, activeIndex === index && styles.activeDot]}
              onPress={() =>
                scrollViewRef.current.scrollTo({
                  x: index * (width - 40),
                  animated: true,
                })
              } // Adjust for margin
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollViewContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: width - 40, // Adjust for margin/padding (20 on each side)
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20, // Space around the image
    marginTop: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10, // Rounded images
  },
  indexText: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    color: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    fontSize: 14,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0, // Reduce the space between pagination and image container to zero
    position: 'absolute',
    bottom: -20,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.black,
    marginHorizontal: 3, // Reduce margin between dots if needed
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});

export default EnhancedImageSlider;
