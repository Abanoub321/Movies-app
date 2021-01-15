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



const TvScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [tv, setTv] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        setFetched(false);
        if (!fetched)
            fetchTvData();
        setFetched(true);
    })

    const fetchTvData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let tv = await response.json();
        setTv(tv);
    }

    const handleGenres = ({ item }) => {
        return (
            <View style={styles.genreContainer}>
                <Text>{item.name}</Text>
                <Text>,</Text>
            </View>
        )
    }
    if (!fetched) {
        return (
            <View>
                <ActivityIndicator size="large" color='#0000ff' />
            </View>
        )
    } else {


        return (
            <ScrollView>
                <View style={{ flex: 1 }}>
                    <Image source={{ uri: baseUrl + tv.backdrop_path }} style={styles.backgroundImage} />

                    <View>
                        <Text style={styles.movieTitle}> {tv.name} </Text>
                        <Text style={styles.movieOverview}>
                            {tv.overview}
                        </Text>
                    </View>

                    <View style={styles.rowDetail}>

                        <View style={styles.aboveAndCenterd}>
                            <Text style={styles.detailsHeader}>

                                First realease date
                            </Text>

                            <Text>
                                {tv.first_air_date}
                            </Text>
                        </View>


                        <View style={styles.aboveAndCenterd}>

                            <Text style={styles.detailsHeader}>
                                Last Episode released date
                              </Text>
                            <Text>
                                {tv.last_air_date == null? 'Not Known yet':tv.last_air_date}
                            </Text>
                        </View>

                    </View>

                    <View style={styles.rowDetail}>
                        <View style={styles.aboveAndCenterd}>

                            <Text style={styles.detailsHeader}>
                                Popularity
                          </Text>
                            <Text>
                                {tv.popularity}
                            </Text>
                        </View>

                    </View>
                    <View style={styles.rowDetail}>
                        <View style={styles.aboveAndCenterd}>

                            <Text style={styles.detailsHeader}>
                                Number of Seasons
                            </Text>
                            <Text>
                                {tv.number_of_seasons}
                            </Text>
                        </View>
                        <View style={styles.aboveAndCenterd}>

                            <Text style={styles.detailsHeader}>
                                Number of Episodes
                          </Text>
                            <Text>
                                {tv.number_of_episodes}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.rowDetail}>
                        <View style={styles.rowDetail}>
                            <Text style={styles.detailsHeader}>Status : </Text>
                            <Text style={{ fontSize: 15, color: 'red' }}>
                                {tv.status}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.genreContainer}>
                        <Text style={styles.detailsHeader}>
                            Genres:
                        </Text>
                        <Text></Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            horizontal={true}
                            data={tv.genres}
                            renderItem={(item) =>
                                handleGenres(item)
                            }
                            keyExtractor={item => item.id.toString()}
                        />
                    </View>
                    <View style={styles.rowDetail}>
                        <LinkerComponent url={tv.homepage} baseUrl='' color='grey' text='See on Website' />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={styles.titleHeader}>Seasons</Text>
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            initialNumToRender={3}
                            horizontal={true}
                            data={tv.seasons}
                            renderItem={(item) =>
                                <RenderItemAppearence
                                    item={{
                                        itemId: id,
                                        itemName: item.item.name,
                                        itemPoster: item.item.poster_path,
                                        itemSeason: item.item.season_number,
                                        itemType: 'season'
                                    }}
                                    navigation={navigation}

                                />
                            }
                            keyExtractor={item => item.id.toString()}
                        />
                        <View style={{ margin: 15 }}>
                        <Text style={styles.titleHeader}>Production Companies</Text>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={3}
                                horizontal={true}
                                data={tv.production_companies}
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

        width: Math.round(Dimensions.get('screen').width),
        height: Math.round(Dimensions.get('screen').height) / 3,
        borderBottomRightRadius: 25,
        borderBottomLeftRadius: 25,
        resizeMode: 'stretch',
    },
    movieTitle: {
        alignSelf: 'center',
        fontSize: 30,
        fontWeight: 'bold',
       
        marginTop: 10,
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
    movieOverview: {
        alignSelf: 'center',
        flexWrap: 'wrap',
        textAlign: 'center',
        margin: 10,
        fontSize: 15,
        margin: 3,
    },
    rowDetail: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 3,
    },
    detailsHeader: {
        color: 'blue',
        fontWeight: 'bold',
        marginRight: 3,

    },
    genreContainer: {
        flexDirection: 'row',
        marginLeft: 10,
        flexWrap: 'wrap'
    },
    aboveAndCenterd: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    titleHeader:{
        fontSize:20,
        alignItems:'flex-start',
        color:'green',
        marginBottom:15,
        fontWeight:'bold',

    }
})
export default TvScreen;