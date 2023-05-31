import {
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';

import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../App';
import {account} from '../appwrite/config';
import DropdownMenu from './DropDown';
import Icon from 'react-native-vector-icons/Ionicons';

type HomeScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
};

type UserDataType = {
  $createdAt: string;
  $id: string;
  $updatedAt: string;
  email: string;
  emailVerification: boolean;
  name: string;
  passwordUpdate: string;
  phone: string;
  phoneVerification: boolean;
  prefs: object;
  registration: string;
  status: boolean;
};

const Home = ({navigation, setIsAuthenticated}: HomeScreenProps) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [isActivePage, setIsActivePage] = useState('My Task');
  const [isVisibleDropDown, setIsVisibleDropDown] = useState(false);
  const getUserData = async () => {
    setUser(await account.get());
  };

  useEffect(() => {
    getUserData();
  }, []);
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
          {isActivePage === 'My Task' && (
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
          )}
          {isActivePage === 'In-progress' && (
            <View style={styles.emptyContent}>
              <Text style={[styles.text]}>
                You do not have any in-progress tasks yet.
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
          {isActivePage === 'Completed' && (
            <View style={styles.emptyContent}>
              <Text style={[styles.text]}>
                You do not have any completed tasks yet.
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
