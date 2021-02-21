import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Linking } from 'react-native';
import { useState } from 'react/cjs/react.development';
import { buttons, buttonText } from '../styles';

const GuestLogin2 = ({ onPress, onChangeText }) => {

    return (
        <View>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                    borderWidth: .5,
                    borderColor: '#000',
                    height: 40,
                    borderRadius: 5,
                    margin: 10
                }}
            >
                <TextInput
                    placeholder='Enter Name'
                    style={{ flex: 1 }}
                    underlineColorAndroid="transparent"
                    onChangeText={onChangeText}
                />
            </View>
            <TouchableOpacity onPress={onPress} style={[buttons, { alignSelf: 'center' }]}>
                <Text style={buttonText}> Sign In as a guest </Text>
            </TouchableOpacity>
        </View>
    )
}
const GuestLogin = ({ onPress, onChangeText }) => {
    return (
        <View
            style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',

                height: 40,

                margin: 10
            }}
        >
            <Text>Sorry Guest Feature isn't available right now</Text>
        </View>
    )
}

const UserLogin = ({ onPress, onChangeText, onChangePassword, token }) => {
    const [activate, setActivate] = useState(false);
    const activateBtn = () => {
        console.log(token);
        Linking.openURL(`https://www.themoviedb.org/authenticate/${token}`);
        setTimeout(
            () => {
                setActivate(true)
            }
            , 10000
        )
    }
    return (
        !activate ?
            (
                <View>
                    <Text style={{
                        margin:15,
                       alignSelf:'center'
                    }}>
                        You should activate your token first
                    </Text>
                    <TouchableOpacity onPress={activateBtn} style={[buttons, { alignSelf: 'center' }]}>
                        <Text style={buttonText}> Activate Token to log in </Text>
                    </TouchableOpacity>
                </View>
            ) :
            (
                <View>
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: '#fff',
                            borderWidth: .5,
                            borderColor: '#000',
                            height: 40,
                            borderRadius: 5,
                            margin: 10
                        }}
                    >
                        <TextInput
                            placeholder='Enter Name'
                            style={{ flex: 1 }}
                            underlineColorAndroid="transparent"
                            onChangeText={onChangeText}
                        />



                    </View >
                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#fff',
                        borderWidth: .5,
                        borderColor: '#000',
                        height: 40,
                        borderRadius: 5,
                        margin: 10
                    }}>
                        <TextInput
                            placeholder='Enter password'
                            style={{ flex: 1 }}
                            underlineColorAndroid="transparent"
                            onChangeText={onChangePassword}
                            secureTextEntry
                        />
                    </View>
                    <TouchableOpacity onPress={onPress} style={[buttons, { alignSelf: 'center' }]}>
                        <Text style={buttonText}> Sign In as user </Text>
                    </TouchableOpacity>
                </View >

            )
    )
}

export { GuestLogin, UserLogin };