import React from "react";
import { View, Text, StyleSheet } from "react-native";
//import {api_key} from 'react-native-dotenv';



const SeriesItem = ({item}) => {
  
  //console.log(item);
  return (
    <View>
      <Text>
        {item.item.name}
      </Text>
    </View>
  );
};

/*<Button
  title="Go to About Screen"
  onPress={() => navigation.navigate("About")} 
/>
*/
const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
});

export default SeriesItem;