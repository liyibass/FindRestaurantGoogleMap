import restaurantListTypes from "./restaurantList.type";

const initialState = {
  mapCenter: {
    lat: 24.953881,
    lng: 121.225525,
  },
  restaurantList: [],
  searchField: { type: "小吃", radius: 500 },
  selectedRestaurant: {},
  destination: {},
  loading: false,
  error: "",
  mapApi: {},
};

const restaurantListReducer = (state = initialState, action) => {
  switch (action.type) {
    case restaurantListTypes.FETCH_RESTAURANT_REQUEST: {
      return {
        ...state,
        restaurantList: [],
        loading: true,
        error: "",
        navigationFlag: false,
      };
    }

    case restaurantListTypes.FETCH_RESTAURANT_SUCCESS: {
      // 為每個restaurant添加distance props
      let addNewPropertyArray = action.payload;
      const destinationArray = addNewPropertyArray.map((restaurant) => {
        return restaurant.geometry.location;
      });

      // 使用map api的DistanceMatrixService
      const service = new state.mapApi.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [state.mapCenter],
          destinations: destinationArray,
          travelMode: "WALKING",
        },
        callback
      );
      function callback(response, status) {
        if (response === null) {
          return null;
        } else if (response.rows.length) {
          const durations = response.rows[0].elements;
          // 一個個加入每個餐廳的props
          addNewPropertyArray.forEach((restaurant, index) => {
            restaurant.duration = durations[index];
          });
        }
      }

      return {
        ...state,
        restaurantList: addNewPropertyArray,
        searchField: action.searchField,
        selectedRestaurant: addNewPropertyArray[0],
        loading: false,
        error: "",
      };
    }

    case restaurantListTypes.FETCH_RESTAURANT_FAILURE: {
      return {
        ...state,
        restaurantList: [],
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

    case restaurantListTypes.SET_SELECT_RESTAURANT: {
      return {
        ...state,
        selectedRestaurant: action.payload,
      };
    }

    case restaurantListTypes.RESTAURANT_NAVIGATION: {
      return {
        ...state,
        destination: action.payload,
      };
    }

    case restaurantListTypes.SET_MAP_API: {
      console.log(action.payload);
      return {
        ...state,
        mapApi: action.payload,
      };
    }

    default:
      return state;
  }
};

export default restaurantListReducer;
