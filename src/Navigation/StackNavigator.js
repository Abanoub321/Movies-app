import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import TrendingScreenComponent from "../Screens/TrendingScreen";
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
      <Stack.Screen name="Trending Today" component={TrendingScreenComponent} />
    </Stack.Navigator>
  );
}



export { TrendingStackNavigator};