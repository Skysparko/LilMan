import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../App';
import {registerUser} from '../../appwrite/auth';
import registerScreenImage from '../../assets/images/auth/register.png';
import {Image, ScrollView} from 'react-native';

type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Register'>;
};

const Register: React.FC<RegisterScreenProps> = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [inputFocus, setInputFocus] = useState({
    name: false,
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
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={registerScreenImage} style={styles.image} />
        <View style={styles.form}>
          <TextInput
            onFocus={() => handleFocus('name')}
            onBlur={() => handleBlur('name')}
            style={[styles.input, inputFocus.name && styles.inputFocused]}
            placeholder="Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={'#8a8a8a'}
          />
          <TextInput
            onFocus={() => handleFocus('email')}
            onBlur={() => handleBlur('email')}
            style={[styles.input, inputFocus.email && styles.inputFocused]}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor={'#8a8a8a'}
          />
          <TextInput
            onFocus={() => handleFocus('password')}
            onBlur={() => handleBlur('password')}
            style={[styles.input, inputFocus.password && styles.inputFocused]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor={'#8a8a8a'}
          />
          <Text style={styles.text}>
            By Registering, you're agree to our Terms & Conditions and Privacy
            Policy.
          </Text>
          <View style={styles.button}>
            {isLoading ? (
              <Button title="Registering..." color={'rgb(108, 0, 255)'} />
            ) : (
              <Button
                title="Register"
                color={'rgb(108, 0, 255)'}
                onPress={() =>
                  registerUser(
                    {email, password, name},
                    navigation,
                    setIsLoading,
                  )
                }
              />
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <Text style={styles.textColor}>Already a member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.LinkText}>Login Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  text: {
    fontSize: 12,
    marginHorizontal: 15,
    color: 'black',
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    elevation: 5,
  },
  container: {
    flex: 1,
    gap: 20,
    justifyContent: 'center',
  },
  image: {
    height: 250,
    width: 250,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e6e6e6',
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 15,
    elevation: 3,
    color: 'black',
  },
  form: {
    marginHorizontal: 20,
    gap: 20,
  },
  inputFocused: {
    borderColor: 'blue',
    elevation: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 40,
  },
  LinkText: {
    color: 'blue',
  },
  textColor: {
    color: 'black',
  },
});
