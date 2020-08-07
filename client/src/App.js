import React, { useEffect, useState } from "react";

import "./styles/base/overall.scss";
import MapContainer from "./components/MapContainer/MapContainer.component";
import ListContainer from "./components/ListContainer/ListContainer.component";
import SearchBar from "./components/SearchBar/SearchBar.component";

function App() {
  return (
    <div className="App">
      <SearchBar />
      <MapContainer />
      <ListContainer />
    </div>
  );
}

export default App;
