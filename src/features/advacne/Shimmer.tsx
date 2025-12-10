import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withRepeat, withTiming, Easing } from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

export default function CardShimmerDemo() {
  const translateX = useSharedValue(-300);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(300, {
        duration: 1500,
        easing: Easing.inOut(Easing.ease),
      }),
      -1,
      false
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Animated.View style={[styles.shimmer, shimmerStyle]} />
        <View style={[styles.placeholder, { width: '60%', marginBottom: 8 }]} />
        <View style={[styles.placeholder, { width: '80%', marginBottom: 8 }]} />
        <View style={[styles.placeholder, { width: '40%' }]} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  card: {
    width: 300,
    height: 120,
    borderRadius: 12,
    backgroundColor: COLORS.SHIMMER_BACKGROUND,
    padding: 16,
    paddingBottom:0,
    overflow: 'hidden',
  },
  placeholder: {
    height: 20,
    backgroundColor: COLORS.SHIMMER_HIGHLIGHT,
    borderRadius: 8,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 150,
    height: '100%',
    backgroundColor:COLORS.SHIMMER_OVERLAY,
    borderRadius: 12,
  },
});
