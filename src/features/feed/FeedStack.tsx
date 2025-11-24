import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';

export type FeedStackParamList = {
  FeedMain: undefined;
  FeedDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="FeedMain" component={FeedScreen} options={{ title: 'Feed',headerShown:false }} />
      <Stack.Screen 
        name="FeedDetailModal" 
        component={PhotoDetailModal} 
        options={{ presentation: 'modal', headerShown: false,contentStyle: { backgroundColor: 'white' } }}
      />
    </Stack.Navigator>
  );
}
