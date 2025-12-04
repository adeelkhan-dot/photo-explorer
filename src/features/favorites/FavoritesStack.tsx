import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';
import { SCREEN_NAMES } from '../../constants/screen';

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name={SCREEN_NAMES.FAVORITES_MAIN} 
        component={FavoritesScreen}
        options={{
          title: "Favorites",
          headerShown:false 
        }}
      />
      <Stack.Screen 
        name={SCREEN_NAMES.PHOTO_DETAIL_MODAL} 
        component={PhotoDetailModal} 
        options={{ presentation: 'modal', headerShown: false, contentStyle: { backgroundColor: 'black' } }}
      />
    </Stack.Navigator>
  );
}
