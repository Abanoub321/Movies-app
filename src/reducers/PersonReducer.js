import { fetchPersonString } from "../actions/constStrings";

const INITIAL_STATE = {
    person:{},
    credits:{},
    externalIds:{},
    images:{},
    errors: ''
};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case fetchPersonString: {
            return{...state,...action.payload}
        }
        default:
            return state;
    }
};