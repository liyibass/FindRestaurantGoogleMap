/*
npm install redux redux-logger react-redux redux-thunk redux-persist
*/

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore } from "redux-persist";

import rootReducer from "./rootReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(...middleware))
);

export const persistor = persistStore(store);

// export default { store, persistor };
