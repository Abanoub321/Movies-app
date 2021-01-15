import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TrendingScreenComponent from "../Screens/TrendingScreen";
import MovieScreen from '../Screens/SingleMovieScreen';
import TvScreen from '../Screens/SingleTvScreen';
import SeasonScreen from '../Screens/SingleSeasonScreen';
import EpisodeScreen from '../Screens/SingleEpisodeScreen';
import PersonScreen from '../Screens/SinglePersonScreen';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#9AC4F8",

  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const TrendingStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Trending Today" component={TrendingScreenComponent}  />
      <Stack.Screen name="Movie" component={MovieScreen} />
      <Stack.Screen name= "Series" component={TvScreen} />
      <Stack.Screen name="Season" component={SeasonScreen}/>
      <Stack.Screen name= "Episode" component={EpisodeScreen}  />
      <Stack.Screen name= "Person" component={PersonScreen}  />
    </Stack.Navigator>
  );
}



export { TrendingStackNavigator};