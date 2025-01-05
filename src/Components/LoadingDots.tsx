import React, { useEffect } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';
import FONTS, { COLORS, SIZES } from '../constants/theme';

const LoadingDots = () => {
  const dots = [
    new Animated.Value(0),
    new Animated.Value(0),
    new Animated.Value(0)
  ];

  useEffect(() => {
    const animations = dots.map((dot, index) => 
      Animated.loop(
        Animated.sequence([
          Animated.delay(index * 200),
          Animated.timing(dot, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(dot, {
            toValue: 0,
            duration: 500,
            useNativeDriver: true
          })
        ])
      )
    );

    animations.forEach(animation => animation.start());

    return () => {
      animations.forEach(animation => animation.stop());
    };
  }, []);

  return (
    <View style={styles.container}>
      {dots.map((dot, index) => (
        <Animated.View 
          key={index} 
          style={[
            styles.dot, 
            { 
              opacity: dot,
              transform: [{ 
                translateY: dot.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -10]
                }) 
              }]
            }
          ]} 
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
   backgroundColor: COLORS.primary,
    marginHorizontal: 5
  }
});

export default LoadingDots;