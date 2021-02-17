import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    Image,
    ScrollView,
    FlatList,
    ActivityIndicator,
    RefreshControl,
    TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux';
import { fetchTvData, onPageRefersh } from '../actions';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { RenderExternalIDS } from '../Components/LinkerComponent';
import { baseUrl } from '../../Env';
import { backgroundImage, Title, buttons, overView, rowDetail, detailsHeader, centerdAboveDetail, genreContainer, buttonText } from '../styles';
import { onTvScreenRefresh } from '../actions/constStrings';



const TvScreen = (props) => {
    const {
        route,
        navigation,
        tv,
        credits,
        externalIds,
        images,
        similar,
        videos,
        errors,
        fetchTvData,
        id,
        session_id,
        fetched,
        onPageRefersh
    } = props;

    const [imageBPressed, setImageBPressed] = useState(false);
    const [seasonBPressed, setSeasonBPressed] = useState(false);
    const [castBPressed, setCastBPressed] = useState(false);
    const [companiesBPressed, setCompaniesBPressed] = useState(false);
    const [similarBPressed, setSimilarBPressed] = useState(false);

    useEffect(() => {
        if (!fetched)
            fetchTvData(route.params.id, id, session_id);
        navigation.addListener('focus', (e) => {

            onPageRefersh(onTvScreenRefresh, false);
        })
    }, [fetched])


    const handleGenres = ({ item }) => {
        return (
            <View style={genreContainer}>
                <Text>{item.name}</Text>
                <Text>,</Text>
            </View>
        )
    }
    const onRefresh = () => {
        onPageRefersh(onTvScreenRefresh,false)
    }

    const setFalse = () => {
        setCastBPressed(false);
        setCompaniesBPressed(false);
        setImageBPressed(false);
        setSeasonBPressed(false);
        setSimilarBPressed(false);
    }
    const imagePressed = () => {
        setFalse();
        setImageBPressed(!imageBPressed);
    }

    const seasonPressed = () => {
        setFalse();
        setSeasonBPressed(!seasonBPressed);
    }
    const castPressed = () => {
        setFalse();
        setCastBPressed(!castBPressed);
    }
    const companiesPressed = () => {
        setFalse();
        setCompaniesBPressed(!companiesBPressed);
    }
    const similarPressed = () => {
        setFalse();
        setSimilarBPressed(!similarBPressed);
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

                    <View style={[rowDetail, { marginTop: 15, marginBottom: 15, flexWrap: 'wrap' }]}>

                        <TouchableOpacity onPress={imagePressed} style={buttons}>
                            <Text style={buttonText}>Images</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={seasonPressed} style={buttons}>
                            <Text style={buttonText}>Seasons</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={castPressed} style={buttons}>
                            <Text style={buttonText}>Cast</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={companiesPressed} style={buttons}>
                            <Text style={buttonText}>production companies</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={similarPressed} style={buttons}>
                            <Text style={buttonText}>Similar</Text>
                        </TouchableOpacity>
                    </View>
                    {
                        imageBPressed ? <RenderImages images={images} /> : null
                    }

                    {
                        seasonBPressed ? (<View style={{ margin: 15 }}>
                            <FlatList
                                showsHorizontalScrollIndicator={false}
                                initialNumToRender={3}
                                horizontal={true}
                                data={tv.seasons}
                                renderItem={(item) =>
                                    <RenderItemAppearence
                                        item={{
                                            itemId: route.params.id,
                                            itemName: item.item.name,
                                            itemPoster: item.item.poster_path,
                                            itemSeason: item.item.season_number,
                                            itemType: 'season',
                                            previosState: 'tv'

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
                                                        previosState: 'tv'
                                                    }}
                                                    navigation={navigation}

                                                />
                                            }
                                            keyExtractor={item => item.credit_id.toString()}

                                        />)
                                }
                            </View>
                        ) : null
                    }

                    {
                        companiesBPressed ? (
                            <View style={{ margin: 15 }}>
                                {tv.production_companies.length > 0 ?
                                    (<View style={{ margin: 15 }}>
                                        <Text>Sorry there is nothing to view</Text>
                                    </View>
                                    ) : (
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
                                                        itemType: 'logo',
                                                        previosState: 'tv'
                                                    }}
                                                />
                                            }
                                            keyExtractor={item => item.id.toString()}
                                        />
                                    )
                                }
                            </View>
                        ) : null
                    }
                    {
                        similarBPressed ? (
                            similar ? (<View>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    initialNumToRender={3}
                                    horizontal={true}
                                    data={similar}
                                    renderItem={(item) =>
                                        <RenderItemAppearence
                                            item={{
                                                itemId: item.item.id,
                                                itemName: item.item.name,
                                                itemPoster: item.item.poster_path,
                                                itemType: 'tv',
                                                previosState: 'tv'
                                            }}
                                            navigation={navigation}
                                        />
                                    }
                                    keyExtractor={item => item.id.toString()}
                                />
                            </View>) : (
                                    <View style={{ margin: 10 }}>
                                        <Text>Sorry there is nothing to view</Text>
                                    </View>
                                )
                        ) : null
                    }
                    <View style={rowDetail}>
                        <RenderExternalIDS ids={{ ...externalIds, homepage: tv.homepage }} imdbUrl='https://www.imdb.com/title/' videos={videos} />
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    const tv = state.tv;
    const { id, session_id } = state.user;
    return { ...tv, id, session_id };
}

export default connect(mapStateToProps, { fetchTvData,onPageRefersh })(TvScreen);