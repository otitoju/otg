import React, { useState, useRef } from 'react';
import { View, Image, ScrollView, Dimensions, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import FastImage from 'react-native-fast-image';
const { width } = Dimensions.get('window');

const CustomImageSlider = ({images}: any) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollViewRef = useRef<any>(null);

  const onScroll = (event: any) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveIndex(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
      >
        {images?.map((image: any, index: any) => (
          <View key={index} style={styles.imageContainer}>
            <FastImage
              style={styles.image}
              source={{
                uri: image,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            {/* <Image source={{ uri: image }} style={[styles.image,]} /> */}
          </View>
        ))}
      </ScrollView>


      {images?.length > 0 && <View style={styles.pagination}>
        {images.map((_: any, index: any) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, activeIndex === index && styles.activeDot]}
            onPress={() => scrollViewRef.current.scrollTo({ x: index * width, animated: true })}
          />
        ))}
      </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    width: width,
    height: 250,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  pagination: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: COLORS.bgGray,
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
  },
});

export default CustomImageSlider;
