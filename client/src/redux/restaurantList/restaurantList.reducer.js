import restaurantListTypes from "./restaurantList.type";

const initialState = {
  mapCenter: {
    lat: 24.953881,
    lng: 121.225525,
  },
  restaurantList: [],
  selectedRestaurant: {},

  searchField: "",
  loading: false,
  error: "",
  navigationFlag: false,
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
        navigationFlag: false,
      };
    }

    case restaurantListTypes.FETCH_RESTAURANT_SUCCESS: {
      let addNewPropertyArray = action.payload;

      addNewPropertyArray.forEach((restaurant) => {
        restaurant.selected = false;
        restaurant.duration = {
          distance: { text: "" },
          duration: { text: "" },
        };
      });

      return {
        ...state,
        restaurantList: addNewPropertyArray,
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

    case restaurantListTypes.SET_LIST_ORDER: {
      const copyList = state.restaurantList.slice();
      let newOrderArray = [];
      switch (action.payload) {
        case "distance":
          newOrderArray = copyList.sort(function (a, b) {
            return a.duration.distance.value > b.duration.distance.value
              ? 1
              : -1;
          });
          return {
            ...state,
            restaurantList: newOrderArray,
          };

        case "rating":
          newOrderArray = copyList.sort(function (a, b) {
            return a.rating < b.rating ? 1 : -1;
          });
          return {
            ...state,
            restaurantList: newOrderArray,
          };

        default:
          return {
            ...state,
          };
      }
    }

    case restaurantListTypes.SELECT_RESTAURANT: {
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    }

    case restaurantListTypes.RESTAURANT_NAVIGATION: {
      return {
        ...state,
        navigationFlag: action.payload,
      };
    }
    default:
      return state;
  }
};

export default restaurantListReducer;
