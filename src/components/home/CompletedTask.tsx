import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Models} from 'appwrite';

// import Icon from 'react-native-vector-icons/Ionicons';
import CatScrollMenu from '../CatScrollMenu';
import TaskCard from '../TaskCard';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  showMyTaskData: boolean | null;
  myTaskData: Models.Document[] | undefined;
  // setTasks: React.Dispatch<React.SetStateAction<Models.Document[] | undefined>>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const CompletedTask = ({
  navigation,
  showMyTaskData,
  myTaskData,
  // setTasks,
  setRefreshData,
}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    showMyTaskData !== null && setIsLoading(false);
    if (myTaskData?.length !== 0) {
      setSelectedCategory(
        myTaskData?.filter(task => task.category)[0].category,
      );
    }
  }, [showMyTaskData, myTaskData]);

  return (
    <View>
      {isLoading ? (
        <View>
          <Text>yo</Text>
        </View>
      ) : showMyTaskData ? (
        <View>
          <View>
            <Text style={[styles.text, styles.description]}>
              You can click on any category to get tasks.
            </Text>
          </View>
          <CatScrollMenu
            myTaskData={myTaskData}
            setSelectedCategory={setSelectedCategory}
          />
          <TaskCard
            myTaskData={myTaskData}
            // setTasks={setTasks}
            setRefreshData={setRefreshData}
            selectedCategory={selectedCategory}
          />
        </View>
      ) : (
        <View style={styles.emptyContent}>
          <Text style={[styles.darkText]}>
            You do not have any completed tasks .
          </Text>
          <View style={styles.button}>
            <Button
              title="+  Create"
              color={'rgb(108, 0, 255)'}
              onPress={() => navigation.navigate('Create')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

export default CompletedTask;

const styles = StyleSheet.create({
  text: {
    color: 'black',
  },

  description: {
    fontSize: 15,
    color: 'gray',
  },
  mainContainer: {
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  taskContainer: {
    padding: 10,
    borderWidth: 1,
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
