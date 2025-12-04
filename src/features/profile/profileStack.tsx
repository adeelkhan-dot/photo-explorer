import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './ProfileScreen';
import { SCREEN_NAMES } from '../../constants/screen';

const Stack = createNativeStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={SCREEN_NAMES.PROFILE_MAIN}
        component={ProfileScreen}
        options={{
          title: "Profile",
          headerShown:false 
        }}
      />
    </Stack.Navigator>
  );
}
