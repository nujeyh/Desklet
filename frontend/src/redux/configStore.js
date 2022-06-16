import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import user from "./modules/user";
import post from "./modules/post";
import comment from "./modules/comment";

const middlewares = [thunk];
const rootReducer = combineReducers({ user, post, comment });
const enhancer = applyMiddleware(...middlewares);
const store = createStore(rootReducer, enhancer);

export default store;
