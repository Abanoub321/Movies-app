
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchPersonData ,onPageRefersh} from '../actions';
import { View, Text, ScrollView, Image, ActivityIndicator, RefreshControl, FlatList, TouchableOpacity } from 'react-native';

import { RenderExternalIDS } from '../Components/LinkerComponent';
import { BASE_URL } from '@env';
import { posterImage, Title, overView, rowDetail, detailsHeader, centerdAboveDetail, buttons, buttonText } from '../styles';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import RenderImages from '../Components/RenderImages';
import { onPersonScreenRefresh } from '../actions/constStrings';
const PersonScreen = (props) => {
    const { route, navigation, fetchPersonData, person, credits, externalIds, images, errors ,fetched,onPageRefersh} = props;
    const { id } = route.params;
    const [imageBPressed, setImageBPressed] = useState(false);
    const [castBPressed, setCastBPressed] = useState(false);
    const [crewBPressed, setCrewBPressed] = useState(false);
    useEffect(() => {
        if (!fetched)
            fetchPersonData(id);
        navigation.addListener('focus', (e) => {

            onPageRefersh(onPersonScreenRefresh, false);
        })
    }, [fetched])


    const onRefresh = () => {
        onPageRefersh(onPersonScreenRefresh, false);
    }
    const setFalse = () => {
        setCastBPressed(false);
        setCrewBPressed(false);
        setImageBPressed(false);
    }

    const castPressed = () => {
        setFalse();
        setCastBPressed(!castBPressed);
    }
    const crewPressed = () => {
        setFalse();
        setCrewBPressed(!crewBPressed);
    }
    const imagePressed = () => {
        setFalse();
        setImageBPressed(!imageBPressed);
    }
    if (fetched) {
        return (
            <ScrollView
                refreshControl={
                    <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                }
                style={{ marginBottom: 5 }}
            >
                <View>
                    <Image
                        source={
                            {
                                uri: (person.profile_path == null ? 'https://www.pngkey.com/png/full/21-213224_unknown-person-icon-png-download.png' : BASE_URL + person.profile_path)
                            }
                        }
                        style={posterImage}
                    />
                    <Text style={Title}>{person.name}</Text>
                </View>
                <View style={rowDetail}>
                    <View style={centerdAboveDetail}>
                        <Text style={detailsHeader}>Known For</Text>
                        <Text>{person.known_for_department}</Text>
                    </View>
                    <View style={centerdAboveDetail} >
                        <Text style={detailsHeader}>Popularity</Text>
                        <Text>{person.popularity}</Text>
                    </View>
                </View>
                {
                    person.deathday == null ? null :
                        (<View style={rowDetail}>
                            <View style={centerdAboveDetail}>
                                <Text style={detailsHeader}>Deathday</Text>
                                <Text>{person.deathday}</Text>
                            </View>
                        </View>
                        )
                }
                <View style={rowDetail}>
                    <RenderExternalIDS ids={{ ...externalIds, homepage: person.homepage }} imdbUrl='https://www.imdb.com/name/' videos={[]} />
                </View>

                <View>
                    <Text style={overView}>{person.biography}</Text>
                </View>
                <View style={[rowDetail, { marginTop: 15, marginBottom: 15, flexWrap: 'wrap' }]}>



                    <TouchableOpacity onPress={castPressed} style={buttons}>
                        <Text style={buttonText}>Cast</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={crewPressed} style={buttons}>
                        <Text style={buttonText}>Crew</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={imagePressed} style={buttons}>
                        <Text style={buttonText}>Images</Text>
                    </TouchableOpacity>
                </View>
                {
                    castBPressed ? (
                        credits.cast.length < 1 ? (<View style={{ margin: 15 }}>
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
                                            itemName: item.item.title,
                                            itemPoster: item.item.poster_path,
                                            itemType: item.item.media_type,
                                            previosState: 'person'
                                        }}
                                        navigation={navigation}

                                    />
                                }
                                keyExtractor={item => item.credit_id}

                            />)
                    ) : null
                }
                {
                    crewBPressed ? (
                        credits.crew < 1 ?
                            (
                                <View style={{ margin: 15 }}>
                                    <Text>Sorry there is nothing to view</Text>
                                </View>
                            ) :
                            (
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    initialNumToRender={3}
                                    horizontal={true}
                                    data={credits.crew}
                                    renderItem={(item) =>
                                        <RenderItemAppearence
                                            item={{
                                                itemId: item.item.id,
                                                itemName: item.item.title,
                                                itemPoster: item.item.poster_path,
                                                itemType: item.item.media_type,
                                                previosState: 'person'
                                            }}
                                            navigation={navigation}

                                        />
                                    }
                                    keyExtractor={item => item.credit_id}

                                />)
                    ) : null
                }

                {
                    imageBPressed ? <RenderImages images={images.profiles} /> : null
                }

            </ScrollView>
        );
    }
    else {
        return (
            <View>
                <ActivityIndicator size="large" color='#0000ff' />
            </View>
        )
    }
}

const mapStateToProps = state => {
    return state.person;
}

export default connect(mapStateToProps, { fetchPersonData,onPageRefersh })(PersonScreen);
