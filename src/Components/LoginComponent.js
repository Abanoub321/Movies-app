import React from 'react';
import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import { rowDetail, buttons, buttonText } from '../styles';

const GuestLogin = ({ onPress, onChangeText }) => {

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

const UserLogin = ({ onPress, onChangeText, onChangePassword }) => {
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
        </View>
    )
}

export { GuestLogin, UserLogin };