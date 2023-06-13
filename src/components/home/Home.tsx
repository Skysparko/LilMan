import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

import DropdownMenu from '../DropDown';
import Icon from 'react-native-vector-icons/Ionicons';
import MyTask from './MyTask';

import {Models} from 'appwrite';
import {UserDataType} from '../../appwrite/types';
import ProgressTask from './ProgressTask';
import CompletedTask from './CompletedTask';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
  user: UserDataType | null;
  tasks: Models.Document[];
  totalTasks: number;
  setTasks: React.Dispatch<React.SetStateAction<Models.Document[] | undefined>>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const Home = ({
  setTasks,
  navigation,
  setIsAuthenticated,
  user,
  tasks,
  setRefreshData,
}: HomeScreenProps) => {
  const [isActivePage, setIsActivePage] = useState('My Task');
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
  //my Task
  const [showMyTaskData, setShowMyTaskData] = useState<boolean | null>(null);
  const [myTaskData, setMyTaskData] = useState<Models.Document[]>();

  const [inProgressTaskData, setInProgressTaskData] =
    useState<Models.Document[]>();

  const [completedTaskData, setCompletedTaskData] =
    useState<Models.Document[]>();
  console.log(tasks);
  useEffect(() => {
    myTaskData?.length === 0
      ? setShowMyTaskData(false)
      : setShowMyTaskData(true);
    setMyTaskData(tasks);
    setInProgressTaskData(tasks?.filter(task => task.status === 'progress'));
    setCompletedTaskData(tasks?.filter(task => task.status === 'completed'));
  }, [myTaskData, tasks, setTasks, setRefreshData]);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <Text style={[styles.text, styles.title]}>
                Hello {user?.name ? user.name : 'Guest'}!
              </Text>
              <Text style={[styles.text, styles.description]}>
                Have a nice day.
              </Text>
            </View>

            <View style={styles.user}>
              <TouchableOpacity>
                <Icon
                  name="person-circle"
                  color={'black'}
                  size={40}
                  onPress={() => {
                    setIsVisibleDropDown(true);
                    console.log('yo');
                  }}
                />
              </TouchableOpacity>

              <DropdownMenu
                setIsAuthenticated={setIsAuthenticated}
                isVisible={isVisibleDropDown}
                setIsVisible={setIsVisibleDropDown}
              />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={
                isActivePage === 'My Task'
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => setIsActivePage('My Task')}>
              <Text style={[styles.text]}>My Task</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isActivePage === 'In-progress'
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => setIsActivePage('In-progress')}>
              <Text style={[styles.text]}>In-progress</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={
                isActivePage === 'Completed'
                  ? styles.activeButton
                  : styles.inactiveButton
              }
              onPress={() => setIsActivePage('Completed')}>
              <Text style={[styles.text]}>Completed</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={[styles.text, styles.description]}>
              You can click on any category to get tasks.
            </Text>
          </View>
          {isActivePage === 'My Task' && (
            <MyTask
              navigation={navigation}
              showMyTaskData={showMyTaskData}
              myTaskData={myTaskData}
              setRefreshData={setRefreshData}
            />
          )}
          {isActivePage === 'In-progress' && (
            <ProgressTask
              navigation={navigation}
              showMyTaskData={inProgressTaskData?.length === 0 ? false : true}
              myTaskData={inProgressTaskData}
              setRefreshData={setRefreshData}
            />
          )}
          {isActivePage === 'Completed' && (
            <CompletedTask
              navigation={navigation}
              showMyTaskData={completedTaskData?.length === 0 ? false : true}
              myTaskData={completedTaskData}
              setRefreshData={setRefreshData}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  user: {
    paddingVertical: 5,
  },
  headerTitleContainer: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '500',
  },
  mainContainer: {
    height: '100%',
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 5,
  },
  activeButton: {
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
  },
  inactiveButton: {
    backgroundColor: '#E6E6FA',
    borderRadius: 30,
    padding: 10,
    paddingHorizontal: 20,
  },
  container: {
    marginHorizontal: 20,
    paddingVertical: 20,
    gap: 20,
  },
  text: {
    color: 'black',
  },
  title: {
    fontSize: 30,
    fontWeight: '500',
  },
  description: {
    fontSize: 15,
    color: 'gray',
  },
  header: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
