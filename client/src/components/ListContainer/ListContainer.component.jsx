import React, { useState, useEffect } from "react";
import "./ListContainer.style.scss";
import { useSelector, useDispatch } from "react-redux";
import { setListOrder } from "../../redux/restaurantList/restaurantList.action.js";

function ListContainer() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );

  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );
  const dispatch = useDispatch();

  return (
    <div className="ListContainer">
      <div className="buttonController">
        <button onClick={() => dispatch(setListOrder("distance"))}>
          按距離排序
        </button>
        <button onClick={() => dispatch(setListOrder("rating"))}>
          按評分排序
        </button>
      </div>
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
      <div className="restaurantDetail">
        <h3>{selectedRestaurant.name}</h3>
        <div className="star">
          <i className="fas fa-star"></i>
          {selectedRestaurant.rating}
        </div>
        <p>地址：{selectedRestaurant.vicinity}</p>
        <p>距離：{selectedRestaurant.duration.distance.text}</p>
        <p>預估時間：{selectedRestaurant.duration.duration.text}</p>
        {/* {console.log(selectedRestaurant.photos[0].html_attributions[0])} */}
      </div>
    </div>
  );
}

export default ListContainer;
