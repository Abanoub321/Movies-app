import React, { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { fetchTrendingData, onPageRefersh } from '../actions';
import { View, Text, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import HorizontalItemsFlatList from '../Components/HorizontalItemsFlatList';
import { Title } from '../styles'
import { onHomeRefresh } from "../actions/constStrings";



const TrendingScreenComponent = (props) => {
  const {
    navigation,
    fetchTrendingData,
    trendingMovies,
    trendingPersons,
    trendingSeries,
    errors,
    fetched,
    onPageRefersh
  } = props;

  useEffect(() => {
    if (!fetched)
      fetchTrendingData();
    if(errors!=''){
      console.log(errors)
    }

  }, [fetched,errors])


  const onRefresh = () => {
    onPageRefersh(onHomeRefresh, false);
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
      <View style={{ flex: 1, marginLeft: 20 }}>
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
          }
        >
          <View style={{ flex: 1 }}>
            <Text style={Title}>Trending Movies</Text>
            <HorizontalItemsFlatList navigation={navigation} items={trendingMovies} />
          </View>
          <View >
            <Text style={Title}>Trending TV-Shows</Text>
            <HorizontalItemsFlatList navigation={navigation} items={trendingSeries} />
          </View>
          <View>
            <Text style={Title}>Trending Persons</Text>
            <HorizontalItemsFlatList navigation={navigation} items={trendingPersons} />
          </View>
        </ScrollView>
      </View>
    );
  }
};


const mapStateToProps = state => {
  const { movies, tv, person, errors, fetched } = state.Trending;
  return {
    trendingMovies: movies,
    trendingSeries: tv,
    trendingPersons: person,
    errors,
    fetched
  }
}

export default connect(mapStateToProps, { fetchTrendingData, onPageRefersh })(TrendingScreenComponent);