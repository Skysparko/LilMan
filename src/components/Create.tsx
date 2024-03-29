import React, {useEffect, useState} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';
import {createTask} from '../appwrite/db';
import {getUserData} from '../appwrite/user';
import {UserDataType} from '../appwrite/types';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

type CreateScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Create'>;
  setRefreshData: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create = ({setRefreshData, navigation}: CreateScreenProps) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [date, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });
  const [endTime, setEndTime] = useState({
    hours: date.getHours(),
    minutes: date.getMinutes(),
  });
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getUserData(setUser);
  }, []);

  return (
    <SafeAreaView style={styles.mainContainer}>
      {/* Header */}
      <LinearGradient
        colors={['#7512fc', '#6102e3']}
        style={styles.upperContainer}>
        <Text style={[styles.lightText, styles.title]}>Create a task</Text>
        <View style={styles.rightCircle}>
          <Text style={styles.blendText}>o</Text>
        </View>
        <View style={styles.leftCircle}>
          <Text style={styles.blendText}> o</Text>
        </View>
        {/* Form */}
        <View style={styles.form}>
          <View>
            <Text style={styles.lightText}>Name</Text>
            <TextInput
              placeholder="Enter your task name"
              placeholderTextColor={'#cccccc'}
              value={name}
              onChangeText={setName}
              style={styles.input}
            />
          </View>
          <View>
            <Text style={styles.lightText}>Date</Text>
            <Text
              style={[styles.input, styles.fakeInput]}
              onPress={() => {
                setShowDateMenu(true);
                console.log('open');
              }}>
              {date.toISOString().split('T')[0]}
            </Text>
            {/* Date Picker */}
            {showDateMenu && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={(yo, data) => {
                  setShowDateMenu(false);
                  if (data !== undefined) {
                    setSelectedDate(data);
                  }
                }}
              />
            )}
          </View>
        </View>
      </LinearGradient>
      {/* Form Content */}
      <ScrollView contentContainerStyle={styles.lowerContainer}>
        {/* Time Container */}
        <View style={styles.timeContainer}>
          <View>
            <Text style={styles.darkText}>Start Time</Text>
            <Text
              style={[styles.title, styles.darkText, styles.fakeInput]}
              onPress={() => {
                setShowStartTime(true);
                console.log('open');
              }}>
              {startTime.hours + ' : ' + startTime.minutes}
            </Text>
            {/* Start Time Picker */}
            {showStartTime && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={(yo, data) => {
                  setShowStartTime(false);
                  setStartTime({
                    hours: data!?.getHours(),
                    minutes: data!?.getMinutes(),
                  });
                }}
              />
            )}
          </View>
          <View>
            <Text style={styles.darkText}>End Time</Text>
            <Text
              style={[styles.title, styles.darkText, styles.fakeInput]}
              onPress={() => {
                setShowEndTime(true);
                console.log('open');
              }}>
              {endTime.hours + ' : ' + endTime.minutes}
            </Text>
            {/* End Time Picker */}
            {showEndTime && (
              <DateTimePicker
                value={date}
                mode="time"
                display="default"
                onChange={(yo, data) => {
                  setShowEndTime(false);
                  setEndTime({
                    hours: data!?.getHours(),
                    minutes: data!?.getMinutes(),
                  });
                }}
              />
            )}
          </View>
        </View>
        {/* Description */}
        <View style={styles.description}>
          <Text style={styles.darkText}>Description</Text>
          <TextInput
            placeholder="Enter your task description"
            placeholderTextColor={'gray'}
            multiline
            textAlignVertical="top"
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
            style={[styles.input, styles.darkText]}
          />
        </View>
        {/* Category */}
        <View style={styles.category}>
          <Text style={styles.darkText}>Category</Text>
          <TextInput
            placeholder="Enter your task category"
            placeholderTextColor={'gray'}
            value={category}
            onChangeText={setCategory}
            style={[styles.input, styles.darkText]}
          />
        </View>
        {/* Create Task Button */}
        <View style={styles.button}>
          {isLoading ? (
            <Button title="Creating..." color={'rgb(108, 0, 255)'} />
          ) : (
            <Button
              title="Create Task"
              color={'rgb(108, 0, 255)'}
              onPress={() => {
                createTask(
                  {
                    name,
                    description,
                    category,
                    date: date.toISOString().split('T')[0],
                    endTime: endTime.hours + ' : ' + endTime.minutes,
                    startTime: startTime.hours + ' : ' + startTime.minutes,
                    userID: user?.$id!,
                    status: 'created',
                  },
                  setRefreshData,
                  setIsLoading,
                  navigation,
                );
              }}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  gap: {
    borderWidth: 1,

    flex: 1,
    alignContent: 'space-between',
    justifyContent: 'space-around',
  },
  fakeInput: {
    paddingVertical: 10,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    width: 150,
  },
  category: {
    marginBottom: 20,
  },
  description: {
    marginVertical: 20,
  },
  timeContainer: {
    flexDirection: 'row',

    gap: 100,
    borderBottomWidth: 1,
    borderColor: 'gray',
  },
  rightCircle: {
    position: 'absolute',
    right: 0,
    top: 0,
    borderBottomLeftRadius: 150,
    height: 150,
    width: 150,
    backgroundColor: '#5900d1',
  },
  blendText: {
    color: '#5900d1',
  },
  leftCircle: {
    position: 'absolute',
    bottom: 0,

    borderTopRightRadius: 150,
    height: 150,
    width: 150,
    backgroundColor: '#5900d1',
  },
  mainContainer: {
    backgroundColor: '#6102e3',
    flex: 1,

    // paddingTop: 10,
  },
  form: {
    gap: 20,
    marginVertical: 20,
  },
  lowerContainer: {
    backgroundColor: 'white',
    flexGrow: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 40,

    justifyContent: 'space-between',
  },
  upperContainer: {
    paddingHorizontal: 40,
    paddingVertical: 20,
    alignContent: 'space-between',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    zIndex: 1,
  },
  darkText: {
    color: 'black',
  },
  lightText: {
    color: 'white',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#969696',

    fontSize: 20,

    color: 'white',
  },
});
