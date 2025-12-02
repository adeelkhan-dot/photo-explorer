import React, { useState } from 'react';
import { View, Button, TextInput, StyleSheet } from 'react-native';
import Animated, { SlideInUp, FadeOut } from 'react-native-reanimated';

export default function InputModal() {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState('');

  return (
    <View style={styles.container}>
      <Button title="Open Input Modal" onPress={() => setVisible(true)} />
      {visible && (
        <Animated.View entering={SlideInUp} exiting={FadeOut} style={styles.modal}>
          <TextInput
            style={styles.input}
            placeholder="Type something..."
            value={value}
            onChangeText={setValue}
          />
          <Button title="Close" onPress={() => {setVisible(false);setValue('')}} />
        </Animated.View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  modal: {
    position: 'absolute',
    top: '30%',
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    elevation: 10,
  },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, borderRadius: 8, marginBottom: 12 },
});
