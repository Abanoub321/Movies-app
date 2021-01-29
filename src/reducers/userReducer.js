
import {getUserAsync,deleteUserAsync} from '../actions/constStrings'
const INITIAL_STATE ={
    name: '',
    type:'',
    id:''
}
export default (state = INITIAL_STATE,action)=>{

   switch (action.type) {
       case getUserAsync:
           return action.payload;
        case deleteUserAsync:
            return INITIAL_STATE;
       default:
           return state;
   }
};