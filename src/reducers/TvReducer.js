import { changeListTV, fetchTvDataString, onTvScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    tv: {},
    credits: {},
    externalIds: {},
    images: {},
    similar: {},
    videos: [],
    watchList:false,
    fetched: false,
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchTvDataString: {

            const { tv, credits, externalIds, images, similar, videos,watchList } = action.payload;
            return {
                ...state,
                tv,
                credits,
                externalIds,
                images,
                similar,
                videos,
                watchList,
                fetched:true
            }
        }
        case changeListTV:
            return {...state,watchList:action.payload}
        case onTvScreenRefresh:
            return {...state,fetched:false}
        default:
            return state;
    }
};