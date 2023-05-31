import React from 'react';
import {View} from 'react-native';
//icons
import Icon from 'react-native-vector-icons/Ionicons';

type IconProps = {
  iconName: string;
  color: string;
  size: number;
};

const IconComponent = ({iconName, color, size}: IconProps) => {
  // Use the data prop in the child component
  return (
    <View>
      <Icon name={iconName} color={color} size={size} />
    </View>
  );
};

export default IconComponent;
