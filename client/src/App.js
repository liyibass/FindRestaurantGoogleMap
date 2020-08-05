import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles/base/overall.scss";
import MapContainer from "./components/MapContainer/MapContainer.component";
import ListContainer from "./components/ListContainer/ListContainer.component";
import SearchBar from "./components/SearchBar/SearchBar.component";

function App() {
  const [restaurantList, setRestaurantList] = useState([]);

  return (
    <div className="App">
      <SearchBar />
      <MapContainer />
      {/* <ListContainer restaurantList={restaurantList} /> */}

      <div className="restaurantList"></div>
    </div>
  );
}

export default App;
