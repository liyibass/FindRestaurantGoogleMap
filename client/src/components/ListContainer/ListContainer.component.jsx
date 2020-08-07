import React from "react";
import "./ListContainer.style.scss";
import { useSelector } from "react-redux";

function ListContainer() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );

  return (
    <div className="ListContainer">
      {restaurantList.map((restaurant) => {
        return <h4 key={restaurant.name}>{restaurant.name} </h4>;
      })}
    </div>
  );
}

export default ListContainer;
