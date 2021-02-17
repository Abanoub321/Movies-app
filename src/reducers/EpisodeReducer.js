import { fetchEpisodeString, onEpisodeScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    episode: {},
    cast: {},
    guest:{},
    images: {},
    externalIds: {},
    videos: [],
    errors: '',
    fetched:false
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchEpisodeString: {
            return{...state,...action.payload,fetched:true}
        }
        case onEpisodeScreenRefresh:
            return {...state,fetched:false}
        default:
            return state;
    }
};