import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GuestLogin, UserLogin } from '../Components/LoginComponent'
import { rowDetail, buttonText, buttons, centerdAboveDetail } from '../styles';
import { apiKey } from '../../Env';
const LoginScreen = ({ navigation }) => {

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [state, setState] = useState(0);
    const onTextChange = (text) => {
        setName(text)
    }
    const onChangePassword =(text)=>{
        setPassword(text);
    }
    const viewGuestForm = () => {
        setState(1);
    }
    const viewLoginForm = () => {
        setState(2);
    }
    const onUserPress = async () => {
    
        if (name == '' || password == '')
            return;
    
        await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`)
            .then(response => response.json())
            .then(async(jsonResponse)  => {
                if (jsonResponse.success) {
                    console.log(jsonResponse.request_token);
                    await fetch(`https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key=${apiKey}`, {
                        method: 'POST',
                        body: {
                            username: name,
                            password,
                            request_token: jsonResponse.request_token
                        }
                    })
                    .then(response => response.json())
                    .then(jsonResponse2 => {
                        console.log(jsonResponse2)
                        if(jsonResponse2.success){
                            console.log(jsonResponse2);
                        }
                    })
                    .catch(err=>{
                        console.log(err);
                    })
                    
                }
            })
    }

    const onGuestPressed = async () => {
        if (name == '')
            return;
        await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`)
            .then(response => response.json())
            .then(async (responseJson) => {
                if (responseJson.success) {
                    try {
                        const jsonValue = JSON.stringify({
                            type: 'guest',
                            name,
                            id: responseJson.guest_session_id
                        });
                        await AsyncStorage.setItem('session', jsonValue);
                        console.log(jsonValue, responseJson);
                        navigation.navigate('Trending')
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log(responseJson.status_message);
                }
            })
    }
    return (
        <View style={{ marginTop: 50 }}>
            <View style={rowDetail}>
                <TouchableOpacity style={buttons} onPress={viewGuestForm}>
                    <Text style={buttonText}>Login as a guest</Text>
                </TouchableOpacity>
                <TouchableOpacity style={buttons} onPress={viewLoginForm}>
                    <Text style={buttonText}> Login as a user</Text>
                </TouchableOpacity>
            </View>
            {
                state >= 1 ? null : (
                    <View style={{margin:7}}>
                        <Text style={{alignSelf:'center',fontSize:18}}>Guest Login </Text>
                        <Text>You have limited permissions you can only rate movie/tv show/tv episode</Text>
                        <Text style={{alignSelf:'center',fontSize:18}}>User Login</Text>
                        <Text>You have many permissions more than rating movies or tv series you can make your own list of favourite or watch list as well</Text>
                    </View>
                )
            }
            {
                state < 1 ? null : (state == 1 ? <GuestLogin onPress={onGuestPressed} onChangeText={onTextChange} /> : <UserLogin onPress={onUserPress} onChangeText={onTextChange} onChangePassword={onChangePassword} />)
            }

        </View>
    )
}

export default LoginScreen