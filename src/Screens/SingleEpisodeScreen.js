import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    TouchableOpacity,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { RenderExternalIDS } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';
import { posterImage, Title, detailsHeader, centerdAboveDetail, buttons, rowDetail,buttonText } from '../styles';

const EpisodeScreen = ({ route, navigation }) => {
    const { id, seasonNo, episodeNo, poster } = route.params;
    const [episode, setEpisode] = useState([]);
    const [cast, setCast] = useState([]);
    const [guest, setGuest] = useState([]);
    const [images, setImages] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [castBPressed, setCastBPressed] = useState(false);
    const [externalIds, setExternalIds] = useState({});
    const [videos, setVideos] = useState([]);
    const [guestBPressed, setGuestBPressed] = useState(false);
    const [imageBPressed, setImageBPressed] = useState(false)
    useEffect(() => {
        setFetched(false);
        if (!fetched)
            fetchEpisodeData();
        setFetched(true);
    });
    const onRefresh = () => {
        setFetched(false);
    }
    const fetchEpisodeData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let episodeData = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}/credits?api_key=${apiKey}`;
        response = await fetch(url);
        let credits = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let images = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}/external_ids?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonExternalIds = await response.json();
        url = `https://api.themoviedb.org/3/tv/${id}/season/${seasonNo}/episode/${episodeNo}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonVideos = await response.json();
        setEpisode(episodeData);
        setCast(credits.cast);
        setGuest(credits.guest_stars);
        setImages(images.stills);
        setExternalIds(seasonExternalIds);
        setVideos(seasonVideos.results);
    }

    const setFalse = () => {
        setCastBPressed(false);
        setGuestBPressed(false);
        setImageBPressed(false);
    }
    const castPressed = () => {
        setFalse();
        setCastBPressed(!castBPressed);
    }
    const guestPressed = () => {
        setFalse();
        setGuestBPressed(!guestBPressed);
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
                    <Image source={{ uri: baseUrl + (episode.still_path == null ? poster : episode.still_path) }} style={posterImage} />
                    <Text style={Title}>{episode.name}</Text>
                    <View style={centerdAboveDetail}>
                        <Text style={detailsHeader}>Release Date</Text>
                        <Text>{episode.air_date}</Text>
                    </View>
                    <View style={[rowDetail, { marginTop: 15, marginBottom: 15, flexWrap: 'wrap' }]}>



                        <TouchableOpacity onPress={castPressed} style={buttons}>
                            <Text style={buttonText}>Cast</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={guestPressed} style={buttons}>
                            <Text style={buttonText}>Guests</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={imagePressed} style={buttons}>
                            <Text style={buttonText}>Images</Text>
                        </TouchableOpacity>
                    </View>

                    {
                        castBPressed ? (
                            cast ? (
                                <View style={{ margin: 15 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        initialNumToRender={3}
                                        horizontal={true}
                                        data={cast}
                                        renderItem={({ item }) =>
                                            <RenderItemAppearence
                                                item={{
                                                    itemId: item.id,
                                                    itemName: item.name,
                                                    itemPoster: item.profile_path,
                                                    itemType: 'person'
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
                        guestBPressed ? (
                            guest ? (
                                <View style={{ margin: 15 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        initialNumToRender={3}
                                        horizontal={true}
                                        data={guest}
                                        renderItem={({ item }) =>
                                            <RenderItemAppearence
                                                item={{
                                                    itemId: item.id,
                                                    itemName: item.name,
                                                    itemPoster: item.profile_path,
                                                    itemType: 'person'
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
                        imageBPressed ? <RenderImages images={images} /> : null
                    }

                    <View style={rowDetail}>
                        <RenderExternalIDS ids={{ ...externalIds }} imdbUrl='https://www.imdb.com/title/' videos={videos} />
                    </View>
                </View>
            </ScrollView>
        )
    }
}

export default EpisodeScreen;