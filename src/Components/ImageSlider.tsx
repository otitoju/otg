import React, {useState, useRef} from 'react';
import {
  View,
  Image,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FONTS, {COLORS, SIZES} from '../constants/theme';

const {width} = Dimensions.get('window');

const ImageSlider = ({images}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef(null);

  const handleScroll = event => {
    const contentOffset = event.nativeEvent.contentOffset;
    const currentIndex = Math.round(contentOffset.x / width);
    setActiveIndex(currentIndex);
  };

  const scrollToIndex = index => {
    scrollViewRef.current?.scrollTo({
      x: index * width,
      animated: true,
    });
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}>
        {images.length > 0
          ? images.map((uri, index) => (
              <View key={`image-${index}`} style={styles.imageContainer}>
                <Image source={{uri}} style={styles.image} resizeMode="cover" />
              </View>
            ))
          : ''}
      </ScrollView>

      <View style={styles.pagination}>
        {images.length > 0
          ? images.map((_, index) => (
              <TouchableOpacity
                key={`dot-${index}`}
                onPress={() => scrollToIndex(index)}
                style={styles.paginationDotContainer}>
                <View
                  style={[
                    styles.paginationDot,
                    activeIndex === index && styles.paginationDotActive,
                  ]}
                />
              </TouchableOpacity>
            ))
          : ''}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width,
    aspectRatio: 16 / 9,
    backgroundColor: COLORS.white,
    marginBottom: 10,
  },
  imageContainer: {
    width: width,
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  pagination: {
    position: 'absolute',
    bottom: SIZES.medium,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paginationDotContainer: {
    padding: 3,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.white,
    opacity: 0.5,
  },
  paginationDotActive: {
    opacity: 1,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
});

export default ImageSlider;
