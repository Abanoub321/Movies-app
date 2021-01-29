import {combineReducers} from 'redux';
import userReducer from './userReducer';
import trendingReducer from './TrendingReducers';
import Movie from './MovieReducer';
import tv from './TvReducer';
import season from './SeasonReducer';
import episode from './EpisodeReducer';
import person from './PersonReducer';
export default combineReducers({
    user : userReducer,
    Trending: trendingReducer,
    Movie,
    tv,
    season,
    episode,
    person
});