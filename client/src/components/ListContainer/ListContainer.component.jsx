import React, { useState, useEffect } from "react";
import "./ListContainer.style.scss";
import { useDispatch } from "react-redux";
import { setListOrder } from "../../redux/restaurantList/restaurantList.action.js";
import DetailSection from "../DetailSection/DetailSection.component";
import ListSection from "../ListSection/ListSection.component";

function ListContainer() {
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

      <ListSection />
      <DetailSection />
    </div>
  );
}

export default ListContainer;
