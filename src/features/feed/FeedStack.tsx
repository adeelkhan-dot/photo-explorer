import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import FeedItemDetailModal from './FeedItemDetailModal';

export type FeedStackParamList = {
  FeedMain: undefined;
  FeedDetailModal: { photoId: string };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedMain" component={FeedScreen} options={{ title: 'Feed',headerShown:false }} />
      <Stack.Screen 
        name="FeedDetailModal" 
        component={FeedItemDetailModal} 
        options={{ presentation: 'modal', headerShown: false }}
      />
    </Stack.Navigator>
  );
}
