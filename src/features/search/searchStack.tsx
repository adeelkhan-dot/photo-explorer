import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';

export type SearchStackParamList = {
  SearchMain: undefined;
  PhotoDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SearchMain"
        component={SearchScreen}
        options={{
          title: "Search",
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
