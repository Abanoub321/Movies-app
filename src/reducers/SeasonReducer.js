import { fetchSeasonString, onSeasonScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    season: {},
    cast: {},
    images: {},
    externalIds: {},
    videos: [],
    errors: '',
    fetched:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchSeasonString: {
            return{...state,...action.payload,fetched:true}
        }
        case onSeasonScreenRefresh:
            return {...state,fetched:false}
        default:
            return state;
    }
};