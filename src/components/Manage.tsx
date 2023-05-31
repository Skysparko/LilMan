import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Calendar} from 'react-native-calendars';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView, Button} from 'react-native';
import {RootStackParamList} from '../App';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
type ManageScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Manage'>;
};
const Manage = ({navigation}: ManageScreenProps) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <Calendar
        style={styles.calendar}
        markedDates={{
          '2023-05-01': {selected: true, marked: true, selectedColor: 'blue'},
          '2023-05-02': {marked: true},
          '2023-05-03': {selected: true, marked: true, selectedColor: 'blue'},
        }}
      />
      <View style={styles.container}>
        <Text style={[styles.title, styles.text]}>Tasks</Text>
      </View>
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
    </SafeAreaView>
  );
};

export default Manage;

const styles = StyleSheet.create({
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
});
