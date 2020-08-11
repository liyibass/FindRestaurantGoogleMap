import React from "react";
import { useSelector } from "react-redux";
import "./DetailSection.style.scss";

function DetailSection() {
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );

  if (selectedRestaurant.duration) {
    return (
      <div className="DetailSection">
        <h3>{selectedRestaurant.name}</h3>

        <div className="star">
          <i className="fas fa-star"></i>
          {selectedRestaurant.rating}
        </div>
        <p>地址：{selectedRestaurant.vicinity}</p>
        <p>距離：{selectedRestaurant.duration.distance.text}</p>
        <p>預估時間：{selectedRestaurant.duration.duration.text}</p>
      </div>
    );
  } else {
    return null;
  }
}

export default React.memo(DetailSection);
