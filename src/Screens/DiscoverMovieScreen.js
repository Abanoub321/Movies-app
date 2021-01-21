import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import RenderItemAppearence from '../Components/RenderItemAppearence';
import { SearchComponent } from '../Components/SearchComponent';
import { PaginationComponent } from '../Components/SimplePaginationComponent';
import { rowDetail } from '../styles';
import { apiKey } from '../../Env';
const DiscoverMovies = ({ navigation }) => {
    const [sortBy, setSortBy] = useState('popular');
    const [genreId, setGenreId] = useState('');
    const [genres, setGenres] = useState([]);
    const [fetched, setFetched] = useState(false);
    const [movies, setMovies] = useState([]);
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
    },
    {
        label: 'UpComing',
        value: 'upcoming'
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
        let url = `https://api.themoviedb.org/3/movie/${sortBy}?api_key=${apiKey}&page=${pageNo}`;
        let response = await fetch(url);
        let moviesData = await response.json();
        url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
        fetch(url)
            .then(response => response.json())
            .then(response => {
                setGenres(response.genres)
            })
        setMovies(moviesData.results);
        setTotalPages(moviesData.total_pages);
        setLastFetched('data')
        setTimeout(() => setFetched(true), 1250)
    }
    const fetchGenre = async () => {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc&with_genres=${genreId}&page=${pageNo}`
        let response = await fetch(url)
            .then(response => response.json())
        setTotalPages(response.total_pages);
        setMovies(response.results);
        setFetched(true)
    }
    const fetchSearch = async () => {
        let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchText}&page=${pageNo}`;
        let response = await fetch(url)
            .then(response => response.json())
        setMovies(response.results);
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
                    data={movies}
                    renderItem={(item) =>
                        <RenderItemAppearence
                            item={{
                                itemId: item.item.id,
                                itemName: item.item.title,
                                itemPoster: item.item.poster_path,
                                itemType: 'movie',
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

export default DiscoverMovies;