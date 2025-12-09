import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';
import { SCREEN_NAMES } from '../../constants/screen';

export type FeedStackParamList = {
  FeedMain: undefined;
  FeedDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<FeedStackParamList>();

export default function FeedStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={SCREEN_NAMES.FEED_MAIN} component={FeedScreen} options={{ title: 'Feed',headerShown:false }} />
      <Stack.Screen 
        name={SCREEN_NAMES.FEED_DETAIL_MODAL} 
        component={PhotoDetailModal} 
        options={{ presentation: 'modal', headerShown: false,contentStyle: { backgroundColor: 'white' } }}
      />
    </Stack.Navigator>
  );
}
