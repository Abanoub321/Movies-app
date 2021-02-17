import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, Touchable } from 'react-native';
import { connect } from 'react-redux';
import { API_KEY } from '@env';
import { addToListsAction } from '../actions';
function mapStateToProps(state) {

    return {
        movie: state.Movie.movie,
        tv: state.tv.tv,
        user: state.user,
        movieWatchList: state.Movie.watchList,
        tvWatchList: state.tv.watchList
    };
}

const FavoriteComponent = (props) => {
    const { type, movie, tv, user, movieWatchList, tvWatchList, addToListsAction } = props;
    const [isListed, setIsListed] = useState(false)
    
    useEffect(() => {
        if (type == 'movie') {
            movieWatchList ? setIsListed(true) : setIsListed(false);
        }
        else {
            tvWatchList ? setIsListed(true) : setIsListed(false);
        }
    }, [movieWatchList, tvWatchList])
    
    const addToList = async () => {
       
        if (user.type == 'user') {
            const id = type == 'movie' ? movie.id : tv.id;
            const markAs = type == 'movie' ? movieWatchList : tvWatchList;
            const item = type == 'movie' ? movie : tv;
            addToListsAction(user, type, id, markAs, item);
        }
        else {

        }
    }

    return (

        <View
            style={{
                flex: 1,
                padding: 5,
                flexDirection: 'row',
                justifyContent: 'center'
            }}
        >
            <TouchableOpacity
                onPress={addToList}
            >
                <Image
                    source={
                        !isListed?
                        require('../../assets/Star.png'):
                        require('../../assets/GoldenStar.png')
                    }
                    style={{ width: 45, height: 45 }}
                />
            </TouchableOpacity>

        </View>

    );

}

export default connect(
    mapStateToProps, {
    addToListsAction
}
)(FavoriteComponent);