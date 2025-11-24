import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FavoritesScreen from './FavoritesScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';

const Stack = createNativeStackNavigator();

export default function FavoritesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FavoritesMain" 
        component={FavoritesScreen}
        options={{
          title: "Favorites",
        headerShown:false 
        }}
      />
      <Stack.Screen 
        name="PhotoDetailModal" 
        component={PhotoDetailModal} 
        options={{ presentation: 'modal', headerShown: false, contentStyle: { backgroundColor: 'black' } }}
      />
    </Stack.Navigator>
  );
}
