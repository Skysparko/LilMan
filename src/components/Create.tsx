import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import LinearGradient from 'react-native-linear-gradient';

const Create = () => {
  const [taskName, setTaskName] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [startTime, setStartTime] = useState({
    hours: selectedDate.getHours(),
    minutes: selectedDate.getMinutes(),
  });
  const [endTime, setEndTime] = useState({
    hours: selectedDate.getHours(),
    minutes: selectedDate.getMinutes(),
  });
  const [showDateMenu, setShowDateMenu] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndTime] = useState(false);
  console.log(showDateMenu);
  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView>
        <LinearGradient colors={['#7512fc', '#6102e3']}>
          <View style={styles.upperContainer}>
            <Text style={[styles.lightText, styles.title]}>Create a task</Text>
            <View style={styles.rightCircle}>
              <Text style={styles.blendText}>o</Text>
            </View>
            <View style={styles.leftCircle}>
              <Text style={styles.blendText}> o</Text>
            </View>
            <View style={styles.form}>
              <View>
                <Text style={styles.lightText}>Name</Text>
                <TextInput
                  placeholder="Enter your task name"
                  placeholderTextColor={'#cccccc'}
                  value={taskName}
                  onChangeText={setTaskName}
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
                  {selectedDate.toLocaleDateString()}
                </Text>

                {showDateMenu ? (
                  <DateTimePicker
                    value={selectedDate}
                    mode="date"
                    display="default"
                    onChange={(yo, date) => {
                      setShowDateMenu(false);
                      if (date !== undefined) {
                        setSelectedDate(date);
                      }
                    }}
                  />
                ) : null}
              </View>
            </View>
          </View>
        </LinearGradient>
        <View style={styles.lowerContainer}>
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

              {showStartTime ? (
                <DateTimePicker
                  value={selectedDate}
                  mode="time"
                  display="default"
                  onChange={(yo, date) => {
                    setShowStartTime(false);
                    setStartTime({
                      hours: date!?.getHours(),
                      minutes: date!?.getMinutes(),
                    });
                  }}
                />
              ) : null}
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

              {showEndTime && (
                <DateTimePicker
                  value={selectedDate}
                  mode="time"
                  display="default"
                  onChange={(yo, date) => {
                    setShowEndTime(false);
                    setEndTime({
                      hours: date!?.getHours(),
                      minutes: date!?.getMinutes(),
                    });
                  }}
                />
              )}
            </View>
          </View>
          <View style={styles.description}>
            <Text style={styles.darkText}>Description</Text>
            <TextInput
              placeholder="Enter your task description"
              placeholderTextColor={'gray'}
              multiline
              textAlignVertical="top"
              numberOfLines={3}
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={[styles.input, styles.darkText]}
            />
          </View>
          <View style={styles.category}>
            <Text style={styles.darkText}>Category</Text>
            <TextInput
              placeholder="Enter your task category"
              placeholderTextColor={'gray'}
              value={taskDescription}
              onChangeText={setTaskDescription}
              style={[styles.input, styles.darkText]}
            />
          </View>
          <View style={styles.button}>
            <Button title="Create Task" color={'rgb(108, 0, 255)'} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  fakeInput: {
    paddingVertical: 10,
  },
  button: {
    alignSelf: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 10,
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
    color: 'rgb(108, 0, 255)',
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
    // paddingTop: 10,
  },
  form: {
    gap: 20,
    marginVertical: 20,
  },
  lowerContainer: {
    backgroundColor: 'white',
    height: '100%',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingHorizontal: 40,
    paddingVertical: 20,
  },
  upperContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
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
