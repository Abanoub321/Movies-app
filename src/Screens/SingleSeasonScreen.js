import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { apiKey, baseUrl } from '../../Env';
import { Title,titleHeader ,overView,rowDetail,detailsHeader} from '../styles';

const SeasonScreen = ({ route, navigation }) => {
    const { id, seasonNo } = route.params;
    const [season, setSeason] = useState({});
    const [fetched, setFetched] = useState(false);

    useEffect(() => {

        if (!fetched)
            fetchSeasonData();

    }, [fetched])
    const fetchSeasonData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let seasonData = await response.json();
        setSeason(seasonData);
        setFetched(true);
    }
    const onRefresh = ()=>{
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
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                }
            >
                <View>
                    <Image source={{ uri: baseUrl + season.poster_path }} style={styles.posterImage} />
                </View>
                <Text style={Title}>{season.name}</Text>
                <View style={rowDetail}>

                    <Text style={detailsHeader}>Release Date: </Text>
                    <Text>{season.air_date}</Text>

                </View>
                <View>
                    <Text style={overView}>{season.overview}</Text>
                </View>
                <View style={{ margin: 15 }}>
                    <Text style={titleHeader} >Episodes</Text>
                    <FlatList

                        initialNumToRender={3}
                        horizontal={true}
                        data={season.episodes}
                        renderItem={(item) =>
                            <RenderItemAppearence
                                item={{
                                    itemId: id,
                                    itemName: item.item.name,
                                    itemPoster: season.poster_path,
                                    itemSeason: item.item.season_number,
                                    itemEpisode: item.item.episode_number,
                                    itemType: 'episode'
                                }}
                                navigation={navigation}
                            />
                        }
                        keyExtractor={item => item.id.toString()}
                    />
                </View>
            </ScrollView>
        )
    }
}
const styles = StyleSheet.create({

    
    posterImage: {
        width: 250,
        height: Math.round(Dimensions.get('screen').height) / 2.2,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom: 10,
    },
    
    
   
    
})

export default SeasonScreen;