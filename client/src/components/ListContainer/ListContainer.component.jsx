import React from "react";
import "./ListContainer.style.scss";

function ListContainer({ restaurantList }) {
  return (
    <div className="ListContainer">
      {" "}
      {restaurantList.map((restaurant) => {
        return <h4>{restaurant.name}</h4>;
      })}
    </div>
  );
}

export default ListContainer;
