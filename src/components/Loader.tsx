import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {Text} from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Text>
        <ActivityIndicator color={'purple'} size={100} />;
      </Text>
    </View>
  );
};

export default Loader;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});
