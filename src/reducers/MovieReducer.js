import {  fetchMovieString } from "../actions/constStrings";

const INITIAL_STATE = {
    movie: {},
    credits:{},
    externalIds:{},
    images:{},
    similarMovies:{},
    videos:[],
    errors: ''
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case fetchMovieString:
            const {movie,credits,externalIds,images,similarMovies,videos} = action.payload;
            return {
                ...state,
                movie,
                credits,
                externalIds,
                images,
                similarMovies,
                videos
            }
        default:
            return state;
    }
};