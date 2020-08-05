import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./SearchBar.style.scss";
import { fetchRestaurantListFromApi } from "../../redux/restaurantList/restaurantList.action";

function SearchBar() {
  const [searchField, setSearchField] = useState({
    type: "小吃",
    radius: 500,
  });
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSearchField({ ...searchField, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(fetchRestaurantListFromApi(searchField));
  };

  return (
    <div className="SearchBar">
      <form onSubmit={(e) => handleSubmit(e)} action="" className="searchForm">
        <div className="form-group" onChange={(e) => handleChange(e)}>
          <input type="radio" name="type" value="餐廳" />
          <label htmlFor="name">餐廳</label>
          <input type="radio" name="type" value="小吃" />
          <label htmlFor="name">小吃</label>
          <input type="radio" name="type" value="快餐" />
          <label htmlFor="name">快餐</label>
        </div>
        <div className="form-group form-group-range">
          <label htmlFor="name">
            距離:
            {searchField.radius < 1000
              ? `${searchField.radius} m`
              : `${(searchField.radius / 1000).toFixed(2)} km`}
          </label>
          <input
            type="range"
            name="radius"
            min={50}
            max={1000}
            value={searchField.radius}
            onChange={(e) => handleChange(e)}
          />
        </div>

        <button type="submit">搜尋</button>
      </form>
    </div>
  );
}

export default SearchBar;
