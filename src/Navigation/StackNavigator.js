import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationDrawerStructure } from './DrawerNavigator';
import TrendingScreenComponent from "../Screens/TrendingScreen";
import MovieScreen from '../Screens/SingleMovieScreen';
import TvScreen from '../Screens/SingleTvScreen';
import SeasonScreen from '../Screens/SingleSeasonScreen';
import EpisodeScreen from '../Screens/SingleEpisodeScreen';
import PersonScreen from '../Screens/SinglePersonScreen';
import DiscoverMovies from '../Screens/DiscoverMovieScreen';
import DiscoverSeries from '../Screens/DiscoverSeriesScreen';
import DiscoverPeople from '../Screens/DiscoverPeopleScreen';
import LoginScreen from '../Screens/loginScreen';
import ProfileScreen from '../Screens/ProfileScreen';
import FavoriteComponent from "../Components/FavoriteComponent";
import WatchListTopTab from './WatchListTopTab';
const Stack = createStackNavigator();

const screenOptionStyle = {
  headerStyle: {
    backgroundColor: "#f4511e",

  },
  headerTintColor: "white",
  headerBackTitle: "Back",
};

const TrendingStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Trending Today" component={TrendingScreenComponent} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }}

      />
      <Stack.Screen name="Movie"

        options={{
          

          headerRight: () => (
            <FavoriteComponent type='movie' />
          )
          


        }}
        
        component={MovieScreen} />
      <Stack.Screen name="Series"
        options={{
          headerRight: () => (
            <FavoriteComponent type='tv' />
          )


        }}
        component={TvScreen} />
      <Stack.Screen name="Season" component={SeasonScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
}

const DiscoverMoviesStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Discover Movie" component={DiscoverMovies} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }} />
      <Stack.Screen name="Movie"
        options={{


          headerRight: () => (
            <FavoriteComponent type='movie' />
          )


        }}
        component={MovieScreen} />
      <Stack.Screen name="Series"
        options={{
          headerRight: () => (
            <FavoriteComponent type='tv' />
          )


        }}
        component={TvScreen} />
      <Stack.Screen name="Season" component={SeasonScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
}

const DiscoverSeriesStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Discover Series" component={DiscoverSeries} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },

      }}

      />
      <Stack.Screen name="Series"
        options={{
          headerRight: () => (
            <FavoriteComponent type='tv' />
          )


        }}
        component={TvScreen} />
      <Stack.Screen name="Movie"
        options={{


          headerRight: () => (
            <FavoriteComponent type='movie' />
          )


        }}
        component={MovieScreen} />
      <Stack.Screen name="Season" component={SeasonScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
}


const DiscoverPeopleStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Discover People" component={DiscoverPeople} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }} />
      <Stack.Screen name="Series"

        options={{
          headerRight: () => (
            <FavoriteComponent type='tv' />
          )


        }}
        component={TvScreen} />
      <Stack.Screen name="Movie"
        options={{


          headerRight: () => (
            <FavoriteComponent type='movie' />
          )


        }}
        component={MovieScreen} />
      <Stack.Screen name="Season" component={SeasonScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
}

const LoginStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Discover People" component={LoginScreen} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />

        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }} />
    </Stack.Navigator>
  );
}
const ProfileStack = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="Profile" component={ProfileScreen} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }} />
    </Stack.Navigator>
  );
}

const WatchListStackNavigator = ({ navigation }) => {
  return (
    <Stack.Navigator screenOptions={screenOptionStyle}>
      <Stack.Screen name="WatchList" component={WatchListTopTab} options={{

        headerLeft: () => (
          <NavigationDrawerStructure
            navigationProps={navigation}
          />
        ),
        headerStyle: {
          backgroundColor: '#f4511e', //Set Header color
        },
        headerTintColor: '#fff', //Set Header text color
        headerTitleStyle: {
          fontWeight: 'bold', //Set Header text style
        },
      }} />
      <Stack.Screen name="Series"

        options={{
          headerRight: () => (
            <FavoriteComponent type='tv' />
          )


        }}
        component={TvScreen} />
      <Stack.Screen name="Movie"
        options={{
          headerRight: () => (
            <FavoriteComponent type='movie' />
          )
        }}
        component={MovieScreen} />
      <Stack.Screen name="Season" component={SeasonScreen} />
      <Stack.Screen name="Episode" component={EpisodeScreen} />
      <Stack.Screen name="Person" component={PersonScreen} />
    </Stack.Navigator>
  );
}
export { TrendingStackNavigator, DiscoverMoviesStack, DiscoverSeriesStack, DiscoverPeopleStack, LoginStack, ProfileStack, WatchListStackNavigator };