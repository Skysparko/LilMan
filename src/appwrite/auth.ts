import {ID} from 'appwrite';
import {loginUserAccount, registerUserAccount} from './types';
// import {account} from './config';
import Snackbar from 'react-native-snackbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import React from 'react';
import {account} from './config';

export const registerUser = async (
  {email, password, name}: registerUserAccount,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setIsLoading(true);
    const user = await account.create(ID.unique(), email, password, name);
    navigation.navigate('Login');
    setIsLoading(false);

    return user;
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: registerUser :: ' + error);
    setIsLoading(false);
  }
};

export const loginUser = async (
  {email, password}: loginUserAccount,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setIsLoading(true);
    console.log(email, password);
    const user = await account.createEmailSession(email, password);

    setIsAuthenticated(true);
    setIsLoading(false);
    return user;
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_LONG,
    });
    console.log('Appwrite service :: loginUser :: ' + error);
    setIsLoading(false);
  }
};

export const logOutUser = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>,
) => {
  try {
    await account.deleteSession('current');
    setIsAuthenticated(false);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: logoutUser :: ' + error);
  }
};

export const guestLogin = async (
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>,
  setIsGuestLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setIsGuestLoading(true);
    const res = await account.createAnonymousSession();
    console.log(res);
    setIsAuthenticated(true);
    setIsGuestLoading(false);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: guestLogin :: ' + error);
    setIsGuestLoading(false);
  }
};

export const forgotPassword = async (
  email: string,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    setIsLoading(true);
    const res = await account.createRecovery(
      email,
      'https://lilman-reset-password.netlify.app',
    );
    console.log(res);
    Snackbar.show({
      text: 'Please Check your mail for reset Link',
      duration: Snackbar.LENGTH_SHORT,
    });
    setIsLoading(false);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: forgotPassword :: ' + error);
    setIsLoading(false);
  }
};
