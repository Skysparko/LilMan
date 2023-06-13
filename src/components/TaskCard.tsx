import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {Models} from 'appwrite';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTask, updateTasksStatus} from '../appwrite/db';

type Props = {
  myTaskData: Models.Document[] | undefined;
  selectedCategory: string;
  // setTasks: React.Dispatch<React.SetStateAction<Models.Document[] | undefined>>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
};
const TaskCard = ({
  myTaskData,
  selectedCategory,
  // setTasks,
  setRefreshData,
}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);
  return (
    <View style={styles.mainContainer}>
      <Text style={[styles.darkText, styles.title]}>Tasks</Text>
      <Text style={styles.description}>
        You can click on Task icon to change its status until completed.
      </Text>
      {myTaskData?.map(
        (task, key) =>
          task.category === selectedCategory && (
            <View key={key} style={styles.taskContainer}>
              <View style={styles.info}>
                {isLoading && (
                  <ActivityIndicator style={styles.progress} color={'white'} />
                )}
                {task.status === 'completed' && isLoading === false && (
                  <TouchableOpacity>
                    <Icon
                      name="checkmark-sharp"
                      color={'white'}
                      style={styles.completed}
                    />
                  </TouchableOpacity>
                )}
                {task.status === 'created' && isLoading === false && (
                  <TouchableOpacity
                    onPress={() =>
                      updateTasksStatus(
                        task.$id,
                        'progress',
                        setRefreshData,
                        setIsLoading,
                      )
                    }>
                    <Icon name="list" color={'white'} style={styles.created} />
                  </TouchableOpacity>
                )}
                {task.status === 'progress' && isLoading === false && (
                  <TouchableOpacity
                    onPress={() =>
                      updateTasksStatus(
                        task.$id,
                        'completed',
                        setRefreshData,
                        setIsLoading,
                      )
                    }>
                    <Icon
                      name="hourglass-outline"
                      color={'white'}
                      style={styles.progress}
                    />
                  </TouchableOpacity>
                )}
                {task.status === 'failed' && isLoading === false && (
                  <TouchableOpacity>
                    <Icon
                      name="md-close"
                      color={'white'}
                      style={styles.failed}
                    />
                  </TouchableOpacity>
                )}

                <View style={styles.infoContainer}>
                  <Text style={styles.taskTitle}>{task.name}</Text>
                  <Text>{task.description}</Text>
                </View>
                <View style={styles.actionButtons}>
                  {isDeleteLoading ? (
                    <TouchableOpacity>
                      <ActivityIndicator
                        color={'white'}
                        style={styles.delete}
                      />
                    </TouchableOpacity>
                  ) : (
                    <TouchableOpacity
                      onPress={() =>
                        deleteTask(task.$id, setRefreshData, setIsDeleteLoading)
                      }>
                      <Icon
                        name="trash-outline"
                        color={'white'}
                        style={styles.delete}
                      />
                    </TouchableOpacity>
                  )}
                  {/* <TouchableOpacity>
                    <Icon
                      name="md-pencil"
                      color={'white'}
                      style={styles.edit}
                    />
                  </TouchableOpacity> */}
                </View>
              </View>
              <View style={styles.dateTime}>
                <Text style={styles.darkText}>{task.date}</Text>
                <Text style={styles.darkText}>
                  {task.startTime} - {task.endTime}
                </Text>
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
    backgroundColor: 'red',
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
  },
  edit: {
    backgroundColor: 'blue',
    fontSize: 15,
    padding: 5,
    borderRadius: 5,
  },
  infoContainer: {},
  actionButtons: {
    gap: 5,
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '500',
    color: 'black',
  },

  info: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderBottomWidth: 0.5,
    gap: 5,
  },
  dateTime: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  completed: {
    backgroundColor: 'green',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
  },
  progress: {
    backgroundColor: 'blue',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
  },
  failed: {
    backgroundColor: 'red',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
  },
  created: {
    backgroundColor: 'purple',
    fontSize: 25,
    padding: 5,
    borderRadius: 5,
  },
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  taskContainer: {
    backgroundColor: 'white',
    elevation: 5,
    padding: 10,
    borderWidth: 1,
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
