import axios from "axios";
import restaurantListTypes from "./restaurantList.type";
// import uniqid from "uniqid";

export const fetchRestaurantRequest = () => {
  return {
    type: restaurantListTypes.FETCH_RESTAURANT_REQUEST,
  };
};

export const fetchRestaurantSuccess = (restaurantList, searchField) => {
  return {
    type: restaurantListTypes.FETCH_RESTAURANT_SUCCESS,
    payload: restaurantList,
    searchField: searchField,
  };
};

export const fetchRestaurantFailure = (errorMessage) => {
  return {
    type: restaurantListTypes.FETCH_RESTAURANT_FAILURE,
    payload: errorMessage,
  };
};

export const fetchRestaurantListFromApi = (searchField) => {
  return function (dispatch) {
    const url = `type=${searchField.type}&radius=${searchField.radius}`;
    dispatch(fetchRestaurantRequest());
    axios
      .get(`http://localhost:5000/search/${url}`)
      .then((response) => {
        const restaurantList = response.data.results;
        dispatch(fetchRestaurantSuccess(restaurantList, searchField));
      })
      .catch((error) => {
        const errorMessage = error.message;

        dispatch(fetchRestaurantFailure(errorMessage));
      });
  };
};
