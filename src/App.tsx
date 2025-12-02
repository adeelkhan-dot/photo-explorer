import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import FeedStack from './features/feed/FeedStack';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesStack from './features/favorites/FavoritesStack';
import ProfileStack from './features/profile/profileStack';
import SearchStack from './features/search/searchStack';
import CameraStack from './features/camera/CameraStack';
import ThemeSafeAreaViewContext from './context/ThemeSafeAreaViewContext';
import {
  Text,
} from 'react-native';
import AdvanceStack from './features/advacne/AdvanceStack';


const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();


function TabNavigatorWithSafeArea() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => (
        {
          headerShown: true,
          tabBarIcon: () => null,
          tabBarIconStyle: { display: 'none' },
          tabBarLabel: ({ focused }) => (
            <Text
              style={{
                fontSize: 14,
                color: focused ? '#007bff' : 'black',
                fontWeight: focused ? 'bold' : 'normal',
                margin: 0,
                lineHeight: 14,
                padding: 0,
              }}
            >
              {route.name}
            </Text>
          ),
          tabBarStyle: {
            position: 'absolute',
            bottom: 0,
            left: 20,
            right: 20,
            elevation: 0,
            backgroundColor: '#fff',
            borderRadius: 10,
            height: 45,
            shadowColor: '#000',
            shadowOffset: { width: 0, height:10 },
            shadowOpacity: 0.25,
            shadowRadius: 3.5,
            borderWidth: 1,
            borderColor: '#ffffff',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 0,
            paddingTop: 10
          },
          tabBarLabelStyle: {
            fontSize: 14,
            textAlign: 'center',
            margin: 0,
            lineHeight: 14,
            padding: 0,
            color: 'black',
          }
        }
      )}
    >
      <Tab.Screen name="Feed" component={FeedStack} />
      <Tab.Screen name="Search" component={SearchStack} />
      <Tab.Screen name="Camera" component={CameraStack} />
      <Tab.Screen name="Favorites" component={FavoritesStack} />
      <Tab.Screen name="Profile" component={ProfileStack} />
      <Tab.Screen name="Advance" component={AdvanceStack} />
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

