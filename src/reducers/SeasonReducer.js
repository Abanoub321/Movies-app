import { fetchSeasonString } from "../actions/constStrings";

const INITIAL_STATE = {
    season: {},
    cast: {},
    images: {},
    externalIds: {},
    videos: [],
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchSeasonString: {
            return{...state,...action.payload}
        }
        default:
            return state;
    }
};