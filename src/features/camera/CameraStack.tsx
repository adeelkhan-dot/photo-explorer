import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';
import { SCREEN_NAMES } from '../../constants/screen';

export type CameraStackParamList = {
  CameraMain: undefined;
  PhotoDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<CameraStackParamList>();

export default function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.CAMERA_MAIN}
        component={CameraScreen}
        options={{
          title: "Camera",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name={SCREEN_NAMES.PHOTO_DETAIL_MODAL}
        component={PhotoDetailModal} 
        options={{ 
          presentation: 'modal', 
          headerShown: false,
          contentStyle: { backgroundColor: 'white' } 
        }}
      />
    </Stack.Navigator>
  );
}

