import { addMovieRatingString, changeListMovie, fetchMovieString, onMovieScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    movie: {},
    credits: {},
    externalIds: {},
    images: {},
    similarMovies: {},
    videos: [],
    watchList: false,
    fetched:false,
    rating:0,
    errors: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case fetchMovieString:
            const { movie, credits, externalIds, images, similarMovies, videos, watchList,rating } = action.payload;
            return {
                ...state,
                movie,
                credits,
                externalIds,
                images,
                similarMovies,
                videos,
                watchList,
                fetched:true,
                rating
            }
        case changeListMovie:
            return { ...state, watchList: action.payload }
        case onMovieScreenRefresh:
            return {...state, fetched:false}
        case addMovieRatingString:
            return{
                ...state,
                rating:action.payload
            }
        default:
            return state;
    }
};