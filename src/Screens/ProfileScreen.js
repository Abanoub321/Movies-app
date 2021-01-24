import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import  AsyncStorage from '@react-native-async-storage/async-storage';
import { GuestLogin } from '../Components/LoginComponent'
import { rowDetail } from '../styles';
import { apiKey } from '../../Env';
import { TextInput } from 'react-native-gesture-handler';
const ProfileScreen = ({navigation}) => {
    
    return (
        <View>
            <View style={rowDetail}>
               <Text>Profile Screen</Text>
            </View>
           
        </View>
    )
}

export default ProfileScreen;