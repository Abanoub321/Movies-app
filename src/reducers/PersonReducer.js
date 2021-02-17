import { fetchPersonString, onPersonScreenRefresh } from "../actions/constStrings";

const INITIAL_STATE = {
    person:{},
    credits:{},
    externalIds:{},
    images:{},
    fetched:false,
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchPersonString: {
            return{...state,...action.payload,fetched:true}
        }
        case onPersonScreenRefresh:
            return {...state,fetched:false}
        default:
            return state;
    }
};