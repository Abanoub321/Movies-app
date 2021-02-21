import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { removeSession } from '../actions';
import { buttons, buttonText, centerdAboveDetail } from '../styles';
const ProfileScreen = (props) => {
    const { removeSession } = props;
    
    return (
        <View>
            <View style={[centerdAboveDetail,{margin:15}]}>
                <Text style={{fontSize:20}}>Profile Screen</Text>
                <TouchableOpacity onPress={removeSession} style={[buttons,{margin:20}]}>
                    <Text style={buttonText}>
                        Sign out
                   </Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const mapStateToProps = state => {
    return { id: state.user.session_id }
}
export default connect(mapStateToProps, { removeSession })(ProfileScreen);