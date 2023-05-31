import React, {useEffect, useRef} from 'react';
import {Animated, StyleSheet} from 'react-native';

const AnimatedBackground = () => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 2000, // Adjust the duration as per your preference
          useNativeDriver: false,
        }),
      ).start();
    };
    startAnimation();
  }, [animatedValue]);

  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(0, 0, 255, 0.5)', 'rgba(255, 0, 0, 0.5)'], // Adjust the colors as per your preference
  });

  return <Animated.View style={[styles.container, {backgroundColor}]} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default AnimatedBackground;
