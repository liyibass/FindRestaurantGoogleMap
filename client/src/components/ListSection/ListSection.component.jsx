import React from "react";
import { useSelector, useDispatch } from "react-redux";
import "./ListSection.style.scss";
import {
  setSelectedRestaurant,
  restaurantNavigation,
} from "../../redux/restaurantList/restaurantList.action";

function ListSection() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );

  const dispatch = useDispatch();

  return (
    <div className="ListSection">
      {restaurantList.map((restaurant) => {
        let listStyle;
        if (selectedRestaurant.name === restaurant.name) {
          listStyle = { background: "lightgray" };
        } else {
          listStyle = { background: "" };
        }

        return (
          <div
            className="restaurantSection"
            key={restaurant.name}
            style={listStyle}
            onMouseOver={() => {
              dispatch(setSelectedRestaurant(restaurant));
            }}
            onMouseDown={() => {
              dispatch(restaurantNavigation(true));
            }}
          >
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
