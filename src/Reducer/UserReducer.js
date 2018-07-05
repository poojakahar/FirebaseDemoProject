import {SAVE, GET, EDIT} from "../Action/ActionType";

const INITIAL_STATE={
  id: '',
  userData: {},
}

export default UserReducer=(state=INITIAL_STATE,action)=>{
  switch(action.type) {
    case SAVE:
      return{
        ...state,
        id: action.payload,
      }

    case GET:
      return{
        ...state,
        userData: action.payload,
      }

    case EDIT:
      return{
        ...state,
        id: action.payload,
      }
    default:
      return state
  }
}