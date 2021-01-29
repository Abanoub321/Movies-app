import AsyncStorage from '@react-native-async-storage/async-storage';
import { getUserAsync, deleteUserAsync, getTrendings, errors, fetchMovieString, fetchTvDataString, fetchSeasonString, fetchEpisodeString, fetchPersonString } from './constStrings';
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
                        const jsonValue = JSON.stringify({
                            type: 'guest',
                            name,
                            id: responseJson.guest_session_id
                        });
                        await AsyncStorage.setItem('session', jsonValue);
                        console.log(jsonValue, responseJson);
                        retriveUserData();
                    } catch (error) {
                        console.log(error);
                    }
                } else {
                    console.log(responseJson.status_message);
                }
            })
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


export const fetchMovie = (movieId) => {
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
        dispatch({
            type: fetchMovieString,
            payload: {
                movie,
                credits: creditsData,
                externalIds: externalIdsData,
                images: imagesData.backdrops.concat(imagesData.posters),
                similarMovies: similarMoviesData.results,
                videos: videosData.results
            }
        })
    }
}



export const fetchTvData = (tvId) => {
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
        dispatch({
            type: fetchTvDataString,
            payload: {
                tv,
                credits: tvCreditsData,
                externalIds: tvExternalIds,
                images: tvImages.backdrops.concat(tvImages.posters),
                similar: tvSimilar.results,
                videos: tvVideos.results
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
            type:fetchPersonString,
            payload:{
                person:personData,
                credits:creditsData,
                externalIds:externalIdsData,
                images:imagesData,
            }
        })
    }
}