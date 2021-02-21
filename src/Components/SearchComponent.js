import React from 'react';
import { View, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

const SearchComponent = ({ onPress, onChangeText }) => {
    return (
        <View style={styles.container}>

            <View style={styles.SectionStyle}>


                <TextInput
                    style={{ flex: 1 }}
                    placeholder="Search"
                    underlineColorAndroid="transparent"
                    onChangeText={onChangeText}
                />

            <TouchableOpacity onPress={onPress}>
                <Image source={{ uri: 'https://cdn2.iconfinder.com/data/icons/ios-7-icons/50/search-512.png' }} style={styles.ImageStyle} />
            </TouchableOpacity>
            </View>

        </View>
    );
}
const styles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10
    },

    SectionStyle: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: .5,
        borderColor: '#000',
        height: 40,
        borderRadius: 5,
        margin: 10
    },

    ImageStyle: {
        padding: 10,
        margin: 5,
        height: 25,
        width: 25,
        resizeMode: 'stretch',
        alignItems: 'center'
    },

});
export { SearchComponent };