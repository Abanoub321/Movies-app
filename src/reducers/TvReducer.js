import { addTvRatingString, changeListTV, fetchTvDataString, onTvScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    tv: {},
    credits: {},
    externalIds: {},
    images: {},
    similar: {},
    videos: [],
    watchList:false,
    fetched: false,
    rating:0,
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchTvDataString: {

            const { tv, credits, externalIds, images, similar, videos,watchList,rating } = action.payload;
            return {
                ...state,
                tv,
                credits,
                externalIds,
                images,
                similar,
                videos,
                watchList,
                fetched:true,
                rating
            }
        }
        case changeListTV:
            return {...state,watchList:action.payload}
        case onTvScreenRefresh:
            return {...state,fetched:false}
        case addTvRatingString:
            return {...state,rating:action.payload}
        default:
            return state;
    }
};