import React, { useState } from "react";
import "./MapContainer.style.scss";
import GoogleMapReact from "google-map-react";
import key from "../../key";
import UserIcon from "../UserIcon/UserIcon.component";
import RestaurantIcon from "../RestaurantIcon/RestaurantIcon.component";
import { useSelector } from "react-redux";

const AnyReactComponent = ({ text }) => <div></div>;

function MapContainer() {
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );

  console.log(restaurantList);
  const [mapCenter, setMapCenter] = useState({
    lat: 24.953881,
    lng: 121.225525,
  });
  const [userPosition, setUserPosition] = useState(mapCenter);
  const [zoom, setZoom] = useState(17);

  const [currentMapState, setCurrentMapState] = useState(null);
  const [mapApi, setMapApi] = useState(null);

  const handleApiLoaded = (map, maps) => {
    console.log("載入完成!");
    setCurrentMapState(map);
    setMapApi(maps);
  };

  const handleCenterChange = () => {
    if (currentMapState !== null) {
      setUserPosition({
        lat: currentMapState.center.lat(),
        lng: currentMapState.center.lng(),
      });
    }
  };

  return (
    <div className="MapContainer">
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultCenter={mapCenter}
        defaultZoom={zoom}
        yesIWantToUseGoogleMapApiInternals // 設定為 true
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)} // 載入完成後執行
        // onBoundsChange={({ map }) => handleCenterChange(map)}
      >
        <UserIcon lat={userPosition.lat} lng={userPosition.lng} />
        {restaurantList.map((restaurant) => {
          return (
            <RestaurantIcon
              key={restaurant.name}
              name={restaurant.name}
              lat={restaurant.geometry.location.lat}
              lng={restaurant.geometry.location.lng}
            />
          );
        })}
      </GoogleMapReact>
    </div>
  );
}

export default MapContainer;
