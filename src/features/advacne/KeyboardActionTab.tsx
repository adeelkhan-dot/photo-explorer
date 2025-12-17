import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TextInput,
  Pressable,
  Text,
  StyleSheet,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native';
import { COLORS } from '../../constants/colors';

export default function KeyboardActionTab() {
  const [text, setText] = useState('');
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    const show = Keyboard.addListener('keyboardDidShow', e =>
      setKeyboardHeight(e.endCoordinates.height)
    );
    const hide = Keyboard.addListener('keyboardDidHide', () =>
      setKeyboardHeight(0)
    );

    return () => {
      show.remove();
      hide.remove();
    };
  }, []);

  const runAction = (fn) => {
    fn();
    // Keep keyboard open
    inputRef.current?.focus();
  };

  const actions = [
    { title: 'Clear', onPress: () => setText('') },
    { title: 'Send', onPress: () => console.log('SEND:', text) },
    { title: 'Upper', onPress: () => setText(text.toUpperCase()) },
    { title: 'Lower', onPress: () => setText(text.toLowerCase()) },
    { title: 'Emoji 😊', onPress: () => setText(text + ' 😊') },
  ];

  return (
    <TouchableWithoutFeedback onPress={() => {}}>
      <View style={{ flex: 1 }}>
        
        <TextInput
          ref={inputRef}
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholder="Type here..."
        />

        {keyboardHeight > 0 && (
          <View style={[styles.tab, { bottom: keyboardHeight - 35 }]}>
            <ScrollView
              horizontal
              keyboardShouldPersistTaps="always"
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 10 }}
            >
              {actions.map((a, i) => (
                <Pressable
                  key={i}
                  onPress={() => runAction(a.onPress)}
                  style={styles.button}
                >
                  <Text style={styles.buttonText}>{a.title}</Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  input: {
    marginTop: 20,
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 10
  },
  tab: {
    position: 'absolute',
    left: 0,
    right: 0,
    backgroundColor:COLORS.SHIMMER_BACKGROUND,
    borderTopWidth: 1,
    borderColor: COLORS.BORDER_LIGHT,
    justifyContent: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 14,
    backgroundColor: COLORS.PRIMARY_IOS,
    marginRight: 10,
    borderRadius: 8,
  },
  buttonText: { color: 'white', fontWeight: 'bold' },
});
