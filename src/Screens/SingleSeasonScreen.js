import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { LinkerComponent } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';

const SeasonScreen = ({ route, navigation }) => {
    const { id, seasonNo } = route.params;
    const [season, setSeason] = useState({});
    const [fetched, setFetched] = useState(false);

    useEffect( () => {
        setFetched(false);
        if (!fetched)
            fetchSeasonData();
        setFetched(true);
    })
    const fetchSeasonData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let seasonData = await response.json();
        setSeason(seasonData);
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
            <ScrollView>
                <View>
                    <Image source={{ uri: baseUrl + season.poster_path }} style={styles.posterImage} />
                </View>
                    <Text style={styles.movieTitle}>{season.name}</Text>
                <View style={styles.rowDetail}>
                    
                        <Text style={styles.detailsHeader}>Release Date: </Text>
                        <Text>{season.air_date}</Text>
                    
                </View>
                <View>
                    <Text style={styles.movieOverview}>{season.overview}</Text>
                </View>
                <View style={{ margin: 15 }}>
                    <Text style={styles.titleHeader} >Episodes</Text>
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

    movieTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        flexDirection: 'column',
        marginBottom: 15
    },
    posterImage: {
        width: 250,
        height: Math.round(Dimensions.get('screen').height) / 2.2,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 15,
        marginBottom:10,
    },
    movieOverview: {
        alignSelf: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 10,
        marginTop: 15,
        fontSize: 15,
        margin: 3,
    },
    rowDetail: {
        alignItems:'center',
        justifyContent: 'space-around',
        margin: 3,
    },
    detailsHeader: {
        color: 'blue',
        fontWeight: 'bold',
        marginRight: 3
    },
    titleHeader:{
        fontSize:20,
        alignItems:'flex-start',
        color:'green',
        marginBottom:15,
        fontWeight:'bold',

    },
})

export default SeasonScreen;