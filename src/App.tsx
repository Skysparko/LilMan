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
import Home from './components/home/Home';
import Create from './components/Create';
import Manage from './components/Manage';

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

import {UserDataType} from './appwrite/types';
import {getUserTasks} from './appwrite/db';
import {Models} from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroScreen from './components/Intro';
import Main from './components/auth/Main';

//Param Types of Components
export type RootStackParamList = {
  //pages (authenticated users)
  Home: undefined;
  Create: undefined;
  Manage: undefined;
  //pages (non-authenticated users)
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

//Stack and Tab Navigator Component
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const App = () => {
  const [showIntro, setShowIntro] = useState(false);
  const [user, setUser] = useState<UserDataType | null>(null);
  const [refreshData, setRefreshData] = useState(true);
  const [tasks, setTasks] = useState<Models.Document[]>();
  const [totalTasks, setTotalTasks] = useState(0);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check user's login status

    const checkLoginStatus = async () => {
      try {
        const res = await account.get();
        if (refreshData) {
          getUserTasks(res.$id).then(data => {
            setTasks(data?.documents!);
            setTotalTasks(data?.total!);
            setRefreshData(false); // Reset refreshData after fetching
            console.log('refreshing user data');
          });
        }
        setUser(res);
        setIsAuthenticated(true);

        setIsLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    };

    checkLoginStatus()
      .then(() => {
        if (!isLoading) {
          SplashScreen.hide();
          console.log('hiding');
        }
      })
      .catch(() => {});
  }, [isAuthenticated, isLoading, refreshData]);

  useEffect(() => {
    const checkIntroStatus = async () => {
      try {
        const introShown = await AsyncStorage.getItem('introShown');
        if (introShown === null) {
          // Intro has not been shown before
          setShowIntro(true);
        } else {
          // Intro has been shown before
          setShowIntro(false);
        }
      } catch (error) {
        console.log(error);
        // Handle error
      }
    };

    checkIntroStatus();
  }, [showIntro]);

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
              <Home
                {...props}
                setRefreshData={setRefreshData}
                setTasks={setTasks}
                setIsAuthenticated={setIsAuthenticated}
                user={user}
                tasks={tasks!}
                totalTasks={totalTasks}
              />
            )}
          </Tab.Screen>
          <Tab.Screen name="Manage">
            {props => <Manage {...props} />}
          </Tab.Screen>
          <Tab.Screen name="Create">
            {props => <Create {...props} setRefreshData={setRefreshData} />}
          </Tab.Screen>
        </Tab.Navigator>
      ) : showIntro ? (
        <IntroScreen setShowIntro={setShowIntro} />
      ) : (
        <Stack.Navigator
          initialRouteName="Main"
          screenOptions={{
            animation: 'slide_from_right',
            headerTransparent: true,
            title: '',
          }}>
          <Stack.Screen name="Main">
            {props => (
              <Main {...props} setIsAuthenticated={setIsAuthenticated} />
            )}
          </Stack.Screen>
          <Stack.Screen name="Login">
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
