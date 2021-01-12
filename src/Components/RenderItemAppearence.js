import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { pure } from 'recompose';
//import {api_key} from 'react-native-dotenv';



const RenderItemAppearence = ({ item }) => {

  const onPress = () =>{
    console.log(item.itemName, item.itemId);
  }
  return (


    <TouchableOpacity onPress={onPress}>
      <Image 
        style = {styles.image}
        source ={{uri : 'https://image.tmdb.org/t/p/w500' + item.itemPoster}}
      />
      <Text style={styles.center}>
        {item.itemName}
      </Text>

    </TouchableOpacity>

  );
};


const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
  image:{
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius:15,
    marginBottom:10,
  }
});

export default pure(RenderItemAppearence) ;