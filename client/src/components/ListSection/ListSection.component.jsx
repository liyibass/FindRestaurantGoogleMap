import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import "./ListSection.style.scss";

function ListSection() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );

  return (
    <div className="ListSection">
      {restaurantList.map((restaurant) => {
        return (
          <div className="restaurantSection" key={restaurant.name}>
            <div className="star">
              <i className="fas fa-star"></i>
              {restaurant.rating}
            </div>
            <div className="title">
              <h4>{restaurant.name} </h4>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListSection;
