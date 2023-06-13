import Snackbar from 'react-native-snackbar';
import {database} from './config';
import {ID, Query} from 'appwrite';
import {taskType} from './types';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';

const databaseId = '6479a89da9f3a57ee5b3';
const collectionId = '6479a8aa7773550ce5de';

// Function to create a task
export async function createTask(
  task: taskType, // Task object containing the necessary properties
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the refresh data state
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the loading state
  navigation: NativeStackNavigationProp<RootStackParamList, 'Create'>, // Navigation prop for navigating to 'Home' screen
) {
  try {
    // Validation checks for task properties
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
      const todayDate = new Date().toISOString().split('T')[0];

      const startHour = Number(task.startTime.split(':')[0]);
      const startMinute = Number(task.startTime.split(':')[1]);

      const endHour = Number(task.endTime.split(':')[0]);
      const endMinute = Number(task.endTime.split(':')[1]);

      // Check if start time is before end time
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

      // Check if start time is after current time for today's date
      if (todayDate === task.date) {
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
      }

      setIsLoading(true); // Set isLoading to true to indicate loading state

      // Set task status based on start time
      if (startHour === date.getHours() && startMinute === date.getMinutes()) {
        task.status = 'progress';
      }

      await database.createDocument(
        databaseId,
        collectionId,
        ID.unique(), // Generate a unique ID for the task
        task, // Create the task document in the database
      );

      setRefreshData(true); // Set refresh data to true to trigger a data refresh
      navigation.navigate('Home'); // Navigate to the 'Home' screen
      Snackbar.show({
        text: 'Task successfully created',
        duration: Snackbar.LENGTH_SHORT,
      });
    }

    setIsLoading(false); // Set isLoading to false after the operation is completed
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: createTask :: ' + error);
    setIsLoading(false); // Set isLoading to false in case of an error
  }
}

// Function to get user tasks
export async function getUserTasks(userID: string) {
  try {
    const res = await database.listDocuments(databaseId, collectionId, [
      Query.equal('userID', userID), // Query to get tasks for a specific user
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

// Function to update task status
export async function updateTasksStatus(
  id: string, // ID of the task to update
  status: 'created' | 'progress' | 'completed' | 'failed', // Updated status value
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the refresh data state
) {
  try {
    await database.updateDocument(databaseId, collectionId, id, {
      status, // Update the status of the task in the database
    });
    setRefreshData(true); // Set refresh data to true to trigger a data refresh
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: updateTasks ::' + error);
  }
}

// Function to delete a task
export async function deleteTask(
  id: string, // ID of the task to delete
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>, // State setter to update the refresh data state
) {
  try {
    await database.deleteDocument(databaseId, collectionId, id); // Delete the task document from the database
    setRefreshData(true); // Set refresh data to true to trigger a data refresh
  } catch (error) {
    Snackbar.show({
      text: String((error as Error).message),
      duration: Snackbar.LENGTH_SHORT,
    });
    console.log('Appwrite service :: deleteTask ::' + error);
  }
}
