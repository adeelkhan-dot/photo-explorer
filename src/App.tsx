import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider} from 'react-native-safe-area-context';
import FeedStack from './features/feed/FeedStack';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesStack from './features/favorites/FavoritesStack';
import ProfileStack from './features/profile/profileStack';
import SearchStack from './features/search/searchStack';
import CameraStack from './features/camera/CameraStack';
import ThemeSafeAreaViewContext from './context/ThemeSafeAreaViewContext';


const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();


function TabNavigatorWithSafeArea() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown: true,
      tabBarIcon: () => null,
      tabBarStyle: {
        position: 'absolute',
        bottom: 0,
        left: 20,
        right: 20,
        elevation: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        height: 45,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        borderWidth: 1,
        borderColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 0,
        paddingTop: 0,
      },
      tabBarLabelStyle: {
        fontSize: 14,
        textAlign: 'center',
        margin: 0,
        lineHeight:14,
        padding: 0,
        color: 'black',
      }
    }
    }
    >
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Camera" component={CameraStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ThemeSafeAreaViewContext edges={['bottom']}>
        <FavoritesProvider>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen name="Main" options={{ headerShown: false }}>
                {() => <TabNavigatorWithSafeArea />}
              </RootStack.Screen>
            </RootStack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </ThemeSafeAreaViewContext>
    </SafeAreaProvider>
  );
}

