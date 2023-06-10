import {ID} from 'appwrite';
import {loginUserAccount, registerUserAccount} from './types';
// import {account} from './config';
import Snackbar from 'react-native-snackbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import React from 'react';
import {account} from './config';
import {Linking} from 'react-native';

export const registerUser = async (
  {email, password, name}: registerUserAccount,
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>,
) => {
  try {
    const user = await account.create(ID.unique(), email, password, name);
    navigation.navigate('Login');
    return user;
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: registerUser :: ' + error);
  }
};

export const loginUser = async (
  {email, password}: loginUserAccount,
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>,
) => {
  try {
    console.log(email, password);
    const user = await account.createEmailSession(email, password);

    setIsAuthenticated(true);
    return user;
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_LONG,
    });
    console.log('Appwrite service :: loginUser :: ' + error);
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
) => {
  try {
    const res = await account.createAnonymousSession();
    console.log(res);
    setIsAuthenticated(true);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: guestLogin :: ' + error);
  }
};

export const forgotPassword = async () => {
  try {
    const res = await account.createRecovery(
      'shubhamrakhecha5@gmail.com',
      'lilman://lilman.com',
    );

    console.log(res);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: forgotPassword :: ' + error);
  }
};

export const resetPassword = async () => {
  try {
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: forgotPassword :: ' + error);
  }
};
