import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';
import {logOutUser} from '../appwrite/auth';
import Icon from 'react-native-vector-icons/Ionicons';

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean | null>>;
};

const DropdownMenu = ({isVisible, setIsVisible, setIsAuthenticated}: Props) => {
  return (
    <View style={styles.container}>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.dropdown}>
          {/* <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect('Option 1')}>
            <Icon name="person-circle-outline" color={'black'} size={25} />
            <Text style={styles.optionText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect('Option 2')}>
            <Icon name="help-circle-outline" color={'black'} size={25} />
            <Text style={styles.optionText}>Help</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={styles.option}
            onPress={() => logOutUser(setIsAuthenticated)}>
            <Icon name="log-out-outline" color={'black'} size={23} />
            <Text style={styles.optionText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'rgb(108, 0, 255)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  dropdown: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    marginTop: 25,
    elevation: 5,
  },

  option: {
    flexDirection: 'row',
    gap: 5,

    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray',
    paddingRight: 40,
    paddingLeft: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default DropdownMenu;
