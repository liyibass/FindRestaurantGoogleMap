import { combineReducers } from "redux";
import restaurantListReducer from "./restaurantList/restaurantList.reducer";

const rootReducer = combineReducers({
  restaurantList: restaurantListReducer,
});

export default rootReducer;
