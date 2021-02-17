import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { API_KEY } from '@env';
import { removeSession } from '../actions';
import { centerdAboveDetail, rowDetail } from '../styles';
const ProfileScreen = (props) => {
    const { removeSession, navigation, id } = props;
    useEffect(() => {
        f();
    })
    const f = async () => {
        const result = await fetch(`https://api.themoviedb.org/3/account?api_key=${API_KEY}&session_id=${id}`)
            .then(response => response.json())

    }
    return (
        <View>
            <View style={centerdAboveDetail}>
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
const mapStateToProps = state => {
    //console.log(state.user)
    return { id: state.user.session_id }
}
export default connect(mapStateToProps, { removeSession })(ProfileScreen);