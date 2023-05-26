import {Button, ScrollView, StyleSheet, Text} from 'react-native';
import React from 'react';
import {logOutUser} from '../appwrite/auth';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
};
const Home = ({setIsAuthenticated}: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      <Text>Yo</Text>
      <Button title="Logout" onPress={() => logOutUser(setIsAuthenticated)} />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {},
});
