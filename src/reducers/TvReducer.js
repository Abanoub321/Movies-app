import { fetchTvDataString } from "../actions/constStrings";

const INITIAL_STATE = {
    tv: {},
    credits: {},
    externalIds: {},
    images: {},
    similar: {},
    videos: [],
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchTvDataString: {

            const { tv, credits, externalIds, images, similar, videos } = action.payload;
            return {
                ...state,
                tv,
                credits,
                externalIds,
                images,
                similar,
                videos
            }
        }
        default:
            return state;
    }
};