import { applyMiddleware, combineReducers, createStore } from "redux";
import createSagaMiddleWare from "redux-saga";
import chatSaga from "./sagas/chat.saga";
import wsSaga from "./sagas/ws.saga";

import chatReducer from "./state/chatReducer";

const reducer = combineReducers({
    chat: chatReducer
})

const sagaMiddleware = createSagaMiddleWare();
const middlewares = [sagaMiddleware];

const store = createStore(reducer, {}, applyMiddleware(...middlewares));

[chatSaga, wsSaga].map(saga => 
    sagaMiddleware.run(saga)
);

export default store;