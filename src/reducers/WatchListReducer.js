import { changeListString, fetchMovieWatchListString, fetchTvWatchListString } from "../actions/constStrings";

const INITIAL_STATE = {
    tvs: [],
    movies: [],
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchMovieWatchListString:
            return { ...state, movies: action.payload };
        case fetchTvWatchListString:
            return { ...state, tvs: action.payload };
        case changeListString:
            {
                const { type, item,markAs } = action.payload;
                let newState;
                if (type == 'movie') {
                    newState = { ...state };
                    if(markAs)
                        newState.movies.push(item);
                    else
                        newState.movies = newState.movies.filter((movie)=> movie.id!=item.id);
                }
                else {

                    newState = { ...state };
                    if(markAs)
                        newState.tvs.push(item);
                    else
                        newState.tvs = newState.tvs.filter((tv)=> tv.id!=item.id);
                }
                return newState
            }
        default:
            return state;
    }
};