import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Animated, { SlideInUp, SlideInDown, FadeOut } from 'react-native-reanimated';

export default function ParallelModalsr() {
  const [modalA, setModalA] = useState(false);
  const [modalB, setModalB] = useState(false);

  return (
    <View style={styles.container}>
      <Button title="Open Modal A" onPress={() => setModalA(true)} />
      <Button title="Open Modal B" onPress={() => setModalB(true)} />

      {modalA && (
        <Animated.View entering={SlideInUp.duration(300)} exiting={FadeOut} style={styles.modalA}>
          <Text>Modal A Content</Text>
          <Button title="Close" onPress={() => setModalA(false)} />
        </Animated.View>
      )}

      {modalB && (
        <Animated.View entering={SlideInDown.duration(300)} exiting={FadeOut} style={styles.modalB}>
          <Text>Modal B Content</Text>
          <Button title="Close" onPress={() => setModalB(false)} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modalA: {
    position: 'absolute',
    top: 50,
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
  },
  modalB: {
    position: 'absolute',
    bottom: 50,
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
  },
});
