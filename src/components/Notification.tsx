import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
// import {Button} from 'react-native';
// import {RootStackParamList} from '../App';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// type NotificationScreenProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Notification'>;
// };
const Notification = () => {
  return (
    <View>
      <View style={styles.emptyContent}>
        <Text style={[styles.text]}>
          You do not have any notifications yet.
        </Text>
      </View>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({
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
