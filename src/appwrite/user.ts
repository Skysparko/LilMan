import Snackbar from 'react-native-snackbar';
import {account} from './config';
import {UserDataType} from './types';

// Function to get user data
export const getUserData = async (
  setUser: React.Dispatch<React.SetStateAction<UserDataType | null>>, // State setter to update the user data
) => {
  try {
    setUser(await account.get()); // Retrieve the user data using the 'get' method from the 'account' object
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: getUserData :: ' + error);
  }
};
