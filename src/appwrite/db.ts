import Snackbar from 'react-native-snackbar';
import {database} from './config';
import {ID, Query} from 'appwrite';
import {taskType} from './types';
import React from 'react';

const databaseId = '6479a89da9f3a57ee5b3';
const collectionId = '6479a8aa7773550ce5de';

export async function createTask(
  task: taskType,
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    if (
      !task.name ||
      !task.description ||
      !task.category ||
      !task.date ||
      !task.endTime ||
      !task.startTime ||
      !task.userID
    ) {
      Snackbar.show({
        text: 'Please fill in all fields',
        duration: Snackbar.LENGTH_SHORT,
      });
    } else {
      await database.createDocument(
        databaseId,
        collectionId,
        ID.unique(),
        task,
      );
      setRefreshData(true);
      Snackbar.show({
        text: 'Task successfully created',
        duration: Snackbar.LENGTH_SHORT,
      });
    }
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: createTask :: ' + error);
  }
}

export async function getUserTasks(userID: string) {
  try {
    const res = await database.listDocuments(databaseId, collectionId, [
      Query.equal('userID', userID),
    ]);

    return res;
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: getUserTasks :: ' + error);
  }
}
