import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SearchScreen from './SearchScreen';
import PhotoDetailModal from '../../components/PhotoDetailModal';
import { SCREEN_NAMES } from '../../constants/screen';

export type SearchStackParamList = {
  SearchMain: undefined;
  PhotoDetailModal: { photo: any };
};

const Stack = createNativeStackNavigator<SearchStackParamList>();

export default function SearchStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={SCREEN_NAMES.SEARCH_MAIN}
        component={SearchScreen}
        options={{
          title: "Search",
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
