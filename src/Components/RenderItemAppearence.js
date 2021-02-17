import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { pure } from 'recompose';
import { baseUrl } from '../../Env';



const RenderItemAppearence = ({ item, navigation }) => {

  const onPress = () => {
    if (item.itemType == "movie" && item.itemType != item.previosState) {
     
      navigation.navigate('Movie', {
        id: item.itemId,
        name: item.itemName
      });
    } else if (item.itemType == "tv" && item.itemType != item.previosState) {

      navigation.navigate('Series', {
        id: item.itemId,
        name: item.itemName
      })
    }
    else if (item.itemType == "season" && item.itemType != item.previosState) {

      navigation.navigate('Season', {
        id: item.itemId,
        seasonNo: item.itemSeason,
        name: item.itemName
      })
    }
    else if (item.itemType == 'episode' && item.itemType != item.previosState) {

      navigation.navigate('Episode', {
        id: item.itemId,
        seasonNo: item.itemSeason,
        episodeNo: item.itemEpisode,
        name: item.itemName
      })
    }
    else if (item.itemType == "person" && item.itemType != item.previosState) {

      navigation.navigate('Person', {
        id: item.itemId,
        poster: item.itemPoster,
        name: item.itemName
      })
    }
    else if (item.itemType == item.previosState) {
      if (item.itemType == 'movie') {
  
        navigation.push('Movie', {
          id: item.itemId,
          name: item.itemName
        });
      }
      else if (item.itemType == "tv") {

        navigation.push('Series', {
          id: item.itemId,
          name: item.itemName
        })
      }
      else if (item.itemType == "season" ) {

        navigation.push('Season', {
          id: item.itemId,
          seasonNo: item.itemSeason,
          name: item.itemName
        })
      }
      else if (item.itemType == 'episode' ) {

        navigation.push('Episode', {
          id: item.itemId,
          seasonNo: item.itemSeason,
          episodeNo: item.itemEpisode,
          name: item.itemName
        })
      }
      else if (item.itemType == "person" ) {

        navigation.push('Person', {
          id: item.itemId,
          poster: item.itemPoster,
          name: item.itemName
        })
      }
    }
    //console.log(item.itemName, item.itemId);
  }

  const renderImage = () => {
    if (!item.itemPoster) {
      return (
        <Image style={[styles.image,{width:250}]}
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


    <TouchableOpacity onPress={onPress} style={{flex:1/2}}>
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
    alignSelf: 'center',
    textAlign: "center",
    flexWrap: 'wrap',
    maxWidth: 200,
    marginBottom:10
  },
  image: {
    width: 175,
    height: 250,
    resizeMode: 'stretch',
    borderRadius: 15,
    marginRight:20,
    marginBottom: 10,
  }
});

export default pure(RenderItemAppearence);