import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
  StyleSheet,
} from 'react-native';

type Props = {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropdownMenu = ({isVisible, setIsVisible}: Props) => {
  const handleOptionSelect = (option: string) => {
    // Perform actions based on the selected option
    console.log('Selected option:', option);
    // Hide the dropdown
    setIsVisible(false);
  };

  return (
    <View style={styles.container}>
      <Modal visible={isVisible} transparent={true} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsVisible(!isVisible)}>
          <View style={styles.overlay} />
        </TouchableWithoutFeedback>

        <View style={styles.dropdown}>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect('Option 1')}>
            <Text style={styles.optionText}>Option 1</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect('Option 2')}>
            <Text style={styles.optionText}>Option 2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => handleOptionSelect('Option 3')}>
            <Text style={styles.optionText}>Option 3</Text>
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
    padding: 10,
    elevation: 5,
  },
  option: {
    paddingVertical: 10,
  },
  optionText: {
    fontSize: 16,
    color: 'black',
  },
});

export default DropdownMenu;
