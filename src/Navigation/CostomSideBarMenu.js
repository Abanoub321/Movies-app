import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  //console.log(props.user);

  return (
    <SafeAreaView style={{flex: 1}}>
      <Image
        source={{uri: 
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Pnt1rnG5_oeghvwAVvVBhcLrR5yZRqLRFw&usqp=CAU'
      
      }}
        style={styles.sideMenuProfileIcon}
      />
      {
        props.user? <Text style={{alignSelf:'center'}}>{props.user.name}</Text>:null
      }
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;