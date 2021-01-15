import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { pure } from 'recompose';
import { baseUrl } from '../../Env';
//import {api_key} from 'react-native-dotenv';



const RenderItemAppearence = ({ item, navigation }) => {

  const onPress = () => {
    if (item.itemType == "movie") {
      navigation.navigate('Movie', {
        id: item.itemId,
        name: item.itemName
      });
    } else if (item.itemType == "tv") {
      navigation.navigate('Series', {
        id: item.itemId,
        name: item.itemName
      })
    }
    else if (item.itemType == "season") {

      navigation.navigate('Season', {
        id: item.itemId,
        seasonNo: item.itemSeason,
        name: item.itemName
      })
    }
    else if (item.itemType == 'episode') {

      navigation.navigate('Episode', {
        id: item.itemId,
        seasonNo: item.itemSeason,
        episodeNo: item.itemEpisode,
        name: item.itemName
      })
    }
    else if (item.itemType == "person") {

      navigation.navigate('Person', {
        id: item.itemId,
        poster: item.itemPoster,
        name: item.itemName
      })
    }
    //console.log(item.itemName, item.itemId);
  }

  const renderImage = () => {
    if (!item.itemPoster) {
      return (
        <Image style={styles.image}
          source={{ uri: 'https://www.pngkey.com/png/full/21-213224_unknown-person-icon-png-download.png' }}
        />
      );
    } else {
      return (
        <Image
          style={styles.image}
          source={{ uri: baseUrl + item.itemPoster }}
        />
      );
    }
  }
  return (


    <TouchableOpacity onPress={onPress}>
      <View>
        {
          renderImage()
        }

        <Text style={styles.center}>
          {item.itemName}
        </Text>

      </View>
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
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    borderRadius: 15,
    marginBottom: 10,
  }
});

export default pure(RenderItemAppearence);