import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MapContainer.style.scss";

import GoogleMapReact from "google-map-react";
import key from "../../key";

import UserIcon from "../UserIcon/UserIcon.component";
import RestaurantIcon from "../RestaurantIcon/RestaurantIcon.component";
import DirectionsHendler from "../DirectionsHendler/DirectionsHendler.component";

import {
  setMapApi,
  fetchRestaurantListFromApi,
} from "../../redux/restaurantList/restaurantList.action";

function MapContainer() {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.restaurantList.mapCenter);
  const [userPosition, setUserPosition] = useState(mapCenter);
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );

  // const navigationFlag = useSelector(
  //   (state) => state.restaurantList.navigationFlag
  // );

  const [mapApiLoaded, setMapApiLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const mapApi = useSelector((state) => state.restaurantList.mapApi);

  // -------------------map control-------------------

  const searchField = useSelector((state) => state.restaurantList.searchField);
  // 改變mapCenter或是zoom後重新搜尋
  const onMapBoundsChange = () => {
    dispatch(fetchRestaurantListFromApi(searchField, mapCenter));
  };

  const handleApiLoaded = (map, maps) => {
    setMapInstance(map);
    dispatch(setMapApi(maps));
    setMapApiLoaded(true);
    console.log("載入完成!");
  };

  const options = {
    // styles:myMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key, libraries: ["places"] }}
        defaultZoom={16}
        defaultCenter={mapCenter}
        options={options}
        onZoomAnimationEnd={onMapBoundsChange}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        <UserIcon lat={userPosition.lat} lng={userPosition.lng} />

        {restaurantList.map((restaurant) => {
          return (
            <RestaurantIcon
              restaurant={restaurant}
              key={restaurant.name}
              lat={restaurant.geometry.location.lat}
              lng={restaurant.geometry.location.lng}
            />
          );
        })}

        <DirectionsHendler mapInstance={mapInstance} />
      </GoogleMapReact>
    </div>
  );
}

export default React.memo(MapContainer);
