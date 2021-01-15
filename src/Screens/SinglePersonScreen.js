
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, ActivityIndicator } from 'react-native';
import { LinkerComponent } from '../Components/LinkerComponent';
import { apiKey, baseUrl } from '../../Env';
import { posterImage, Title, overView, rowDetail, detailsHeader, centerdAboveDetail } from '../styles';
const PersonScreen = ({ route }) => {
    const { id } = route.params;
    const [fetched, setFetched] = useState(false);
    const [person, setPerson] = useState({});

    useEffect(() => {
        if (!fetched)
            fetchPerson();
    }, [fetched])

    const fetchPerson = async () => {
        const url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`;
        let response = await fetch(url);
        let personData = await response.json();
        setPerson(personData);
        setFetched(true);
    }
    if (fetched) {


        return (
            <ScrollView>
                <View>
                    <Image
                        source={
                            {
                                uri: (person.profile_path == null ? 'https://www.pngkey.com/png/full/21-213224_unknown-person-icon-png-download.png' : baseUrl + person.profile_path)
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
                       ( <View style={rowDetail}>
                            <View style={centerdAboveDetail}>
                                <Text style={detailsHeader}>Deathday</Text>
                                <Text>{person.deathday}</Text>
                            </View>
                        </View>
                        )
                }
                <View>
                    <Text style={overView}>{person.biography}</Text>
                </View>
                <View style={rowDetail}>
                    <LinkerComponent baseUrl='https://www.imdb.com/name/' color='yellow' text='More on Imdb' url={person.imdb_id} />
                    <LinkerComponent baseUrl='' color='grey' text='Follow Website' url={person.homepage} />
                </View>
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

export default PersonScreen;
