import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import Animated, { useSharedValue, withSpring, useAnimatedStyle } from 'react-native-reanimated';
import { COLORS } from '../../constants/colors';

export default function TopActionSheet() {
  const translateY = useSharedValue(-300);

  const style = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const openSheet = () => {
    translateY.value = withSpring(0, { damping: 50 }); 
  };

  const closeSheet = () => {
    translateY.value = withSpring(-300, { damping: 50 });
  };

  return (
    <View style={styles.container}>
      {/* Open button */}
      <Button title="Open Action Sheet" onPress={openSheet} />

      {/* Animated Action Sheet */}
      <Animated.View style={[styles.sheet, style]}>
        <Button title="Option 1" onPress={() => {}} />
        <Button title="Option 2" onPress={() => {}} />
        <Button title="Option 3" onPress={() => {}} />

        <View style={{ marginTop: 20 }}>
          <Button title="Close" onPress={closeSheet} />
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 50 },
  sheet: {
    position: 'absolute',
    top: 0, // show at top
    width: '90%',
    backgroundColor: COLORS.WHITE,
    borderRadius: 12,
    padding: 20,
    elevation: 10,
    alignSelf: 'center',
  },
});
