import { getTrendings, trendingErrors,onHomeRefresh } from '../actions/constStrings';
const INITIAL_STATE = {
    movies: [],
    tv: [],
    person: [],
    errors: '',
    fetched:false
}
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case getTrendings:
            {
                const { moviesData, tvData, personData } = action.payload;
                return {
                    ...state,
                    movies: moviesData,
                    tv: tvData,
                    person: personData,
                    fetched:true
                }
            }
        case trendingErrors :
            return {...state,errors:action.payload}
        case onHomeRefresh:
            return {...state,fetched:false}
        default:
            return state;
    }
};