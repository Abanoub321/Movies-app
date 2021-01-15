import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { apiKey } from '../../Env';
//import {api_key} from 'react-native-dotenv';



const TrendingScreenComponent = ({ navigation }) => {
  const [fetched, setFetched] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    if (!fetched)
      fetchTrendingData();
   
  },[fetched])
  const fetchTrendingData = async () => {
    let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    await fetch(url)
      .then(response => response.json())
      .then((response) => {
        setTrendingMovies(response.results);
      })
      .catch(err => {
        console.log(err);
      });
    url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
    await fetch(url)
      .then(response => response.json())
      .then((response) => {
        //  console.log(response);
        setTrendingSeries(response.results);
      })
      .catch(err => {
        console.log(err);
      });
    url = `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}`;
    await fetch(url)
      .then(response => response.json())
      .then((response) => {
        setTrendingPersons(response.results);
      })
      .catch(err => {
        console.log(err);
      });
      setFetched(true);
  };
  const onRefresh = () => {
    setFetched(false);
  }

  if (!fetched) {
    return (
      <View>
        <ActivityIndicator size="large" color='#0000ff' />
      </View>
    )
  }
  else {

    return (
      <View style={{ flex: 1 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
          }
        >
          <View style={styles.center}>
            <Text style={styles.title}>Trending Movies</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              initialNumToRender={3}
              horizontal={true}
              data={trendingMovies}
              renderItem={(item) =>
                <RenderItemAppearence
                  item={{
                    itemId: item.item.id,
                    itemName: item.item.original_title,
                    itemPoster: item.item.poster_path,
                    itemType: item.item.media_type
                  }}
                  navigation={navigation}
                />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Trending TV-Shows</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              initialNumToRender={3}
              horizontal={true}
              data={trendingSeries}
              renderItem={(item) =>
                <RenderItemAppearence
                  item={{
                    itemId: item.item.id,
                    itemName: item.item.name,
                    itemPoster: item.item.poster_path,
                    itemType: item.item.media_type
                  }}
                  navigation={navigation}
                />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View style={styles.center}>
            <Text style={styles.title}>Trending Persons</Text>
            <FlatList
              showsHorizontalScrollIndicator={false}
              initialNumToRender={3}
              horizontal={true}
              data={trendingPersons}
              renderItem={(item) =>
                <RenderItemAppearence
                  item={{
                    itemId: item.item.id,
                    itemName: item.item.name,
                    itemPoster: item.item.profile_path,
                    itemType: item.item.media_type
                  }}
                  navigation={navigation}
                />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
};


const styles = StyleSheet.create({
  center: {
    flex: 1,

  },
  title: {
    flex: 1,
    justifyContent: "flex-start",
    fontWeight: "bold",
    fontSize: 20,
    margin: 15,
    marginRight: 20
  }
});

export default TrendingScreenComponent;