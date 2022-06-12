import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
// import postReducer from "./modules/postSlice";
import user from "./modules/user";;

const middlewares = [thunk];
const rootReducer = combineReducers({ user })
const enhancer = applyMiddleware(...middlewares);

const store = createStore(rootReducer, enhancer);

export default store;
//
