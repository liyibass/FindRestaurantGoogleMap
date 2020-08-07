import React, { useState, useEffect } from "react";
import "./ListContainer.style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListOrder } from "../../redux/restaurantList/restaurantList.action.js";

function ListContainer() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );
  const dispatch = useDispatch();

  const sortByDistance = () => {
    dispatch(setListOrder("distance"));
  };

  return (
    <div className="ListContainer">
      <button onClick={() => dispatch(setListOrder("distance"))}>
        按距離排序
      </button>
      <button onClick={() => dispatch(setListOrder("rating"))}>
        按評分排序
      </button>
      <div className="restaurantList">
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
    </div>
  );
}

export default ListContainer;
