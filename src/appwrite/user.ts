import Snackbar from 'react-native-snackbar';
import {account} from './config';
import {UserDataType} from './types';

export const getUserData = async (
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>,
) => {
  try {
    setUser(await account.get());
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: getUserData :: ' + error);
  }
};
