import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import FeedStack from './features/feed/FeedStack';
import { FavoritesProvider } from './context/FavoritesContext';
import FavoritesStack from './features/favorites/FavoritesStack';
import ProfileStack from './features/profile/profileStack';
import SearchStack from './features/search/searchStack';
import CameraStack from './features/camera/CameraStack';
import {
  Text, StyleSheet
} from 'react-native';
import AdvanceStack from './features/advacne/AdvanceStack';
import { SCREEN_NAMES } from './constants/screen';
import { COLORS } from './constants/colors';


const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const renderTabLabel = (routeName: string, focused: boolean) => (
  <Text
    style={[
      styles.tabLabel,
      focused && styles.focusedTabLabel,
    ]}
  >
    {routeName}
  </Text>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <FavoritesProvider>
          <NavigationContainer>
            <RootStack.Navigator>
              <RootStack.Screen name={SCREEN_NAMES.MAIN} options={{ headerShown: false }}>
                {() => (<Tab.Navigator
                  screenOptions={({ route }) => ({
                    headerShown: true,
                    tabBarIcon: () => null,
                    tabBarIconStyle: { display: 'none' },
                    tabBarLabel: ({ focused }) => renderTabLabel(route.name, focused),
                    tabBarStyle: styles.tabBar,
                  })}
                >
                  <Tab.Screen name={SCREEN_NAMES.FEED} component={FeedStack} />
                  <Tab.Screen name={SCREEN_NAMES.SEARCH} component={SearchStack} />
                  <Tab.Screen name={SCREEN_NAMES.CAMERA} component={CameraStack} />
                  <Tab.Screen name={SCREEN_NAMES.FAVORITES} component={FavoritesStack} />
                  <Tab.Screen name={SCREEN_NAMES.PROFILE} component={ProfileStack} />
                  <Tab.Screen name={SCREEN_NAMES.ADVANCE} component={AdvanceStack} />
                </Tab.Navigator>)}
              </RootStack.Screen>
            </RootStack.Navigator>
          </NavigationContainer>
        </FavoritesProvider>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 20,
    right: 20,
    elevation: 0,
    backgroundColor: COLORS.WHITE,
    borderRadius: 10,
    height: 45,
    shadowColor: COLORS.SHADOW,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    borderWidth: 1,
    borderColor:COLORS.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    paddingTop: 10,
  },
  tabLabel: {
    fontSize: 14,
    textAlign: 'center',
    margin: 0,
    lineHeight: 14,
    padding: 0,
    color: 'black',  
    fontWeight: 'normal',
  },
  focusedTabLabel: {
    color:COLORS.PRIMARY,
    fontWeight: 'bold',
  },
});