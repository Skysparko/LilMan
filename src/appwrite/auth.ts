import {ID} from 'appwrite';
import {loginUserAccount, registerUserAccount} from './types';
// import {account} from './config';
import Snackbar from 'react-native-snackbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import React from 'react';
import {account} from './config';

// Function to register a user
export const registerUser = async (
  {email, password, name}: registerUserAccount, // Destructuring the registerUserAccount object
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>, // Navigation prop for navigating to the 'Login' screen
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the loading state
) => {
  try {
    setIsLoading(true); // Set isLoading to true to indicate loading state
    const user = await account.create(ID.unique(), email, password, name); // Create a new user account using the provided data
    navigation.navigate('Login'); // Navigate to the 'Login' screen
    setIsLoading(false); // Set isLoading to false to indicate the end of loading state

    return user; // Return the created user
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: registerUser :: ' + error);
    setIsLoading(false);
  }
};

// Function to login a user
export const loginUser = async (
  {email, password}: loginUserAccount, // Destructuring the loginUserAccount object
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>, // State setter to update the authenticated state
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the loading state
) => {
  try {
    setIsLoading(true); // Set isLoading to true to indicate loading state
    console.log(email, password);
    const user = await account.createEmailSession(email, password); // Create a session for the user with the provided email and password

    setIsAuthenticated(true); // Set isAuthenticated to true to indicate successful authentication
    setIsLoading(false); // Set isLoading to false to indicate the end of loading state
    return user; // Return the logged-in user
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_LONG,
    });
    console.log('Appwrite service :: loginUser :: ' + error);
    setIsLoading(false);
  }
};

// Function to log out a user
export const logOutUser = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>, // State setter to update the authenticated state
) => {
  try {
    await account.deleteSession('current'); // Delete the current session
    setIsAuthenticated(false); // Set isAuthenticated to false to indicate logged out state
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: logoutUser :: ' + error);
  }
};

// Function for guest login
export const guestLogin = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>, // State setter to update the authenticated state
  setIsGuestLoading: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the loading state for guest login
) => {
  try {
    setIsGuestLoading(true); // Set isGuestLoading to true to indicate loading state for guest login
    const res = await account.createAnonymousSession(); // Create an anonymous session for guest login
    console.log(res);
    setIsAuthenticated(true); // Set isAuthenticated to true to indicate successful guest login
    setIsGuestLoading(false); // Set isGuestLoading to false to indicate the end of loading state for guest login
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: guestLogin :: ' + error);
    setIsGuestLoading(false);
  }
};

// Function to handle forgot password
export const forgotPassword = async (
  email: string, // Email of the user requesting password reset
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the loading state
) => {
  try {
    setIsLoading(true); // Set isLoading to true to indicate loading state
    const res = await account.createRecovery(
      email,
      'https://lilman-reset-password.netlify.app', // Recovery URL for password reset
    );
    console.log(res);
    Snackbar.show({
      text: 'Please Check your mail for reset Link',
      duration: Snackbar.LENGTH_SHORT,
    });
    setIsLoading(false); // Set isLoading to false to indicate the end of loading state
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: forgotPassword :: ' + error);
    setIsLoading(false);
  }
};
