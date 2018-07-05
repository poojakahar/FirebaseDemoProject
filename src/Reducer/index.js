import {combineReducers} from 'redux';
import UserReducer from "./UserReducer";

const AppReducer=combineReducers({
  User: UserReducer,
});

export default AppReducer;