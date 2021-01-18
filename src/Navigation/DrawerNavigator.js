import React from "react";
import { View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";

import { TrendingStackNavigator } from './StackNavigator';
import CustomSidebarMenu from './CostomSideBarMenu';

const Drawer = createDrawerNavigator();

export const NavigationDrawerStructure = (props) => {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={toggleDrawer}>
        {/*Donute Button Image */}
        <Image
          source={{
            uri:
              'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png',
          }}
          style={{ width: 25, height: 25, marginLeft: 5 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />}>

      <Drawer.Screen name="Trending" component={TrendingStackNavigator} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;