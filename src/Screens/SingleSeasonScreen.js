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
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { RenderExternalIDS } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';
import { Title, overView, rowDetail, detailsHeader, buttons, centerdAboveDetail , buttonText} from '../styles';

const SeasonScreen = ({ route, navigation }) => {
    const { id, seasonNo } = route.params;
    const [season, setSeason] = useState({});
    const [fetched, setFetched] = useState(false);
    const [cast, setCast] = useState([]);
    const [images, setImages] = useState([]);
    const [externalIds, setExternalIds] = useState({});
    const [videos, setVideos] = useState([]);
    const [episodeBPressed, setEpisodeBPressed] = useState(false);
    const [castBPressed, setCastBPressed] = useState(false);
    const [imageBPressed, setImageBPressed] = useState(false)

    useEffect(() => {

        if (!fetched)
            fetchSeasonData();

    }, [fetched])
    const fetchSeasonData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let seasonData = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/credits?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonCredits = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonImages = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/external_ids?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonExternalIds = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonVideos = await response.json();

        setSeason(seasonData);
        setCast(seasonCredits.cast)
        setImages(seasonImages.posters);
        setExternalIds(seasonExternalIds);
        setVideos(seasonVideos.results);
        setFetched(true);
    }
    const onRefresh = () => {
        setFetched(false);
    }

    const setFalse = () => {
        setEpisodeBPressed(false);
        setCastBPressed(false);
        setImageBPressed(false);
    }
    const episodePressed = () => {
        setFalse();
        setEpisodeBPressed(!episodeBPressed);
    }

    const castPressed = () => {
        setFalse();
        setCastBPressed(!castBPressed);
    }
    const imagePressed = () => {
        setFalse();
        setImageBPressed(!imageBPressed);
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
                <View style={centerdAboveDetail}>
                    
                    <Text style={detailsHeader}>Release Date: </Text>
                    <Text>{season.air_date}</Text>

                </View>
                <View>
                    <Text style={overView}>{season.overview}</Text>
                </View>
                <View style={[rowDetail, { marginTop: 15, marginBottom: 15, flexWrap: 'wrap' }]}>

                    <TouchableOpacity onPress={episodePressed} style={buttons}>
                        <Text style={buttonText}>Episodes</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={castPressed} style={buttons}>
                        <Text style={buttonText}>Cast</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={imagePressed} style={buttons}>
                        <Text style={buttonText}>Images</Text>
                    </TouchableOpacity>

                </View>
                {
                    episodeBPressed ? (
                        season.episodes ? (
                            <View style={{ margin: 15 }}>
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
                                                itemType: 'episode',
                                                previosState: 'episode'
                                            }}
                                            navigation={navigation}
                                        />
                                    }
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>
                        ) : (
                                <View style={{ margin: 15 }}>
                                    <Text>Sorry there is nothing to view</Text>
                                </View>
                            )
                    ) : null
                }
                {
                    castBPressed ? (
                        cast ? (
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={3}
                                horizontal={true}
                                data={cast}
                                renderItem={(item) =>
                                    <RenderItemAppearence
                                        item={{
                                            itemId: item.item.id,
                                            itemName: item.item.name,
                                            itemPoster: item.item.profile_path,
                                            itemType: 'person',
                                            previosState: 'season'
                                        }}
                                        navigation={navigation}

                                    />
                                }
                                keyExtractor={item => item.credit_id.toString()}

                            />
                        ) : (
                                <View style={{ margin: 15 }}>
                                    <Text>Sorry there is nothing to view</Text>
                                </View>
                            )
                    ) : null
                }
                {
                    imageBPressed ? <RenderImages images={images} /> : null
                }
                <View style={rowDetail}>
                    <RenderExternalIDS ids={{ ...externalIds }} imdbUrl='https://www.imdb.com/title/' videos={videos} />
                </View>
            </ScrollView >
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