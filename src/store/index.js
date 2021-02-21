import { createStore, combineReducers, applyMiddleware } from 'redux'
import { boardReducer, leaderBoardReducer } from './reducers/index'
import thunk from "redux-thunk";

const reducers = combineReducers({ boardReducer, leaderBoardReducer })

const store = createStore(reducers, applyMiddleware(thunk))

export default store    