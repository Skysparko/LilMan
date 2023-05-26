import {ID} from 'appwrite';
import {loginUserAccount, registerUserAccount} from './types';
import {account} from './config';
import Snackbar from 'react-native-snackbar';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import React from 'react';

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
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
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
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  try {
    await account.deleteSession('current');
    setIsAuthenticated(false);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: loginUser :: ' + error);
  }
};
