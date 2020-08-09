import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RestaurantIcon.style.scss";
import { setSelectedRestaurant } from "../../redux/restaurantList/restaurantList.action";
import { Marker } from "@react-google-maps/api";
import marker from "../../images/marker.svg";

function RestaurantIcon({ restaurant }) {
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );
  const dispatch = useDispatch();

  if (selectedRestaurant.name === restaurant.name) {
    return (
      <Marker
        className="RestaurantIcon"
        key={restaurant.name}
        position={restaurant.geometry.location}
        onMouseOver={() => {
          dispatch(setSelectedRestaurant(restaurant));
        }}
        icon={{
          url: `${marker}`,
          scaledSize: {
            height: 40,
            width: 40,
          },
        }}
      />
    );
  } else {
    return (
      <Marker
        className="RestaurantIcon"
        key={restaurant.name}
        position={restaurant.geometry.location}
        onMouseOver={() => {
          dispatch(setSelectedRestaurant(restaurant));
        }}
        icon={{
          url: `${marker}`,
          scaledSize: {
            height: 30,
            width: 30,
          },
        }}
      />
    );
  }
}

export default RestaurantIcon;
