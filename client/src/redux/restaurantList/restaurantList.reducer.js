import restaurantListTypes from "./restaurantList.type";

const initialState = {
  mapCenter: {
    lat: 24.953881,
    lng: 121.225525,
  },
  restaurantList: [],

  searchField: "",
  loading: false,
  error: "",
};

const restaurantListReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantListTypes.FETCH_RESTAURANT_REQUEST: {
      return {
        ...state,
        restaurantList: [],
        searchField: "",
        loading: true,
        error: "",
      };
    }

    case restaurantListTypes.FETCH_RESTAURANT_SUCCESS: {
      return {
        ...state,
        restaurantList: action.payload,
        searchField: action.searchField,
        loading: false,
        error: "",
      };
    }

    case restaurantListTypes.FETCH_RESTAURANT_FAILURE: {
      return {
        ...state,
        restaurantList: [],
        searchField: action.searchField,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default restaurantListReducer;