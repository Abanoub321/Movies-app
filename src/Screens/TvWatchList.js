import React, { useEffect } from 'react';
import { View } from 'react-native'
import { useState } from 'react/cjs/react.development';
import { connect } from 'react-redux';
import { fetchTvWatchList } from '../actions';
import ItemsFlatList from '../Components/ItemsFlatList';

const TvWatchList = (props) => {
    const [fetched, setFetched] = useState(false);
    const { navigation,fetchTvWatchList,user,tvWatchList } = props;
    useEffect(() => {
        fetchTvWatchList(user.id,user.session_id);
        setTimeout(() => {
            setFetched(true);
        }, 1250)
    }, [fetched]);

    const onRefresh = () => setFetched(false);

    return (
        <View>
            <ItemsFlatList navigation={navigation} fetched={fetched} onRefresh={onRefresh} items={tvWatchList} />
        </View>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user,
        tvWatchList: state.WatchList.tvs
    }
}

export default connect(mapStateToProps, {
    fetchTvWatchList
})(TvWatchList);