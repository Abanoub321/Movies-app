import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { SearchComponent } from '../Components/SearchComponent';
import { PaginationComponent } from '../Components/SimplePaginationComponent';
import { rowDetail } from '../styles';
import { API_KEY } from '@env';
const DiscoverSeries = ({ navigation }) => {
    const [sortBy, setSortBy] = useState('popular');
    const [genreId, setGenreId] = useState('');
    const [genres, setGenres] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [tv, setTV] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [pageNo, setPageNo] = useState(1)
    const [totalPages, setTotalPages] = useState(Number.MAX_VALUE);
    const [lastFetched, setLastFetched] = useState('data');

    const sortByArray = [{
        label: 'Popularity',
        value: 'popular'
    },
    {
        label: 'Top Rated',
        value: 'top_rated'
    }
    ]
    useEffect(() => {

        if (lastFetched == 'data') {
            fetchData();
        }
        else if (lastFetched == 'genre') {
            fetchGenre();
        } else if (lastFetched == 'search') {
            fetchSearch();
        }

    }, [fetched, lastFetched, pageNo])

    const fetchData = async () => {
        let url = `https://api.themoviedb.org/3/tv/${sortBy}?api_key=${API_KEY}&page=${pageNo}`;
        let response = await fetch(url);
        let tvData = await response.json();
        url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setFetched(true);
                setGenres(response.genres)
            })
        setTV(tvData.results);
        setTotalPages(tv.total_pages);
        setLastFetched('data')
    }
    const fetchGenre = async () => {
        let url = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&sort_by=popularity.desc&with_genres=${genreId}&page=${pageNo}`
        let response = await fetch(url)
            .then(response => response.json())
            .then(setFetched(true))
        setTotalPages(response.total_pages);
        setTV(response.results);
    }
    const fetchSearch = async () => {
        let url = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&query=${searchText}&page=${pageNo}`;
        let response = await fetch(url)
            .then(response => response.json())
        setTV(response.results);
        setTotalPages(response.total_pages);
        setFetched(true)
    }

    const onRefresh = () => {
        setFetched(false);
    }
    const changeSortBy = (item) => {
        setLastFetched('data');
        setSortBy(item);
        setPageNo(1);
        onRefresh();
    }
    const changeGenre = (item) => {
        setLastFetched('genre');
        setGenreId(item);
        setPageNo(1);
        onRefresh();
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
                <View style={{margin:15}}>
                    <SearchComponent onChangeText={onChangeText} onPress={onPress} />
                </View>
                <FlatList
                    refreshControl={
                        <RefreshControl refreshing={!fetched} onRefresh={onRefresh} />
                    } initialNumToRender={3}
                    numColumns={2}
                    data={tv}
                    renderItem={(item) =>
                        <RenderItemAppearence
                            item={{
                                itemId: item.item.id,
                                itemName: item.item.title,
                                itemPoster: item.item.poster_path,
                                itemType: 'tv',
                                previosState: ''
                            }}
                            navigation={navigation}
                        />
                    }
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={() => {
                        return (
                            <View>
                                <View style={rowDetail}>
                                    <Picker
                                        mode='dropdown'
                                        onValueChange={changeSortBy}
                                        selectedValue={sortBy}
                                        style={{ height: 100, width: 150 }}
                                    >
                                        {
                                            sortByArray.map(item => {
                                                return (
                                                    <Picker.Item
                                                        label={item.label}
                                                        value={item.value}
                                                        key={item.value[0]}

                                                    />
                                                );
                                            })
                                        }
                                    </Picker>
                                    <Picker
                                        mode='dialog'
                                        onValueChange={changeGenre}
                                        selectedValue={genreId}
                                        style={{ height: 100, width: 150 }}
                                    >
                                        <Picker.Item
                                            label={'Genre'}
                                            value={''}
                                            key={0 + 'xx'}
                                            enabled={false}
                                        />
                                        {
                                            genres.map(item => {
                                                return (
                                                    <Picker.Item
                                                        label={item.name}
                                                        value={item.id}
                                                        key={item.id + 'xx'}

                                                    />
                                                );
                                            })

                                        }
                                    </Picker>

                                </View>
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

export default DiscoverSeries;