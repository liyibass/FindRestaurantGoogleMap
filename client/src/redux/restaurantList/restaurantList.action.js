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

export const fetchRestaurantListFromApi = (searchField, mapCenter) => {
  return function (dispatch) {
    const url = `type=${searchField.type}&radius=${searchField.radius}&lat=${mapCenter.lat}&lng=${mapCenter.lng}`;
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

export const setListOrder = (orderType) => {
  return {
    type: restaurantListTypes.SET_LIST_ORDER,
    payload: orderType,
  };
};

export const setSelectedRestaurant = (restaurant) => {
  return {
    type: restaurantListTypes.SELECT_RESTAURANT,
    payload: restaurant,
  };
};
