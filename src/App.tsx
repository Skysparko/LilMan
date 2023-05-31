//react
import React, {useEffect, useState} from 'react';
//react-native
// import {StyleSheet} from 'react-native';
//react-navigation
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import 'react-native-gesture-handler';

//pages (authenticated users)
import Home from './components/Home';
import Create from './components/Create';
import Manage from './components/Manage';
import Notification from './components/Notification';

//pages (non-authenticated users)
import Login from './components/auth/Login';
import Register from './components/auth/Register';

//appwrite
import {account} from './appwrite/config';

//images

import IconComponent from './components/IconComponent';
import ForgotPassword from './components/auth/ForgotPassword';
import SplashScreen from 'react-native-splash-screen';
import {Image} from 'react-native';

//Param Types of Components
export type RootStackParamList = {
  //pages (authenticated users)
  Home: undefined;
  Create: undefined;
  Manage: undefined;
  Notification: undefined;
  //pages (non-authenticated users)
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

//Stack and Tab Navigator Component
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkLoginStatus = async () => {
    try {
      await account.get();
      setIsAuthenticated(true);
      setIsLoading(false);
    } catch (error) {
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Check user's login status

    checkLoginStatus();

    if (!isLoading) {
      SplashScreen.hide();
    }
  }, [isAuthenticated, isLoading]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Image source={require('./assets/images/splashScreen.png')} />
      ) : isAuthenticated ? (
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName;

              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Manage') {
                iconName = focused ? 'calendar' : 'calendar-outline';
              } else if (route.name === 'Create') {
                iconName = focused ? 'create' : 'create-outline';
              } else if (route.name === 'Notification') {
                iconName = focused ? 'notifications' : 'notifications-outline';
              }
              return IconComponent({iconName: iconName!, color, size});
            },
            tabBarActiveBackgroundColor: '#E6E6FA',
            tabBarActiveTintColor: 'rgb(108, 0, 255)',
            tabBarInactiveTintColor: 'gray',
            tabBarShowLabel: false,
            headerShown: false,
          })}>
          <Tab.Screen name="Home">
            {props => (
              <Home {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Tab.Screen>
          <Tab.Screen name="Manage" component={Manage} />
          <Tab.Screen name="Create" component={Create} />
          <Tab.Screen name="Notification" component={Notification} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            animation: 'slide_from_right',
            headerTransparent: true,
          }}>
          <Stack.Screen name="Login" options={{title: ''}}>
            {props => (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Register"
            component={Register}
            options={{title: ''}}
          />
          <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
