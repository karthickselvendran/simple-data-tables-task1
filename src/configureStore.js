import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Reducer from './reducer/Reducer';

const middlewares = [thunk];

const { logger } = require(`redux-logger`);
middlewares.push(logger);

const composeEnhancers = composeWithDevTools({});

export const store = createStore(Reducer, composeEnhancers(applyMiddleware(...middlewares)));