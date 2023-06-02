import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Button} from 'react-native';
// import {RootStackParamList} from '../App';
// import {NativeStackNavigationProp} from '@react-navigation/native-stack';
// type NotificationScreenProps = {
//   navigation: NativeStackNavigationProp<RootStackParamList, 'Notification'>;
// };
import PushNotification from 'react-native-push-notification';
const Notification = () => {
  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'my-channel-id', // Channel ID
        channelName: 'My Channel', // Channel name
        channelDescription: 'A channel to categorize notifications', // Channel description
      },
      created =>
        console.log(
          `Channel 'my-channel-id' ${created ? 'created' : 'already exists'}`,
        ),
    );
  }, []);
  return (
    <View>
      <View style={styles.emptyContent}>
        <Text style={[styles.text]}>
          You do not have any notifications yet.
        </Text>
        <Button
          title="send Noti"
          onPress={() =>
            PushNotification.localNotification({
              channelId: 'my-channel-id', // Channel ID
              title: 'Kya kar lega bhai tu',
              message: 'Bro Your Account is now hacked',
            })
          }
        />
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
