import React, { useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MapContainer.style.scss";

import {
  GoogleMap,
  useLoadScript,
  DistanceMatrixService,
} from "@react-google-maps/api";
import GoogleMapReact from "google-map-react";
import key from "../../key";

import UserIcon from "../UserIcon/UserIcon.component";
import RestaurantIcon from "../RestaurantIcon/RestaurantIcon.component";
import DirectionsHendler from "../DirectionsHendler/DirectionsHendler.component";

import { fetchRestaurantListFromApi } from "../../redux/restaurantList/restaurantList.action";
import { useEffect } from "react";

function MapContainer() {
  const dispatch = useDispatch();
  const mapCenter = useSelector((state) => state.restaurantList.mapCenter);
  const searchField = useSelector((state) => state.restaurantList.searchField);
  const [userPosition, setUserPosition] = useState(mapCenter);
  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );
  const destinationArray = restaurantList.map((restaurant) => {
    return restaurant.geometry.location;
  });
  const navigationFlag = useSelector(
    (state) => state.restaurantList.navigationFlag
  );

  // -------------------map control-------------------

  // 改變mapCenter或是zoom後重新搜尋
  const onMapBoundsChange = () => {
    // dispatch(fetchRestaurantListFromApi(searchField, newMapCenter));
  };

  const options = {
    // styles:myMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: key }}
        defaultZoom={16}
        defaultCenter={mapCenter}
        options={options}
        onZoomChanged={onMapBoundsChange}
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

        {/* 幫每個餐廳新增props：距離/時間 */}
        {/* <DistanceMatrixService
      options={{
        // 輸入起始點以及所有餐廳Array，以得到每個餐廳的距離/時間
        destinations: destinationArray,
        origins: [mapCenter],
        travelMode: "WALKING",
      }}
      callback={(response) => {
        if (response === null) {
          return null;
        } else if (response.rows.length) {
          const durations = response.rows[0].elements;
          // 一個個加入每個餐廳的props
          restaurantList.forEach(
            (restaurant, index) => (restaurant.duration = durations[index])
          );
        }
      }}
    />
    <DirectionsHendler navigationFlag={navigationFlag} /> */}
      </GoogleMapReact>
    </div>
  );

  // if (loadError) return "Error loading maps";
  // if (!isLoaded) return "Loading Maps";
  // return isLoaded ? renderMap() : null;
}

export default MapContainer;
