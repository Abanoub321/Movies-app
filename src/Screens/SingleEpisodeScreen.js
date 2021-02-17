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
import { connect } from 'react-redux';
import { fetchEpisodeData, onPageRefersh } from '../actions';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { RenderExternalIDS } from '../Components/LinkerComponent';
import { apiKey, BASE_URL } from '@env';
import { posterImage, Title, detailsHeader, centerdAboveDetail, buttons, rowDetail, buttonText } from '../styles';
import { onEpisodeScreenRefresh } from '../actions/constStrings';

const EpisodeScreen = (props) => {
    const { route, navigation, fetchEpisodeData, episode, cast, guest, images, externalIds, videos, errors, onPageRefersh, fetched } = props;
    const { id, seasonNo, episodeNo, poster } = route.params;
    const [castBPressed, setCastBPressed] = useState(false);
    const [guestBPressed, setGuestBPressed] = useState(false);
    const [imageBPressed, setImageBPressed] = useState(false)
    useEffect(() => {
        if (!fetched)
            fetchEpisodeData(id, seasonNo, episodeNo);
        navigation.addListener('focus', (e) => {
            onPageRefersh(onEpisodeScreenRefresh, false);
        })
    });
    const onRefresh = () => {
        onPageRefersh(onEpisodeScreenRefresh, false)
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
                    <Image source={{ uri: BASE_URL + (episode.still_path == null ? poster : episode.still_path) }} style={posterImage} />
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

const mapStateToProps = state => {
    return state.episode;
}

export default connect(mapStateToProps, { fetchEpisodeData, onPageRefersh })(EpisodeScreen);