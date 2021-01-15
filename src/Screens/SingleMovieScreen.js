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
    ActivityIndicator
} from 'react-native';
import { LinkerComponent } from '../Components/LinkerComponent';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { apiKey, baseUrl } from '../../Env';
import { Title, detailsHeader, overView, genreContainer, rowDetail } from '../styles';
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
            <View style={genreContainer}>
                <Text>{item.name}</Text>
                <Text>,</Text>
            </View>
        )
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
                        <Text style={Title}>
                            {movie.title}
                        </Text>
                        <Image source={{ uri: baseUrl + movie.poster_path }} style={styles.posterImage} />
                    </View>
                    <View>

                        <Text style={styles.lengthText}>
                            Length: {movie.runtime} minutes
                   </Text>

                        <View style={rowDetail}>
                            <View style={rowDetail}>
                                <Text style={detailsHeader}>
                                    Rating:
                            </Text>
                                <Text>
                                    {movie.vote_average}
                                </Text>
                            </View>
                            <View style={rowDetail}>
                                <Text style={detailsHeader}>
                                    Year:
                            </Text>
                                <Text>
                                    {movie.release_date}
                                </Text>
                            </View>
                        </View>

                        <View style={rowDetail}>
                            <View style={rowDetail}>
                                <Text style={detailsHeader}>
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
                            <Text style={overView}>
                                {movie.overview}
                            </Text>
                        </View>
                        <View style={rowDetail}>
                            <LinkerComponent url={movie.imdb_id} baseUrl='https://imdb.com/title/' color='yellow' text='See on Imdb' />
                            <LinkerComponent url={movie.homepage} baseUrl='' color='grey' text='Follow Website' />
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