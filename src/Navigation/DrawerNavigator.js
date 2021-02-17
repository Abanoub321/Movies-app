import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';

import { TrendingStackNavigator, DiscoverMoviesStack, DiscoverSeriesStack, DiscoverPeopleStack, LoginStack, ProfileStack ,WatchListStackNavigator} from './StackNavigator';
import CustomSidebarMenu from './CostomSideBarMenu';
import * as actions from '../actions';

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
          style={{ width: 30, height: 30, marginLeft: 7 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = (props) => {

  const { user } = props;
  props.retriveUserData();
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 }
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props} />} initialRouteName='Trending'>

      {
        user.name == '' ? (<Drawer.Screen name="Login" component={LoginStack} />) : (<Drawer.Screen name="Profile" component={ProfileStack} />)
      }
      <Drawer.Screen name="Trending" component={TrendingStackNavigator} />
      <Drawer.Screen name="Discover Movies" component={DiscoverMoviesStack} />
      <Drawer.Screen name="Discover Series" component={DiscoverSeriesStack} />
      <Drawer.Screen name="Discover People" component={DiscoverPeopleStack} />
      {
        user.type == 'user' ? (
          <Drawer.Screen name='WatchList' component={WatchListStackNavigator} />
        ) : null
      }
    </Drawer.Navigator>
  );
}
const mapStateToProps = state => {
  return {
    user: state.user
  }
}
export default connect(mapStateToProps, actions)(DrawerNavigator);