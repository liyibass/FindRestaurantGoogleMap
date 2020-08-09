import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./RestaurantIcon.style.scss";
import { setSelectedRestaurant } from "../../redux/restaurantList/restaurantList.action";
import { Marker } from "@react-google-maps/api";
import markerSvg from "../../images/Map_marker.svg";

function RestaurantIcon({ restaurant }) {
  const dispatch = useDispatch();
  return (
    <Marker
      className="RestaurantIcon"
      key={restaurant.name}
      position={restaurant.geometry.location}
      onMouseOver={() => {
        dispatch(setSelectedRestaurant(restaurant));
      }}
      icon={{
        url: `${markerSvg}`,
        scaledSize: {
          height: 30,
          width: 30,
        },
      }}
    />
  );
}

export default RestaurantIcon;
