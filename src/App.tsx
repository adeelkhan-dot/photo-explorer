import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text, StyleSheet } from 'react-native';
import FeedStack from './features/feed/FeedStack';
import { FavoritesProvider } from './context/FavoritesContext';


const Tab = createBottomTabNavigator();
const RootStack = createNativeStackNavigator();

const Card = ({ text }: { text: string }) => (
  <View style={styles.container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);


export default function App() {
  return (
    <FavoritesProvider>
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Main" options={{ headerShown: false }}>
          {() => (
            <Tab.Navigator screenOptions={{
              headerShown: true,
              tabBarIcon: () => null,
              tabBarStyle: {
                borderTopWidth: 0,

              },
              tabBarLabelStyle: {
                fontSize: 14,
                textAlign: 'center',  
              }
            }}
            >
              <Tab.Screen name="Feed" component={FeedStack} />
              <Tab.Screen name="Search" component={() => <Card text="SearchStack" />} />
              <Tab.Screen name="Camera" component={() => <Card text="CameraStack" />} />
              <Tab.Screen name="Favorites" component={() => <Card text="FavoritesStack" />} />
              <Tab.Screen name="Profile" component={() => <Card text="ProfileStack" />} />
            </Tab.Navigator>
          )}
        </RootStack.Screen>
      </RootStack.Navigator>
    </NavigationContainer>
    </FavoritesProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
  },
});
