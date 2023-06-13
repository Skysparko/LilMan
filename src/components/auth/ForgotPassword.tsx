import {
  SafeAreaView,
  StyleSheet,
  Image,
  View,
  ScrollView,
  TextInput,
  Text,
  Button,
} from 'react-native';
import React, {useState} from 'react';
import mainImage from '../../assets/images/auth/forgot-password.png';
import {forgotPassword} from '../../appwrite/auth';

const ForgotPassword = () => {
  const [inputFocus, setInputFocus] = useState(false);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  return (
    <SafeAreaView style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.imageContainer}>
          <Text style={styles.title}>Forgot Password?</Text>
          <Image source={mainImage} style={styles.image} />
          <Text style={styles.description}>
            Don't worry, enter your email address to reset your password.
          </Text>
        </View>
        <View style={styles.form}>
          <TextInput
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            style={[styles.input, inputFocus && styles.inputFocused]}
            placeholder="Email"
            placeholderTextColor="#8a8a8a"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {isLoading ? (
            <View style={styles.button}>
              <Button title="Submitting..." />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                title="Submit"
                onPress={() => forgotPassword(email, setIsLoading)}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 30,
    padding: 10,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  description: {
    fontSize: 16,
  },
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
    flex: 1,
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
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    fontSize: 15,
    elevation: 3,
    color: 'black',
  },
  form: {
    gap: 25,
    margin: 40,
  },
});
