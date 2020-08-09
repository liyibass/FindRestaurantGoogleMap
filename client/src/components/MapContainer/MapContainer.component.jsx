import React, { useState, useEffect, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./MapContainer.style.scss";

import {
  GoogleMap,
  useLoadScript,
  DistanceMatrixService,
} from "@react-google-maps/api";
import key from "../../key";

import UserIcon from "../UserIcon/UserIcon.component";
import { fetchRestaurantListFromApi } from "../../redux/restaurantList/restaurantList.action";

import RestaurantIcon from "../RestaurantIcon/RestaurantIcon.component";

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

  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );

  // -------------------map control-------------------
  const mapRef = useRef();
  //將map api放至ref中
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  // 改變mapCenter或是zoom後重新搜尋
  const onMapBoundsChange = () => {
    if (mapRef.current !== undefined) {
      const newMapCenter = {
        lat: mapRef.current.center.lat(),
        lng: mapRef.current.center.lng(),
      };

      dispatch(fetchRestaurantListFromApi(searchField, newMapCenter));
    }
  };

  const options = {
    // styles:myMapStyles,
    disableDefaultUI: true,
    zoomControl: true,
  };

  // -------------------map init-------------------
  const libraries = ["places"];
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="MapContainer">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100%" }}
        zoom={16}
        center={mapCenter}
        options={options}
        onLoad={onMapLoad}
        onZoomChanged={onMapBoundsChange}
      >
        <UserIcon position={userPosition} />

        {restaurantList.map((restaurant) => {
          return (
            <RestaurantIcon restaurant={restaurant} key={restaurant.name} />
          );
        })}

        {/* 幫每個餐廳新增props：距離/時間 */}
        <DistanceMatrixService
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
      </GoogleMap>
    </div>
  );
}

export default MapContainer;
