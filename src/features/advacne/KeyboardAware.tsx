import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { COLORS } from '../../constants/colors';

export default function KeyboardAware() {
  const [values, setValues] = useState({ a: '', b: '', c: '',d:'',e:'' });

  return (
    <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={styles.container}
        enableOnAndroid={true} 
        extraHeight={75} 
    >
      <View style={styles.inner}>
      <TextInput
        style={styles.input}
        placeholder="Field A"
        value={values.a}
        onChangeText={(text) => setValues({ ...values, a: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Field B"
        value={values.b}
        onChangeText={(text) => setValues({ ...values, b: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Field C"
        value={values.c}
        onChangeText={(text) => setValues({ ...values, c: text })}
      />
      <View style={{ height: 200 }} /> 
      <TextInput
        style={styles.input}
        placeholder="Field C"
        value={values.c}
        onChangeText={(text) => setValues({ ...values, d: text })}
      />
        <View style={{ height: 400 }} /> 
        <TextInput
        style={styles.input}
        placeholder="Field C"
        value={values.c}
        onChangeText={(text) => setValues({ ...values, e: text })}
      />
      <Button title="Submit" onPress={() => console.log(values)} />
    </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', padding: 20 },
   input: {
    height: 50,
    borderColor: COLORS.TEXT_PRIMARY,
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
    inner: {
    padding: 24,
    flex: 1,
    justifyContent: 'flex-end',
  },
});
