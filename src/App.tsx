import React, {useEffect, useState} from 'react';
import Home from './components/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';
import {Text, View} from 'react-native';
import Manage from './components/Manage';
import Notification from './components/Notification';
import Create from './components/Create';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import {account} from './appwrite/config';

export type RootStackParamList = {
  //pages (authenticated users)
  Home: undefined;
  Create: undefined;
  Manage: undefined;
  Notification: undefined;
  //pages (non-authenticated users)
  Login: undefined;
  Register: undefined;
};

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

type IconProps = {
  iconName: string;
  color: string;
  size: number;
};

const IconComponent = ({iconName, color, size}: IconProps) => {
  // Use the data prop in the child component
  return (
    <View>
      <Icon name={iconName} color={color} size={size} />
    </View>
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
  }, [isAuthenticated]);

  return (
    <NavigationContainer>
      {isLoading ? (
        <Text>Loading</Text>
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
            tabBarActiveTintColor: 'tomato',
            tabBarInactiveTintColor: 'gray',
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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login">
            {props => (
              <Login {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Register" component={Register} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
