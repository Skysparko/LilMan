import {SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
// import DateTimePicker from '@react-native-community/datetimepicker';
const Create = () => {
  const [taskName, setTaskName] = useState('');
  // const [selectedDate, setSelectedDate] = useState(new Date());
  return (
    <SafeAreaView>
      <View style={styles.upperContainer}>
        <Text style={[styles.text, styles.title]}>Create a task</Text>
        <TextInput
          placeholder="Enter your task name"
          placeholderTextColor={'#8a8a8a'}
          value={taskName}
          onChangeText={setTaskName}
          secureTextEntry
        />

        {/* <DateTimePicker
          value={selectedDate}
          mode="datetime"
          display="default"
          onChange={(yo, date) => setSelectedDate(date!)}
        /> */}
      </View>

      {/* <ScrollView style={styles.lowerContainer}></ScrollView> */}
    </SafeAreaView>
  );
};

export default Create;

const styles = StyleSheet.create({
  upperContainer: {},
  title: {
    fontSize: 25,
  },
  text: {
    color: 'black',
  },
});
