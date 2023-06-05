import {Image, StyleSheet, Text, View} from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import React, {useEffect} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import first from '../assets/gif/1.gif';
import second from '../assets/gif/2.gif';
import third from '../assets/gif/3.gif';

import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  setShowIntro: React.Dispatch<React.SetStateAction<boolean>>;
};

const IntroScreen = ({setShowIntro}: Props) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  const markIntroAsShown = async () => {
    try {
      await AsyncStorage.setItem('introShown', 'true');
      setShowIntro(false);
    } catch (error) {
      console.log(error);
      // Handle error
    }
  };
  const pages = [
    {
      title: 'Boost Your Productivity',
      description:
        'Take control of your tasks and stay organized with LilMan. Manage your daily tasks, prioritize goals, and maximize productivity.',
      image: first,
      backgroundColor: '#5a00c2',
    },
    {
      title: 'Effortless Task Management',
      description:
        'Say goodbye to chaos. LilMan helps you break down goals, set reminders, and track progress effortlessly.',
      image: second,
      backgroundColor: '#a35ef7',
    },
    {
      title: 'Stay on Top of Your Schedule',
      description:
        'Never miss a deadline. Manage your schedule, set reminders, and optimize your time with LilMan.',
      image: third,
      backgroundColor: '#7f45d1',
    },
  ];

  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-forward" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderPrevButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="arrow-back" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon name="md-checkmark" color="rgba(255, 255, 255, .9)" size={24} />
      </View>
    );
  };

  return (
    <AppIntroSlider
      data={pages}
      renderItem={({item}) => (
        <View
          style={[styles.container, {backgroundColor: item.backgroundColor}]}>
          {/* <FastImage
            source={item.image}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
          <Text style={styles.title}>{item.title}</Text>
          <Image source={item.image} style={styles.visualContent} />

          <Text style={styles.description}>{item.description}</Text>
        </View>
      )}
      showNextButton={true}
      showPrevButton={true}
      showSkipButton={true}
      dotStyle={styles.inActiveDot}
      activeDotStyle={styles.activeDot}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      renderPrevButton={renderPrevButton}
      onDone={markIntroAsShown}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 80,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginBottom: 10,
  },
  description: {
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  visualContent: {
    width: 350,
    height: 350,
  },
});

export default IntroScreen;
