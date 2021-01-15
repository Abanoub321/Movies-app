import React from 'react';
import { View, Linking, Text, ToastAndroid, TouchableOpacity } from 'react-native';
import { showMessage } from 'react-native-flash-message';


const LinkerComponent = ({ baseUrl, url, color, text }) => {
    const background = {
        backgroundColor: color,
        borderRadius: 20,

        padding: 10,
        alignSelf: 'center',
        minWidth:80
    };
    const linkTo = () => {

        if (url == '' || url == null) {

            ToastAndroid.show(
                "There is nothing to retrive",
                ToastAndroid.LONG
            );
        }
        else {

            Linking.openURL(baseUrl + url)
        }
    }
    return (
        <TouchableOpacity onPress={linkTo} style={{ margin: 5 }}>
            <View style={background}>
                <Text style={{ fontWeight: 'bold',alignSelf:'center' }}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const RenderExternalIDS = ({ ids, imdbUrl }) => {
    return (
        <View style={{ flexWrap: 'wrap', flexDirection: 'row', justifyContent: 'center' }}>
            {
                Object.keys(ids).map((value, index) => {
                    if (ids[value] != null) {
                        if (value == 'facebook_id')
                            return <LinkerComponent key={ids[value] + index} baseUrl='fb.com/' url={ids[value]} color='#4267B2' text='Facebook' />
                        if (value == 'imdb_id')
                            return <LinkerComponent key={ids[value] + index} baseUrl={imdbUrl} url={ids[value]} color='yellow' text='More on Imdb' />
                        if (value == 'twitter_id')
                            return <LinkerComponent key={ids[value] + index} baseUrl='https://twitter.com/' url={ids[value]} color='#1DA1F2' text='Twitter' />
                        if (value == 'instagram_id')
                            return <LinkerComponent key={ids[value] + index} baseUrl='https://www.instagram.com/' url={ids[value]} color='#8a3ab9' text='Instagram' />
                        if (value == 'homepage')
                            return <LinkerComponent key={ids[value] + index} baseUrl='' url={ids[value]} color='grey' text='Website' />
                    }

                })
            }
        </View>
    )
}

export { LinkerComponent, RenderExternalIDS };