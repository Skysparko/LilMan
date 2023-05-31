import {createDrawerNavigator} from '@react-navigation/drawer';
import Manage from './Manage';
import React from 'react';

import Create from './Create';

const Drawer = createDrawerNavigator();

function SideMenu() {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Create" component={Create} />
      <Drawer.Screen name="Manage" component={Manage} />
    </Drawer.Navigator>
  );
}

export default SideMenu;
