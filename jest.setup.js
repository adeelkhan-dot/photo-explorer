jest.mock('@ungap/structured-clone', () => ({
 __esModule: true,
 default: (obj: any) => JSON.parse(JSON.stringify(obj)),
}), { virtual: true });

if (!global.__ExpoImportMetaRegistry) {
 global.__ExpoImportMetaRegistry = new Map();
}

jest.mock('react-native-reanimated', () => {
 const Reanimated = require('react-native-reanimated/mock');

 Reanimated.useSharedValue = jest.fn((init) => ({
   value: init,
 }));

 Reanimated.withSpring = jest.fn((toValue) => toValue);

 Reanimated.useAnimatedStyle = jest.fn((callback) => {
   const sharedValue = { value: 1 };
   if (callback) {
     return callback();
   }
   return {};
 });

 Reanimated.default.View = require('react-native').View;
 Reanimated.default.Image = require('react-native').Image;
 Reanimated.default.Text = require('react-native').Text;
 Reanimated.default.ScrollView = require('react-native').ScrollView;
 Reanimated.default.FlatList = require('react-native').FlatList;

 Reanimated.FadeInUp = {
   delay: () => Reanimated.FadeInUp,
   duration: () => Reanimated.FadeInUp,
   springify: () => Reanimated.FadeInUp,
 };
 Reanimated.SlideInUp = {
   springify: () => Reanimated.SlideInUp,
 };
 Reanimated.FadeIn = {
   duration: () => Reanimated.FadeIn,
 };
 Reanimated.FadeInDown = {
   delay: () => Reanimated.FadeInDown,
 };
 Reanimated.LinearTransition = {
   springify: () => ({
     damping: () => ({
       stiffness: () => ({}),
     }),
   }),
 };
  return Reanimated;
});


jest.mock('expo-image', () => {
 const { View } = require('react-native');
 const React = require('react');
  return {
   Image: ({ source, style, testID, accessibilityLabel, ...props }) => {
     const uri = typeof source === 'string' ? source : source?.uri;
     return React.createElement(View, {
       ...props,
       style,
       testID: testID || 'expo-image',
       accessibilityLabel: accessibilityLabel || uri,
     });
   },
 };
});

jest.mock('@react-native-async-storage/async-storage', () =>
 require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);
