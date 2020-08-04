import React, { useEffect, useState } from "react";
import axios from "axios";

import "./styles/base/overall.scss";
import MapContainer from "./components/MapContainer/MapContainer.component";
import ListContainer from "./components/ListContainer/ListContainer.component";

function App() {
  const [restaurantList, setRestaurantList] = useState([]);
  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/search/restaurant/")
  //     .then((response) => setRestaurantList(response.data.results))
  //     .catch((error) => console.log(error.message));
  // }, []);
  return (
    <div className="App">
      <MapContainer restaurantList={restaurantList} />
      <ListContainer restaurantList={restaurantList} />

      <div className="restaurantList"></div>
    </div>
  );
}

export default App;
