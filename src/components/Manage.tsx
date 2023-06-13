import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Calendar} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Button} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {Models} from 'appwrite';
import {UserDataType} from '../appwrite/types';
import Icon from 'react-native-vector-icons/Ionicons';
import {deleteTask, updateTasksStatus} from '../appwrite/db';

type ManageScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Manage'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  user: UserDataType | null;
  tasks: Models.Document[];
  totalTasks: number;
  setTasks: React.Dispatch<React.SetStateAction<Models.Document[] | undefined>>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
};
const Manage = ({
  // setTasks,
  navigation,
  // setIsAuthenticated,
  // user,
  tasks,
  setRefreshData,
}: ManageScreenProps) => {
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  const [tasksData, setTasksData] = useState<Models.Document[]>();
  const [showTasks, setShowTasks] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  const [events, setEvents] = useState<{
    [date: string]: {
      selected: boolean;
      marked: boolean;
      selectedColor: string;
    };
  }>({});
  useEffect(() => {
    tasksData?.length === 0 ? setShowTasks(false) : setShowTasks(true);
    setTasksData(tasks);
    if (tasksData?.length !== 0) {
      const formattedEvents: {
        [date: string]: {
          selected: boolean;
          marked: boolean;
          selectedColor: string;
        };
      } = {};
      tasksData?.map(event => {
        const formattedDate = event.date;
        console.log('date' + formattedDate);
        let color: string;
        if (event.status === 'created') {
          color = 'purple';
        } else if (event.status === 'progress') {
          color = 'blue';
        } else {
          color = 'green';
        }
        const formattedEvent = {
          selected: true,
          marked: true,
          selectedColor: color,
        };
        formattedEvents[formattedDate] = formattedEvent;
      });
      setEvents(formattedEvents);
      console.log(formattedEvents);
    }
  }, [tasksData, tasks]);
  console.log(selectedDate);
  console.log(events);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <Calendar
        style={styles.calendar}
        onDayPress={date => setSelectedDate(date.dateString)}
        markedDates={events}
      />

      <View style={styles.container}>
        <Text style={[styles.title, styles.text]}>Tasks</Text>
        <Text style={styles.description}>
          Click on any date to get its tasks.
        </Text>
        {showTasks ? (
          <View style={styles.mainContainer}>
            {tasksData?.map(
              (task, key) =>
                task.date === selectedDate && (
                  <View key={key} style={styles.taskContainer}>
                    <View style={styles.info}>
                      {isLoading && (
                        <ActivityIndicator
                          color={'white'}
                          style={styles.progress}
                        />
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
                          <Icon
                            name="list"
                            color={'white'}
                            style={styles.created}
                          />
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
                          <ActivityIndicator
                            color={'white'}
                            style={styles.delete}
                          />
                        ) : (
                          <TouchableOpacity
                            onPress={() =>
                              deleteTask(
                                task.$id,
                                setRefreshData,
                                setIsDeleteLoading,
                              )
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
        ) : (
          <ScrollView style={styles.container}>
            <View style={styles.emptyContent}>
              <Text style={[styles.text]}>You do not have any tasks yet.</Text>
              <View style={styles.button}>
                <Button
                  title="+  Create"
                  color={'rgb(108, 0, 255)'}
                  onPress={() => navigation.navigate('Create')}
                />
              </View>
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Manage;

const styles = StyleSheet.create({
  description: {
    marginLeft: 10,
    marginVertical: 5,
  },
  mainContainer: {
    height: '100%',
  },
  container: {
    margin: 20,
  },
  calendar: {
    elevation: 10,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    overflow: 'hidden',
  },
  title: {
    fontSize: 25,
    fontWeight: '500',
  },
  text: {
    color: 'black',
  },
  emptyContent: {
    alignItems: 'center',
    gap: 20,
    margin: 50,
  },

  button: {
    borderRadius: 20,
    overflow: 'hidden',
    elevation: 6,
    width: 100,
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
  // mainContainer: {
  //   paddingVertical: 20,
  //   paddingHorizontal: 10,
  // },
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

  // title: {
  //   fontSize: 25,
  //   fontWeight: 'bold',
  // },

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
  // emptyContent: {
  //   alignItems: 'center',
  //   gap: 20,
  //   marginTop: 100,
  // },

  // button: {
  //   borderRadius: 20,
  //   overflow: 'hidden',
  //   elevation: 10,
  //   width: 100,
  // },
  lightText: {
    color: 'white',
  },
  darkText: {
    color: 'black',
  },
});
