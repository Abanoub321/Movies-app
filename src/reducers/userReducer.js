
import {getUserAsync,deleteUserAsync, getTokenString, addUser, addGuest} from '../actions/constStrings'
const INITIAL_STATE ={
    name: '',
    type:'',
    id:'',
    error:'',
    session_id:'',
    token:''
}
export default (state = INITIAL_STATE,action)=>{

   switch (action.type) {
       case getUserAsync:
           return action.payload;
        case deleteUserAsync:
            return INITIAL_STATE;
        case getTokenString:
            return {...state,token:action.payload};
        case addUser:
            return action.payload;
        case addGuest:
            return action.payload;
       default:
           return state;
   }
};