import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RestaurantIcon.style.scss";

function RestaurantIcon({ restaurant }) {
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );
  const dispatch = useDispatch();

  let RestaurantMarkerStyle;
  if (selectedRestaurant.name === restaurant.name) {
    RestaurantMarkerStyle = {
      fontSize: "3rem",
    };
  } else {
    RestaurantMarkerStyle = {
      fontSize: "2rem",
    };
  }
  return (
    <div className="RestaurantIcon" style={RestaurantMarkerStyle}>
      <i className="fas fa-map-pin"></i>
    </div>
  );
}

export default React.memo(RestaurantIcon);
