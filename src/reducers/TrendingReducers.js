import { getTrendings, errors } from '../actions/constStrings';
const INITIAL_STATE = {
    movies: [],
    tv: [],
    person: [],
    errors: ''
}
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case getTrendings:
            {
                const { moviesData, tvData, personData } = action.payload;
                return {
                    ...state,
                    movies: moviesData.results,
                    tv: tvData.results,
                    person: personData.results
                }
            }
        case errors :
            return {...state,errors:action.payload}
        default:
            return state;
    }
};