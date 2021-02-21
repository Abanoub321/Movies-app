import React, { useEffect } from 'react';
import { View } from 'react-native'
import { useState } from 'react/cjs/react.development';
import {connect} from 'react-redux';
import {fetchMovieWatchList} from '../actions';

import ItemsFlatList from '../Components/ItemsFlatList';


const MoviesWatchList = (props) => {
    const [fetched, setFetched] = useState(false);
    const {navigation,fetchMovieWatchList,user,moviesWatchList} = props;
    useEffect(() => {
        fetchMovieWatchList(user.id,user.session_id);
        setTimeout(() => {
            setFetched(true);
        }, 1250)
    }, [fetched]);

    const onRefresh = () => setFetched(false);

    return (
        <View>
            <ItemsFlatList navigation={navigation} fetched={fetched} onRefresh={onRefresh} items = {moviesWatchList}/>
        </View>
    )
}
const mapStateToProps = state =>{
    return {
        user:state.user,
        moviesWatchList:state.WatchList.movies
    }
}
export default connect(mapStateToProps,{fetchMovieWatchList}) (MoviesWatchList);