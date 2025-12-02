import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
//   input: { width: '100%', borderWidth: 1, borderColor: '#ccc', padding: 10, marginBottom: 12, borderRadius: 8 },
   input: {

    height: 50,
    borderColor: '#000000',
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



// import React from 'react';
// import { View, TextInput, StyleSheet, Text, Button } from 'react-native';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

// const KeyboardAwareScrollViewComponent = () => {
//   return (
//     <KeyboardAwareScrollView
//       style={{ flex: 1 }}
//       contentContainerStyle={styles.contentContainer} // Important for flexGrow
//       enableOnAndroid={true} // Enables support for Android
//       extraHeight={75} // Adds extra space above the keyboard (optional)
//     >
//       <View style={styles.inner}>
//         <Text style={styles.header}>Login</Text>
//         <TextInput placeholder="Username" style={styles.textInput} />
//         <TextInput placeholder="Password" style={styles.textInput} secureTextEntry={true} />
//         <View style={styles.buttonContainer}>
//           <Button title="Sign In" onPress={() => {}} />
//         </View>
        
//         {/* Add more content to force scrolling */}
//         <View style={{ height: 200 }} /> 
//         <TextInput placeholder="Another Input" style={styles.textInput} />
//         <View style={{ height: 200 }} />
//         <TextInput placeholder="Last Input" style={styles.textInput} />
//       </View>
//     </KeyboardAwareScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   contentContainer: {
//     flexGrow: 1, // Ensures content can grow and scroll
//     justifyContent: 'center',
//     padding: 20,
//   },
//   inner: {
//     padding: 24,
//     flex: 1,
//     justifyContent: 'flex-end',
//   },
//   header: {
//     fontSize: 36,
//     marginBottom: 48,
//     textAlign: 'center',
//   },
//   textInput: {
//     height: 50,
//     borderColor: '#000000',
//     borderWidth: 1,
//     marginBottom: 15,
//     paddingHorizontal: 10,
//     borderRadius: 5,
//   },
//   buttonContainer: {
//     marginTop: 12,
//   },
// });

// export default KeyboardAwareScrollViewComponent;
