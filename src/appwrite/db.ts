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
      const date = new Date();

      const startHour = Number(task.startTime.split(':')[0]);
      const startMinute = Number(task.startTime.split(':')[1]);

      const endHour = Number(task.endTime.split(':')[0]);
      const endMinute = Number(task.endTime.split(':')[1]);

      if (startHour > endHour) {
        Snackbar.show({
          text: 'Start time must be before end time',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      if (startHour === endHour) {
        if (startMinute > endMinute) {
          Snackbar.show({
            text: 'Start time must be before end time',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }
      }

      if (startHour === endHour && startMinute === endMinute) {
        Snackbar.show({
          text: 'Start time must be before end time',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      if (startHour < date.getHours()) {
        Snackbar.show({
          text: 'Start time must be after current time',
          duration: Snackbar.LENGTH_SHORT,
        });
        return;
      }

      if (startHour === date.getHours()) {
        if (startMinute < date.getMinutes()) {
          Snackbar.show({
            text: 'Start time must be after current time',
            duration: Snackbar.LENGTH_SHORT,
          });
          return;
        }
      }

      if (startHour === date.getHours() && startMinute === date.getMinutes()) {
        task.status = 'progress';
      }

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

export async function updateTasksStatus(
  id: string,
  status: 'created' | 'progress' | 'completed' | 'failed',
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    await database.updateDocument(databaseId, collectionId, id, {
      status,
    });
    setRefreshData(true);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: updateTasks ::' + error);
  }
}

export async function deleteTask(
  id: string,
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>,
) {
  try {
    await database.deleteDocument(databaseId, collectionId, id);
    setRefreshData(true);
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: deleteTask ::' + error);
  }
}
