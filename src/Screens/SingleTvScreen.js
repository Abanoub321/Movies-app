import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    FlatList,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { LinkerComponent } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';
import {backgroundImage,Title,titleHeader,overView,rowDetail,detailsHeader,centerdAboveDetail,genreContainer} from '../styles';


const TvScreen = ({ route, navigation }) => {
    const { id } = route.params;
    const [tv, setTv] = useState([]);
    const [fetched, setFetched] = useState(false);

    useEffect(() => {
        if (!fetched)
            fetchTvData();

    }, [fetched])

    const fetchTvData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${id}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let tv = await response.json();
        setTv(tv);
        setFetched(true);
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
                    <Image source={{ uri: baseUrl + tv.backdrop_path }} style={backgroundImage} />

                    <View>
                        <Text style={Title}> {tv.name} </Text>
                        <Text style={overView}>
                            {tv.overview}
                        </Text>
                    </View>

                    <View style={rowDetail}>

                        <View style={centerdAboveDetail}>
                            <Text style={detailsHeader}>

                                First realease date
                            </Text>

                            <Text>
                                {tv.first_air_date}
                            </Text>
                        </View>


                        <View style={centerdAboveDetail}>

                            <Text style={detailsHeader}>
                                Last Episode released date
                              </Text>
                            <Text>
                                {tv.last_air_date == null ? 'Not Known yet' : tv.last_air_date}
                            </Text>
                        </View>

                    </View>

                    <View style={rowDetail}>
                        <View style={centerdAboveDetail}>

                            <Text style={detailsHeader}>
                                Popularity
                          </Text>
                            <Text>
                                {tv.popularity}
                            </Text>
                        </View>

                    </View>
                    <View style={rowDetail}>
                        <View style={centerdAboveDetail}>

                            <Text style={detailsHeader}>
                                Number of Seasons
                            </Text>
                            <Text>
                                {tv.number_of_seasons}
                            </Text>
                        </View>
                        <View style={centerdAboveDetail}>

                            <Text style={detailsHeader}>
                                Number of Episodes
                          </Text>
                            <Text>
                                {tv.number_of_episodes}
                            </Text>
                        </View>
                    </View>
                    <View style={rowDetail}>
                        <View style={rowDetail}>
                            <Text style={detailsHeader}>Status : </Text>
                            <Text style={{ fontSize: 15, color: 'red' }}>
                                {tv.status}
                            </Text>
                        </View>
                    </View>
                    <View style={genreContainer}>
                        <Text style={detailsHeader}>
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
                    <View style={rowDetail}>
                        <LinkerComponent url={tv.homepage} baseUrl='' color='grey' text='See on Website' />
                    </View>
                    <View style={{ margin: 15 }}>
                        <Text style={titleHeader}>Seasons</Text>
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
                            <Text style={titleHeader}>Production Companies</Text>
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

export default TvScreen;