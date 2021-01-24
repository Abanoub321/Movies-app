import React,{useState} from "react";
import { View, TouchableOpacity, Image } from 'react-native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TrendingStackNavigator,DiscoverMoviesStack,DiscoverSeriesStack,DiscoverPeopleStack, LoginStack, ProfileStack } from './StackNavigator';
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
          style={{ width: 30, height: 30, marginLeft: 7 }}
        />
      </TouchableOpacity>
    </View>
  );
};

const DrawerNavigator = () => {
  const [user,setUser] = useState(null);
  const retrieveData = async () =>{
    try {
      const jsonValue = await AsyncStorage.getItem('session');
      if(jsonValue != null){
      //  console.log(jsonValue);
        setUser(JSON.parse(jsonValue));
      }
    } catch (error) {
      console.log(error)
    }
  }
  retrieveData();
  return (
    <Drawer.Navigator
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: { marginVertical: 5 },
        user:user
      }}
      drawerContent={(props) => <CustomSidebarMenu {...props}  />} initialRouteName='Trending'>
      
      {
      user == null? (
        <Drawer.Screen name="Login" component= {LoginStack}/>

      ):<Drawer.Screen name="Profile" component= {ProfileStack}/>
      }
      <Drawer.Screen name="Trending" component={TrendingStackNavigator} />
      <Drawer.Screen name="Discover Movies" component={DiscoverMoviesStack} />
      <Drawer.Screen name="Discover Series" component={DiscoverSeriesStack} />
      <Drawer.Screen name="Discover People" component={DiscoverPeopleStack} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigator;