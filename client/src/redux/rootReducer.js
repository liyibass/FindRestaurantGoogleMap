import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import restaurantListReducer from "./restaurantList/restaurantList.reducer";
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["restaurantList"],
};

const rootReducer = combineReducers({
  restaurantList: restaurantListReducer,
});

export default persistReducer(persistConfig, rootReducer);
