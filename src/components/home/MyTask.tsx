import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button} from 'react-native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {Models} from 'appwrite';
import LinearGradient from 'react-native-linear-gradient';
// import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  showMyTaskData: boolean | null;
  myTaskData: Models.Document[] | undefined;
};

const MyTask = ({navigation, showMyTaskData, myTaskData}: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    showMyTaskData !== null && setIsLoading(false);
  }, [showMyTaskData]);
  console.log(showMyTaskData);
  return (
    <View>
      {isLoading ? (
        <View>
          <Text>yo</Text>
        </View>
      ) : showMyTaskData ? (
        <View>
          <ScrollView horizontal>
            {myTaskData?.map((task, key) => (
              <LinearGradient
                key={key}
                colors={['#7512fc', '#6102e3']}
                style={styles.catScrollContainer}>
                <View style={styles.rightCircle}>
                  <Text style={styles.blendText}>o</Text>
                </View>
                <View style={styles.leftCircle}>
                  <Text style={styles.blendText}>o</Text>
                </View>
                <Text style={[styles.lightText, styles.title]}>
                  {task.category}
                </Text>
              </LinearGradient>
            ))}
          </ScrollView>
          <View style={styles.mainContainer}>
            <Text style={[styles.darkText, styles.title]}>Tasks</Text>

            {myTaskData?.map((task, key) => (
              <View key={key} style={styles.taskContainer}>
                <Text style={styles.darkText}>{task.name}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.emptyContent}>
          <Text style={[styles.darkText]}>You do not have any tasks yet.</Text>
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

export default MyTask;

const styles = StyleSheet.create({
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
