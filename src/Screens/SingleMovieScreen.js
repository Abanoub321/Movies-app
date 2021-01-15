import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    Dimensions,
    ScrollView,
    FlatList,
} from 'react-native';
import { LinkerComponent } from '../Components/LinkerComponent';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { apiKey, baseUrl } from '../../Env';
const MovieScreen = ({ route }) => {

    const { id } = route.params;
    const [fetched, setFetched] = useState(false);
    const [movie, setMovie] = useState({});
    useEffect(() => {
        if (!fetched)
            fetchMovieData();
        setFetched(true);
    })

    const fetchMovieData = async () => {
        let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let movie = await response.json();
        setMovie(movie);
    }

    const handleGenres = ({ item }) => {
        return (
            <View style={styles.genreContainer}>
                <Text>{item.name}</Text>
                <Text>,</Text>
            </View>
        )
    }

    return (
        <ScrollView>

            <View style={{ flex: 1 }}>

                <Image source={{ uri: baseUrl + movie.backdrop_path }} style={styles.backgroundImage} />

                <View style={styles.hoveredContainer}>
                    <Text style={styles.movieTitle}>
                        {movie.title}
                    </Text>
                    <Image source={{ uri: baseUrl + movie.poster_path }} style={styles.posterImage} />
                </View>
                <View>

                    <Text style={styles.lengthText}>
                        Length: {movie.runtime} minutes
                   </Text>

                    <View style={styles.rowDetail}>
                        <View style={styles.rowDetail}>
                            <Text style={styles.detailsHeader}>
                                Rating:
                            </Text>
                            <Text>
                                {movie.vote_average}
                            </Text>
                        </View>
                        <View style={styles.rowDetail}>
                            <Text style={styles.detailsHeader}>
                                Year:
                            </Text>
                            <Text>
                                {movie.release_date}
                            </Text>
                        </View>
                    </View>

                    <View style={styles.rowDetail}>
                        <View style={styles.rowDetail}>
                            <Text style={styles.detailsHeader}>
                                Popularity:
                            </Text>
                            <Text style={{ textAlign: 'left', margin: 5, marginLeft: 0 }}>
                                {movie.popularity}
                            </Text>
                        </View>
                    </View>
                    <View style={{ alignSelf: 'center', margin: 5 }}>
                        <Text style={{ fontSize: 15, color: 'red' }}>
                            {movie.status}
                        </Text>
                    </View>

                    <View>
                        <Text style={styles.movieOverview}>
                            {movie.overview}
                        </Text>
                    </View>
                    <View style={styles.rowDetail}>
                        <LinkerComponent url={movie.imdb_id} baseUrl='https://imdb.com/title/' color='yellow' text='See on Imdb' />
                        <LinkerComponent url={movie.homepage} baseUrl='' color='grey' text='Follow Website' />
                    </View>
                    <View style={styles.genreContainer}>
                        <Text style={styles.detailsHeader}>
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
                                        itemType: 'logo'
                                    }}
                                />
                            }
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
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
    movieTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
        flexDirection: 'column',
        marginBottom: 15
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
    rowDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 3,
    },
    movieOverview: {
        alignSelf: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 10,
        fontSize: 15,
        margin: 3,
    },
    detailsHeader: {
        color: 'blue',
        fontWeight: 'bold',
        marginRight: 3
    },
    genreContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        flexWrap: 'wrap'
    }
})
export default MovieScreen;