import {
  Button,
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';

import {guestLogin, loginUser} from '../../appwrite/auth';
import loginScreenImage from '../../assets/images/auth/login.png';
import {Text} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native';

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Login'>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const Login: React.FC<LoginScreenProps> = ({
  navigation,
  setIsAuthenticated,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFocus, setInputFocus] = useState({
    email: false,
    password: false,
  });

  const handleFocus = (inputName: string) => {
    setInputFocus(prevFocus => ({
      ...prevFocus,
      [inputName]: true,
    }));
  };

  const handleBlur = (inputName: string) => {
    setInputFocus(prevFocus => ({
      ...prevFocus,
      [inputName]: false,
    }));
  };
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <Image source={loginScreenImage} style={styles.image} />
        <View style={styles.form}>
          <TextInput
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            style={[styles.input, inputFocus.email && styles.inputFocused]}
            placeholder="Email"
            placeholderTextColor={'#8a8a8a'}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            // style={styles.input}
          />
          <TextInput
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            placeholder="Password"
            placeholderTextColor={'#8a8a8a'}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={[styles.input, inputFocus.password && styles.inputFocused]}
          />
          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPassword')}
            style={styles.forgetPasswordContainer}>
            <Text style={styles.LinkText}>Forgot Password?</Text>
          </TouchableOpacity>
          <View style={styles.button}>
            <Button
              title="Login"
              color={'rgb(108, 0, 255)'}
              onPress={() => loginUser({email, password}, setIsAuthenticated)}
            />
          </View>
        </View>
        <View style={styles.orContainer}>
          <LinearGradient
            colors={['white', 'black']}
            style={styles.lines}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
          />
          <Text>Or Login as</Text>
          <LinearGradient
            colors={['white', 'black']}
            style={styles.lines}
            start={{x: 1, y: 1}}
            end={{x: 0, y: 1}}
          />
        </View>
        <View style={styles.guestContainer}>
          <Button
            color={'rgb(0, 108, 255)'}
            title="Guest login"
            onPress={() => guestLogin(setIsAuthenticated)}
          />
        </View>
        <View style={styles.footer}>
          <Text>Not a member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.LinkText}>Register Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: 'rgb(24, 39, 157)',
  },
  inputFocused: {
    borderColor: 'blue',
    elevation: 5,
  },
  container: {
    marginVertical: 10,
  },
  image: {
    height: 250,
    width: 200,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 15,
    elevation: 3,
    color: 'black',
  },
  form: {
    gap: 20,
    marginHorizontal: 20,
    marginVertical: 20,
  },
  lines: {
    height: 0.5,
    width: 100,
    backgroundColor: 'black',
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  guestContainer: {
    marginHorizontal: 20,
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
    marginVertical: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
  forgetPasswordContainer: {
    alignItems: 'flex-end',
  },
  LinkText: {
    color: 'blue',
  },
});
