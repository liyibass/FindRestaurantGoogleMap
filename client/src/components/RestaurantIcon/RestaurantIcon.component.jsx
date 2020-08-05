import React from "react";
import "./RestaurantIcon.style.scss";

function RestaurantIcon({ name }) {
  return (
    <div className="RestaurantIcon">
      <i className="fas fa-map-marker-alt"></i>
      <div className="info"> {name}</div>
    </div>
  );
}

export default RestaurantIcon;
