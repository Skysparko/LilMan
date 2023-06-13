import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Image} from 'react-native';
import {UserDataType} from './appwrite/types';
import {getUserTasks} from './appwrite/db';
import {Models} from 'appwrite';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IntroScreen from './components/Intro';
import Main from './components/auth/Main';
import Loader from './components/Loader';
import {account} from './appwrite/config';
import SplashScreen from 'react-native-splash-screen';
import IconComponent from './components/IconComponent';
import Home from './components/home/Home';
import Manage from './components/Manage';
import Create from './components/Create';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ForgotPassword from './components/auth/ForgotPassword';

// Define the parameter types for the components
export type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Manage: undefined;
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Main: undefined;
};

// Create the stack and tab navigators
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
  const [isRefreshing, setIsRefreshing] = useState(true);

  useEffect(() => {
    // Check the user's login status
    const checkLoginStatus = async () => {
      try {
        setIsRefreshing(true);
        const res = await account.get();
        if (refreshData) {
          getUserTasks(res.$id).then(data => {
            setTasks(data?.documents!);
            setTotalTasks(data?.total!);
            setRefreshData(false);
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
    setTimeout(() => {
      setIsRefreshing(false);
    }, 1000);
  }, [isAuthenticated, isLoading, refreshData]);

  useEffect(() => {
    // Check the intro status
    const checkIntroStatus = async () => {
      try {
        const introShown = await AsyncStorage.getItem('introShown');
        if (introShown === null) {
          setShowIntro(true); // Intro has not been shown before
        } else {
          setShowIntro(false); // Intro has been shown before
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
        isRefreshing ? (
          <Loader />
        ) : (
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
              {props => (
                <Manage
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
            <Tab.Screen name="Create">
              {props => <Create {...props} setRefreshData={setRefreshData} />}
            </Tab.Screen>
          </Tab.Navigator>
        )
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
