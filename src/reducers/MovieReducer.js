import { changeListMovie, fetchMovieString, onMovieScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    movie: {},
    credits: {},
    externalIds: {},
    images: {},
    similarMovies: {},
    videos: [],
    watchList: false,
    fetched:false,
    errors: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case fetchMovieString:
            const { movie, credits, externalIds, images, similarMovies, videos, watchList } = action.payload;
            return {
                ...state,
                movie,
                credits,
                externalIds,
                images,
                similarMovies,
                videos,
                watchList,
                fetched:true
            }
        case changeListMovie:
            return { ...state, watchList: action.payload }
        case onMovieScreenRefresh:
            return {fetched:false}
        default:
            return state;
    }
};