import React from "react";
import { useState, useEffect } from "react";
import { View, Text, FlatList, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { apiKey } from '../../Env';
import { Title } from '../styles'



const TrendingScreenComponent = ({ navigation }) => {
  const [fetched, setFetched] = useState(false);
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [trendingPersons, setTrendingPersons] = useState([]);
  const [trendingSeries, setTrendingSeries] = useState([]);

  useEffect(() => {
    if (!fetched)
      fetchTrendingData();

  }, [fetched])
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
      <View style={{ flex: 1,marginLeft:20 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1 }}>
            <Text style={Title}>Trending Movies</Text>
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
                    itemType: item.item.media_type,
                    previosState:''
                  }}
                  navigation={navigation}
                />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View >
            <Text style={Title}>Trending TV-Shows</Text>
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
                    itemType: item.item.media_type,
                    previosState:''
                  }}
                  navigation={navigation}
                />
              }
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <View>
            <Text style={Title}>Trending Persons</Text>
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
                    itemType: item.item.media_type,
                    previosState:''
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




export default TrendingScreenComponent;