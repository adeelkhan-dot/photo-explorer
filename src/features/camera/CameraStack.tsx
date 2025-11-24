import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraScreen from './CameraScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';

export type CameraStackParamList = {
  CameraMain: undefined;
  PhotoDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<CameraStackParamList>();

export default function CameraStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="CameraMain"
        component={CameraScreen}
        options={{
          title: "Camera",
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="PhotoDetailModal" 
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

