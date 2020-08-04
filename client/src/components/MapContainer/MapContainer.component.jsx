import React, { useState } from "react";
import "./MapContainer.style.scss";
import GoogleMapReact from "google-map-react";
import key from "../../key";
import UserIcon from "../UserIcon/UserIcon.component";

const AnyReactComponent = ({ text }) => <div></div>;

function MapContainer(props) {
  const [mapCenter, setMapCenter] = useState({
    lat: 24.953881,
    lng: 121.225525,
  });
  const [userPosition, setUserPosition] = useState(mapCenter);
  const [zoom, setZoom] = useState(15);

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

        <AnyReactComponent
          lat={userPosition.lat}
          lng={userPosition.lng}
          text="My Marker"
        />
      </GoogleMapReact>
    </div>
  );
}

export default MapContainer;
