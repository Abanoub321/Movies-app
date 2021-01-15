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
import { LinkerComponent } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';
import { posterImage, Title, detailsHeader, centerdAboveDetail } from '../styles';

const EpisodeScreen = ({ route }) => {
    const { id, seasonNo, episodeNo, poster } = route.params;
    const [episode, setEpisode] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        setFetched(false);
        if (!fetched)
            fetchEpisodeData();
        setFetched(true);
    });
    const onRefresh = ()=>{
        setFetched(false);
    }
    const fetchEpisodeData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let episodeData = await response.json();
        setEpisode(episodeData);
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
                    <Image source={{ uri: baseUrl + (episode.still_path == null ? poster : episode.still_path) }} style={posterImage} />
                    <Text style={Title}>{episode.name}</Text>
                    <View style={centerdAboveDetail}>
                        <Text style={detailsHeader}>Release Date</Text>
                        <Text>{episode.air_date}</Text>
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={detailsHeader}>Crew : </Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={3}
                            horizontal={true}
                            data={episode.crew}
                            renderItem={({ item }) =>
                                <RenderItemAppearence
                                    item={{
                                        itemId: item.id,
                                        itemName: item.name,
                                        itemPoster: item.profile_path,
                                        itemType: 'person'
                                    }}
                                />
                            }
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={detailsHeader}>Guest Stars : </Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={3}
                            horizontal={true}
                            data={episode.crew}
                            renderItem={({ item }) =>
                                <RenderItemAppearence
                                    item={{
                                        itemId: item.id,
                                        itemName: item.name,
                                        itemPoster: item.profile_path,
                                        itemType: 'person'
                                    }}
                                />
                            }
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default EpisodeScreen;