import React from "react";
import { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, SafeAreaView } from "react-native";
import RenderItemAppearence from '../Components/RenderItemAppearence';

import { apiKey } from '../../Env';
//import {api_key} from 'react-native-dotenv';



const TrendingScreenComponent = ({ navigation }) => {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    fetchTrendingData();
  })
  const fetchTrendingData = async () => {
    let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
    let response = await fetch(url);
    let movies = await response.json();

    url = `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}`;
    response = await fetch(url);
    let person = await response.json();

    url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
    response = await fetch(url);
    let series = await response.json();

    setTrendingMovies(movies.results);
    setTrendingPersons(person.results);
    setTrendingSeries(series.results);

  };

  const renderItem = (item) => {
    // console.log(item);
    return
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.center}>
          <Text style={styles.title}>Trending Movies</Text>
          <FlatList
          
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
              />
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Trending TV-Shows</Text>
          <FlatList
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
              />
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
        <View style={styles.center}>
          <Text style={styles.title}>Trending Persons</Text>
          <FlatList
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
              />
            }
            keyExtractor={item => item.id.toString()}
          />
        </View>
      </ScrollView>
    </View>
  );
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
    margin:15,
    marginRight:20
  }
});

export default TrendingScreenComponent;