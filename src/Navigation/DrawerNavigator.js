import React from "react";

import { createDrawerNavigator } from "@react-navigation/drawer";

import {TrendingStackNavigator} from './StackNavigator';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Trending" component={TrendingStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;