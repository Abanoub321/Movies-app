import { fetchEpisodeString } from "../actions/constStrings";

const INITIAL_STATE = {
    episode: {},
    cast: {},
    guest:{},
    images: {},
    externalIds: {},
    videos: [],
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchEpisodeString: {
            return{...state,...action.payload}
        }
        default:
            return state;
    }
};