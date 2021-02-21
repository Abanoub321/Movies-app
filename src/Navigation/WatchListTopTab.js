import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import TvWatchList from '../Screens/TvWatchList';
import MoviesWatchList from '../Screens/MoviesWatchList';
const Tab = createMaterialTopTabNavigator();

const WatchListTopTab = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Movies' component={MoviesWatchList} />
            <Tab.Screen name='TV Series' component={TvWatchList} />
        </Tab.Navigator>
    )
}
export default WatchListTopTab;