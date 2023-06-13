import {Image, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';

import mainImage from '../../assets/gif/4.gif';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Main'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const Main = ({navigation}: Props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <LinearGradient
        colors={['#954aff', '#6102e3']}
        style={styles.imageContainer}>
        <View style={styles.rightCircle}>
          <Text style={styles.blendText}>o</Text>
        </View>
        <View style={styles.leftCircle}>
          <Text style={styles.blendText}> o</Text>
        </View>
        <Image source={mainImage} style={styles.visualContent} />
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Your Personal Little Manager</Text>

        <Text style={styles.description}>
          Simplify your life. LilMan is your trusted companion in managing tasks
          and boosting productivity. Sign up or log in now.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#6102e3'}]}
            onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.buttonText, {color: 'white'}]}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Main;
const styles = StyleSheet.create({
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
    left: 0,
    borderTopRightRadius: 150,
    height: 150,
    width: 150,
    backgroundColor: '#5900d1',
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: '#bababa',
    padding: 10,
    paddingHorizontal: 30,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    textAlign: 'center',
    fontSize: 18,
  },
  mainContainer: {
    backgroundColor: '#5900d1',
    flex: 1,
  },
  container: {
    backgroundColor: 'white',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderTopLeftRadius: 30,
    paddingVertical: 80,
    borderTopRightRadius: 30,
  },
  imageContainer: {
    backgroundColor: '#954aff',

    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inActiveDot: {
    backgroundColor: 'gray',
  },
  activeDot: {
    backgroundColor: 'blue',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',

    color: 'black',
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 20,
    color: 'gray',
  },
  visualContent: {
    width: 350,
    height: 350,
  },
});
