import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator, TouchableOpacity, Text, Touchable } from 'react-native'
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { SearchComponent } from '../Components/SearchComponent';
import { PaginationComponent } from '../Components/SimplePaginationComponent';
import { API_KEY } from '@env';
import { rowDetail } from '../styles';
const DiscoverPeople = ({ navigation }) => {

    const [fetched, setFetched] = useState(false);
    const [person, setPerson] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(Number.MAX_VALUE);
    const [lastFetched, setLastFetched] = useState('data');
    useEffect(() => {

        if (lastFetched == 'data') {
            fetchData();
        }
        else if (lastFetched == 'search') {
            fetchSearch();
        }

    }, [fetched, lastFetched, pageNo])

    const fetchData = async () => {
        let url = `https://api.themoviedb.org/3/person/popular?api_key=${API_KEY}&page=${pageNo}`;
        let response = await fetch(url);
        let personData = await response.json();

        setPerson(personData.results);
        setTotalPages(personData.total_pages);
        setLastFetched('data')
        setFetched(true)

    }

    const fetchSearch = async () => {
        let url = `https://api.themoviedb.org/3/search/person?api_key=${API_KEY}&query=${searchText}&page=${pageNo}`;
        let response = await fetch(url)
            .then(response => response.json())
        setPerson(response.results);
        setTotalPages(response.total_pages);
        setFetched(true)
    }

    const onRefresh = () => {
        setFetched(false);
    }
    const onChangeText = (text) => {
        setSearchText(text)
    }
    const onPress = () => {
        if (searchText == '')
            return;
        setLastFetched('search')
        setPageNo(1);
        onRefresh();
    }
    const onNextPressed = () => {
        if (pageNo != totalPages) {
            setPageNo(pageNo + 1);
            onRefresh();
        }
    }
    const onPrevPressed = () => {
        if (pageNo != 1) {
            setPageNo(pageNo - 1);
            onRefresh();
        }
    }
    const onPopularPress =()=>{
        setLastFetched('data');
        setPageNo(1);
        onRefresh();
    }
    if (!fetched) {
        return (
            <View>
                <ActivityIndicator size="large" color='#0000ff' />
            </View>
        )
    }
    else {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ margin: 15 }}>
                    <SearchComponent onChangeText={onChangeText} onPress={onPress} />
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                    } initialNumToRender={3}
                    numColumns={2}
                    data={person}
                    renderItem={(item) =>
                        <RenderItemAppearence
                            item={{
                                itemId: item.item.id,
                                itemName: item.item.name,
                                itemPoster: item.item.profile_path,
                                itemType: 'person',
                                previosState: ''
                            }}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={item => item.id.toString()}

                    ListHeaderComponent={() => {
                        return (
                            <View style={[rowDetail,{margin:20}]}>
                                <TouchableOpacity onPress={onPopularPress}>
                                    <Text style={{padding:10,borderWidth:0.5,borderColor:'black',borderRadius:15}}>popular people</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }}

                    ListFooterComponent={() => {
                        return (
                            <PaginationComponent pageNo={pageNo} noOfPages={totalPages} pressNext={onNextPressed} pressPrev={onPrevPressed} />
                        );
                    }}
                />
            </View>

        )
    }
}

export default DiscoverPeople;