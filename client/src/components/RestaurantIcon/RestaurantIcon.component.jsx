import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RestaurantIcon.style.scss";
import {
  setSelectedRestaurant,
  restaurantNavigation,
} from "../../redux/restaurantList/restaurantList.action";

function RestaurantIcon({ restaurant }) {
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );
  const dispatch = useDispatch();

  let RestaurantMarkerStyle, markerInfo;
  if (selectedRestaurant.name === restaurant.name) {
    RestaurantMarkerStyle = {
      fontSize: "3rem",
    };
    markerInfo = {
      opacity: "1",
    };
  } else {
    RestaurantMarkerStyle = {
      fontSize: "2rem",
    };
    markerInfo = {
      opacity: "0",
    };
  }
  return (
    <div
      className="RestaurantIcon"
      style={RestaurantMarkerStyle}
      onMouseEnter={() => {
        dispatch(setSelectedRestaurant(restaurant));
      }}
      onClick={() => {
        dispatch(restaurantNavigation(restaurant));
      }}
    >
      <i className="fas fa-map-pin"></i>
      <div className="markerInfo" style={markerInfo}>
        {restaurant.name}
      </div>
    </div>
  );
}

export default React.memo(RestaurantIcon);
