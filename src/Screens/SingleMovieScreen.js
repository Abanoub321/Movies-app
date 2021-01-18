import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
    RefreshControl,
    ActivityIndicator,
    TouchableOpacity
} from 'react-native';
import { RenderExternalIDS } from '../Components/LinkerComponent';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { apiKey, baseUrl } from '../../Env';
import { detailsHeader, overView, genreContainer, rowDetail, centerdAboveDetail, buttons,buttonText } from '../styles';
const MovieScreen = ({ route, navigation }) => {

    const { id } = route.params;
    const [fetched, setFetched] = useState(false);
    const [movie, setMovie] = useState({});
    const [credits, setCredits] = useState({});
    const [externalIds, setExternalIds] = useState({});
    const [images, setImages] = useState({});
    const [similarMovies, setSimilarMovies] = useState([]);
    const [videos, setVideos] = useState([]);
    const [imageBPressed, setImageBPressed] = useState(false);
    const [similarBPressed, setSimilarBPressed] = useState(false);
    const [castBPressed, setCastBPressed] = useState(false);
    const [companiesBPressed, setCompaniesBPressed] = useState(false);
    useEffect(() => {
        if (!fetched)
            fetchMovieData();
        setFetched(true);
    }, [fetched,navigation])

    const fetchMovieData = async () => {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let movie = await response.json();
        url = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let creditsData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${id}/external_ids?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let externalIdsData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let imagesData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=${apiKey}&page=1`;
        response = await fetch(url);
        let similarMoviesData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let videosData = await response.json();
        setMovie(movie);
        setCredits(creditsData);
        setExternalIds(externalIdsData);
        setImages(imagesData.backdrops.concat(imagesData.posters));
        setSimilarMovies(similarMoviesData.results);
        setVideos(videosData.results);
    }

    const imageButton = () => {
        setImageBPressed(!imageBPressed);
        if (imageBPressed)
            setImageTitle('More Images')
        else
            setImageTitle('Less Images')
    }

    const handleGenres = ({ item }) => {
        return (
            <View style={genreContainer}>
                <Text>{item.name}</Text>
                <Text>,</Text>
            </View>
        )
    }
    const onRefresh = () => {
        setFetched(false);
    }


    const setFalse = () => {
        setCastBPressed(false);
        setCompaniesBPressed(false);
        setImageBPressed(false);
        setSimilarBPressed(false);
    }
    const imagePressed = () => {
        setFalse();
        setImageBPressed(!imageBPressed);
    }

    const similarPressed = () => {
        setFalse();
        setSimilarBPressed(!similarBPressed);
    }
    const castPressed = () => {
        setFalse();
        setCastBPressed(!castBPressed);
    }
    const companiesPressed = () => {
        setFalse();
        setCompaniesBPressed(!companiesBPressed);
    }
    if (!fetched) {
        return (
            <View>
                <ActivityIndicator size="large" color='#0000ff' />
            </View>
        )
    } else {

        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                }
            >

                <View style={{ flex: 1 }}>

                    <Image source={{ uri: baseUrl + movie.backdrop_path }} style={styles.backgroundImage} />

                    <View style={styles.hoveredContainer}>

                        <Image source={{ uri: baseUrl + movie.poster_path }} style={[styles.posterImage, { justifyContent: 'center', marginTop: 65 }]} />
                    </View>
                    <View>
                        <View style={centerdAboveDetail}>
                            <Text style={detailsHeader}> Length</Text>
                            <Text style={styles.lengthText}>{movie.runtime} minutes </Text>
                        </View>

                        <View style={rowDetail}>
                            <View style={centerdAboveDetail}>
                                <Text style={detailsHeader}>
                                    Rating
                            </Text>
                                <Text>
                                    {movie.vote_average}
                                </Text>
                            </View>
                            <View style={centerdAboveDetail}>
                                <Text style={detailsHeader}>
                                    Year
                            </Text>
                                <Text>
                                    {movie.release_date}
                                </Text>
                            </View>
                        </View>

                        <View style={rowDetail}>
                            <View style={centerdAboveDetail}>
                                <Text style={detailsHeader}>
                                    Popularity
                            </Text>
                                <Text style={{ textAlign: 'left', margin: 5, marginLeft: 0 }}>
                                    {movie.popularity}
                                </Text>
                            </View>
                        </View>
                        <View style={{ alignSelf: 'center' }}>
                            <Text style={{ fontSize: 20, color: 'red' }}>
                                {movie.status}
                            </Text>
                        </View>

                        <View>
                            <Text style={overView}>
                                {movie.overview}
                            </Text>
                        </View>
                        <View style={genreContainer}>
                            <Text style={detailsHeader}>
                                Genres:
                        </Text>
                            <Text></Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                horizontal={true}
                                data={movie.genres}
                                renderItem={(item) =>
                                    handleGenres(item)
                                }
                                keyExtractor={item => item.id.toString()}
                            />
                        </View>
                        <View style={[rowDetail, { marginTop: 15, marginBottom: 15 }]}>

                            <TouchableOpacity onPress={imagePressed} style={buttons}>
                                <Text style={buttonText}>Images</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={castPressed} style={buttons}>
                                <Text style={buttonText}>Cast</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={similarPressed} style={buttons}>
                                <Text style={buttonText}>Similar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={companiesPressed} style={buttons}>
                                <Text style={buttonText}>production companies</Text>
                            </TouchableOpacity>
                        </View>


                        {
                            imageBPressed ? <RenderImages images={images} /> : null
                        }
                        {
                            castBPressed ? (
                                <View>
                                    {
                                        !credits.cast ?
                                            (<View style={{ margin: 15 }}>
                                                <Text>Sorry there is nothing to view</Text>
                                            </View>
                                            ) :
                                            (<FlatList
                                                showsHorizontalScrollIndicator={false}
                                                initialNumToRender={3}
                                                horizontal={true}
                                                data={credits.cast}
                                                renderItem={(item) =>
                                                    <RenderItemAppearence
                                                        item={{
                                                            itemId: item.item.id,
                                                            itemName: item.item.name,
                                                            itemPoster: item.item.profile_path,
                                                            itemType: 'person',
                                                            previosState:'movie'
                                                        }}
                                                        navigation={navigation}
                                                    />
                                                }
                                                keyExtractor={item => item.cast_id.toString()}

                                            />)

                                    }
                                </View>
                            ) : null
                        }
                        {
                            similarBPressed ? (
                                <View style={{ margin: 15 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        initialNumToRender={3}
                                        horizontal={true}
                                        data={similarMovies}
                                        renderItem={({ item }) =>
                                            <RenderItemAppearence
                                                item={{
                                                    itemId: item.id,
                                                    itemName: item.title,
                                                    itemPoster: item.poster_path,
                                                    itemType: 'movie',
                                                    previosState:'movie'
                                                }}
                                                navigation={navigation}
                                            />
                                        }
                                        keyExtractor={item => item.id.toString()}
                                    />
                                </View>
                            ) : null
                        }
                        {
                            companiesBPressed ? (
                                <View style={{ margin: 15 }}>
                                    <FlatList
                                        showsHorizontalScrollIndicator={false}
                                        initialNumToRender={3}
                                        horizontal={true}
                                        data={movie.production_companies}
                                        renderItem={(item) =>
                                            <RenderItemAppearence
                                                item={{
                                                    itemId: item.item.id,
                                                    itemName: item.item.name,
                                                    itemPoster: item.item.logo_path,
                                                    itemType: 'logo',
                                                    previosState:'movie'
                                                }}
                                            />
                                        }
                                        keyExtractor={item => item.id.toString()}
                                    />
                                </View>
                            ) : null
                        }
                        <View style={rowDetail}>
                            <RenderExternalIDS ids={{ ...externalIds, homepage: movie.homepage }} imdbUrl='https://www.imdb.com/title/' videos={videos} />
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
const styles = StyleSheet.create({

    backgroundImage: {
        position: 'absolute',
        opacity: 0.5,
        width: Math.round(Dimensions.get('screen').width),
        height: Math.round(Dimensions.get('screen').height) / 2,
        resizeMode: 'stretch',
    },
    hoveredContainer: {
        height: Math.round(Dimensions.get('screen').height) / 2,
        zIndex: 5,
        marginTop: 15,
        marginLeft: 20
    },

    posterImage: {
        width: 250,
        height: 250,
        aspectRatio: 1,
        resizeMode: 'contain',
        alignSelf: 'center',
        borderRadius: 15,
    },

    lengthText: {

        alignSelf: 'center',
        margin: 3,
    },

})
export default MovieScreen;