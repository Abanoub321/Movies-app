import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    getUserAsync,
    deleteUserAsync,
    getTrendings,
    errors,
    fetchMovieString,
    fetchTvDataString,
    fetchSeasonString,
    fetchEpisodeString,
    fetchPersonString,
    getTokenString,
    addUser,
    addGuest,
    fetchTvWatchListString,
    fetchMovieWatchListString,
    changeListString,
    changeListMovie,
    changeListTV
} from './constStrings';
import { apiKey } from '../../Env';


export const retriveUserData = () => {
    return async (dispatch) => {
        try {
            const jsonValue = await AsyncStorage.getItem('session');
            if (jsonValue != null) {
                dispatch({
                    type: getUserAsync,
                    payload: JSON.parse(jsonValue)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }
}


export const loginAsGuest = (name) => {
    return async (dispatch) => {
        await fetch(`https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${apiKey}`)
            .then(response => response.json())
            .then(async (responseJson) => {
                if (responseJson.success) {
                    try {
                        const user = {
                            type: 'guest',
                            name,
                            id: responseJson.guest_session_id
                        };
                        const jsonValue = JSON.stringify(user);
                        await AsyncStorage.setItem('session', jsonValue);
                        dispatch({
                            type: addGuest,
                            payload: user
                        })
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log(responseJson.status_message);
                }
            })
    }
}

export const getToken = () => {
    return async (dispatch) => {
        const result = await fetch(`https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`)
            .then(response => response.json());
        if (result.success) {
            const token = result.request_token;
            console.log(token);
            dispatch({
                type: getTokenString,
                payload: token
            })
        }
    }
}

export const loginAsUser = (name, token) => {

    return async (dispatch) => {
        console.log(token)
        const result = await fetch(`https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'request_token': token
            })
        })
            .then(response => response.json());
        if (result.success) {
            const result2 = await fetch(`https://api.themoviedb.org/3/account?api_key=${apiKey}&session_id=${result.session_id}`)
                .then(response => response.json());
            console.log(result2);
            try {
                const user = {
                    type: 'user',
                    name: name,
                    session_id: result.session_id,
                    id: result2.id
                }
                console.log(user);
                const jsonValue = JSON.stringify(user);
                await AsyncStorage.setItem('session', jsonValue);
                dispatch({
                    type: addUser,
                    payload: user
                })
            } catch (error) {
                console.log(error);
            }
        }
        else {
            console.log(result)
        }
    }
}

export const removeSession = () => {
    return async (dispatch) => {
        await AsyncStorage.removeItem('session')
            .catch(err => {
                {
                    console.log(err);
                }
            })
        console.log('deleted');
        dispatch({
            type: deleteUserAsync,
            payload: null
        })
    }
}


export const fetchTrendingData = () => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`;
        moviesData = await fetch(url)
            .then(response => response.json())
            .catch(err => {
                dispatch({
                    type: errors,
                    payload: err
                })
            });
        url = `https://api.themoviedb.org/3/trending/tv/day?api_key=${apiKey}`;
        tvData = await fetch(url)
            .then(response => response.json())
            .catch(err => {
                dispatch({
                    type: errors,
                    payload: err
                })
            });
        url = `https://api.themoviedb.org/3/trending/person/day?api_key=${apiKey}`;
        personData = await fetch(url)
            .then(response => response.json())
            .catch(err => {
                dispatch({
                    type: errors,
                    payload: err
                })
            });
        moviesData = moviesData.results.map((movie) => {
            return {
                id: movie.id,
                title: movie.title,
                image: movie.poster_path,
                type: 'movie'
            }
        });
        tvData = tvData.results.map((tv)=>{
            return {
                id: tv.id,
                title: tv.name,
                image: tv.poster_path,
                type: 'tv'
            }
        });
        personData = personData.results.map((person)=>{
            return {
                id: person.id,
                title: person.name,
                image: person.profile_path,
                type: 'person'
            }
        })
        dispatch({
            type: getTrendings,
            payload: {
                moviesData,
                tvData,
                personData
            }
        })
    }
}


export const fetchMovie = (movieId, accountId, sessionId) => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let movie = await response.json();
        url = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let creditsData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${movieId}/external_ids?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let externalIdsData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let imagesData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${apiKey}&page=1`;
        response = await fetch(url);
        let similarMoviesData = await response.json();
        url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let videosData = await response.json();
        response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${apiKey}&session_id=${sessionId}`)
            .then(response => response.json())

        let watchList = response.results.filter((result) => result.id == movie.id);
        if (watchList.length >= 1)
            watchList = true;
        else
            watchList = false;
        dispatch({
            type: fetchMovieString,
            payload: {
                movie,
                credits: creditsData,
                externalIds: externalIdsData,
                images: imagesData.backdrops.concat(imagesData.posters),
                similarMovies: similarMoviesData.results,
                videos: videosData.results,
                watchList
            }
        })
    }
}



