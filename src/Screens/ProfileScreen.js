import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import {connect } from 'react-redux';
import {removeSession} from '../actions';
import { rowDetail } from '../styles';
const ProfileScreen = (props) => {
    const {removeSession,navigation} = props;
    return (
        <View>
            <View style={rowDetail}>
               <Text>Profile Screen</Text>
               <TouchableOpacity onPress={removeSession}>
                   <Text>
                    Remove Profile
                   </Text>
               </TouchableOpacity>
            </View>
           
        </View>
    )
}

export default connect(null,{removeSession})(ProfileScreen);