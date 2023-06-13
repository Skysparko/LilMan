import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Models} from 'appwrite';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTask, updateTasksStatus} from '../appwrite/db';

type Props = {
  myTaskData: Models.Document[] | undefined; // Array of task objects
  selectedCategory: string; // Selected category string
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>; // State setter function
};

const TaskCard = ({myTaskData, selectedCategory, setRefreshData}: Props) => {
  // Iterate over the task data and render task cards
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.darkText, styles.title]}>Tasks</Text>
      <Text style={styles.description}>
        You can click on Task icon to change its status until completed.
      </Text>
      {myTaskData?.map(
        (task, key) =>
          task.category === selectedCategory && ( // Filter tasks based on selected category
            <View key={key} style={styles.taskContainer}>
              <View style={styles.info}>
                {/* Render different icons based on task status */}
                {task.status === 'completed' && (
                  <TouchableOpacity>
                    <Icon
                      name="checkmark-sharp"
                      color={'white'}
                      style={styles.completed}
                    />
                  </TouchableOpacity>
                )}
                {task.status === 'created' && (
                  <TouchableOpacity
                    onPress={() =>
                      updateTasksStatus(task.$id, 'progress', setRefreshData)
                    }>
                    <Icon name="list" color={'white'} style={styles.created} />
                  </TouchableOpacity>
                )}
                {task.status === 'progress' && (
                  <TouchableOpacity
                    onPress={() =>
                      updateTasksStatus(task.$id, 'completed', setRefreshData)
                    }>
                    <Icon
                      name="hourglass-outline"
                      color={'white'}
                      style={styles.progress}
                    />
                  </TouchableOpacity>
                )}
                {task.status === 'failed' && (
                  <TouchableOpacity>
                    <Icon
                      name="md-close"
                      color={'white'}
                      style={styles.failed}
                    />
                  </TouchableOpacity>
                )}

                {/* Render task title and description */}
                <View style={styles.infoContainer}>
                  <View>
                    <Text style={styles.taskTitle}>{task.name}</Text>
                    <Text>{task.description}</Text>
                  </View>
                </View>

                {/* Render action buttons */}
                <View style={styles.actionButtons}>
                  <TouchableOpacity
                    onPress={() => deleteTask(task.$id, setRefreshData)}>
                    <Icon name="close" color={'red'} style={styles.delete} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ),
      )}
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  description: {
    fontSize: 14,
    color: 'gray',
    marginHorizontal: 10,
    marginVertical: 5,
  },
  delete: {
    fontSize: 25,
  },
  edit: {
    backgroundColor: 'blue',
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  time: {
    gap: 5,
  },
  actionButtons: {},
  taskTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',

    alignItems: 'center',
    paddingHorizontal: 10,

    gap: 20,
  },
  dateTime: {
    paddingTop: 10,
    borderWidth: 1,
  },
  date: {
    textAlign: 'center',
    color: 'black',
  },
  completed: {
    backgroundColor: 'green',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  },
  progress: {
    backgroundColor: 'blue',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  },
  failed: {
    backgroundColor: 'red',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  },
  created: {
    backgroundColor: 'purple',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
    elevation: 2,
  },
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  taskContainer: {
    backgroundColor: 'white',
    elevation: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,

    borderColor: 'gray',
    borderRadius: 10,
    marginVertical: 10,
    marginHorizontal: 5,
  },
  catScrollContainer: {
    margin: 10,
    borderRadius: 15,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    width: 200,
    height: 200,
    overflow: 'hidden',
    backgroundColor: '#6102e3',
    elevation: 10,
  },

  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },

  rightCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomLeftRadius: 100,
    height: 100,
    width: 100,
    backgroundColor: '#5900d1',
  },
  blendText: {
    color: '#5900d1',
  },
  leftCircle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderTopRightRadius: 100,
    height: 100,
    width: 100,
    backgroundColor: '#5900d1',
  },
  emptyContent: {
    alignItems: 'center',
    gap: 20,
    marginTop: 100,
  },

  button: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 10,
    width: 100,
  },
  lightText: {
    color: 'white',
  },
  darkText: {
    color: 'black',
  },
});