export const fetchTvData = (tvId, accountId, sessionId) => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/tv/${tvId}?api_key=${apiKey}&language=en-US`;
        let response = await fetch(url);
        let tv = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/credits?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let tvCreditsData = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/external_ids?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let tvExternalIds = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=${apiKey}&language=en-US`;
        response = await fetch(url);
        let tvVideos = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let tvImages = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/similar?api_key=${apiKey}`;
        response = await fetch(url);
        let tvSimilar = await response.json();
        response = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=${apiKey}&session_id=${sessionId}`)
            .then(response => response.json());

        let watchList = response.results.filter((result) => result.id == tv.id);
        if (watchList.length >= 1)
            watchList = true;
        else
            watchList = false;
        dispatch({
            type: fetchTvDataString,
            payload: {
                tv,
                credits: tvCreditsData,
                externalIds: tvExternalIds,
                images: tvImages.backdrops.concat(tvImages.posters),
                similar: tvSimilar.results,
                videos: tvVideos.results,
                watchList
            }
        })
    }
}

export const fetchSeasonData = (tvId, seasonNo) => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let season = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/credits?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonCredits = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonImages = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/external_ids?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonExternalIds = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonVideos = await response.json();
        dispatch({
            type: fetchSeasonString,
            payload: {
                season,
                cast: seasonCredits.cast,
                images: seasonImages.posters,
                externalIds: seasonExternalIds,
                videos: seasonVideos.results
            }
        });

    }
}

export const fetchEpisodeData = (tvId, seasonNo, episodeNo) => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}?api_key=${apiKey}`;
        let response = await fetch(url);
        let episodeData = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}/credits?api_key=${apiKey}`;
        response = await fetch(url);
        let credits = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let images = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}/external_ids?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonExternalIds = await response.json();
        url = `https://api.themoviedb.org/3/tv/${tvId}/season/${seasonNo}/episode/${episodeNo}/videos?api_key=${apiKey}`;
        response = await fetch(url);
        let seasonVideos = await response.json();
        dispatch({
            type: fetchEpisodeString,
            payload: {
                episode: episodeData,
                cast: credits.cast,
                guest: credits.guest_stars,
                externalIds: seasonExternalIds,
                videos: seasonVideos.results,
                images: images.stills
            }
        })
    }
}

export const fetchPersonData = (id) => {
    return async (dispatch) => {
        let url = `https://api.themoviedb.org/3/person/${id}?api_key=${apiKey}`;
        let response = await fetch(url);
        let personData = await response.json();
        url = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${apiKey}`;
        response = await fetch(url);
        let creditsData = await response.json();
        url = `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${apiKey}`;
        response = await fetch(url);
        let externalIdsData = await response.json();
        url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${apiKey}`;
        response = await fetch(url);
        let imagesData = await response.json();
        dispatch({
            type: fetchPersonString,
            payload: {
                person: personData,
                credits: creditsData,
                externalIds: externalIdsData,
                images: imagesData,
            }
        })
    }
}

export const fetchMovieWatchList = (accountId, sessionId) => {
    return async (dispatch) => {
        const result = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${apiKey}&session_id=${sessionId}`)
            .then(response => response.json())
            .then(response => {

                return response.results.map((result) => {
                    return {
                        image: result.poster_path,
                        id: result.id,
                        title: result.title,
                        type: 'movie'
                    }
                })

            })
        dispatch({
            type: fetchMovieWatchListString,
            payload: result
        })
    }
}


export const fetchTvWatchList = (accountId, sessionId) => {
    return async (dispatch) => {

        const result = await fetch(`https://api.themoviedb.org/3/account/${accountId}/watchlist/tv?api_key=${apiKey}&session_id=${sessionId}`)
            .then(response => response.json())
            .then(response => {
                return response.results.map((result) => {
                    return {
                        image: result.poster_path,
                        id: result.id,
                        title: result.name,
                        type: 'tv'
                    }
                })
            })
        dispatch({
            type: fetchTvWatchListString,
            payload: result
        })
    }
}

export const addToListsAction = (user, type, itemID, markAs, item) => {
    return async (dispatch) => {
        const result = await fetch(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${apiKey}&session_id=${user.session_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                "media_type": type,
                "media_id": itemID,
                "watchlist": !markAs
            })
        }).then(response => response.json());
        const name = type == 'movie' ? item.title : item.name;
        if (result.success) {
            console.log('success')

            dispatch({
                type: changeListString,
                payload: {

                    item: {
                        id: item.id,
                        image: item.poster_path,
                        type,
                        title: name
                    },
                    markAs: !markAs,
                    type
                }
            })
            dispatch({
                type: type == 'movie' ? changeListMovie : changeListTV,
                payload: !markAs
            })
        }
        else {
            console.log(result.status_message)
        }
    }
}

export const onPageRefersh = (string, value) => {
    return {
        type: string,
        payload: value
    }
}