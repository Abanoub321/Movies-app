import React, { useEffect ,useState} from "react";
import { connect } from 'react-redux';
import { fetchTrendingData } from '../actions';
import { View, Text, FlatList, ScrollView, RefreshControl, ActivityIndicator } from "react-native";
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { Title } from '../styles'



const TrendingScreenComponent = (props) => {
  const {
    navigation,
    fetchTrendingData,
    trendingMovies,
    trendingPersons,
    trendingSeries,
    errors
  } = props;

  const [fetched,setFetched] = useState(false);

  useEffect(() => {
    if (!fetched)
      fetchTrendingData();
      setTimeout(   ()=>{
        if(errors == '')
           setFetched(true)
      }
      ,1000)
  
  }, [fetched])


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
      <View style={{ flex: 1, marginLeft: 20 }}>
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
                    previosState: ''
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
                    previosState: ''
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
                    previosState: ''
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


const mapStateToProps = state => {
  const { movies, tv, person ,errors} = state.Trending;
  return {
    trendingMovies: movies,
    trendingSeries: tv,
    trendingPersons: person,
    errors,
  }
}

export default connect(mapStateToProps, { fetchTrendingData })(TrendingScreenComponent);