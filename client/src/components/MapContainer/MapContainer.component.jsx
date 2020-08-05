import React, { useState, useEffect, useCallback, useRef } from "react";
import "./MapContainer.style.scss";
import GoogleMapReact from "google-map-react";
import key from "../../key";
import UserIcon from "../UserIcon/UserIcon.component";
import { useSelector, useDispatch } from "react-redux";
import "dotenv";
import { fetchRestaurantListFromApi } from "../../redux/restaurantList/restaurantList.action";

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";

function MapContainer() {
  const dispatch = useDispatch();
  const libraries = ["places"];
  const mapCenter = useSelector((state) => state.restaurantList.mapCenter);
  const searchField = useSelector((state) => state.restaurantList.searchField);
  const [userPosition, setUserPosition] = useState(mapCenter);

  const restaurantList = useSelector(
    (state) => state.restaurantList.restaurantList
  );
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);

  const [mouseClickPosition, setMouseClickPosition] = useState([]);

  // -------------------map control-------------------
  const mapRef = useRef();
  //將map api放至ref中
  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  //紀錄click當下數值
  const onMapClick = useCallback((e) => {
    setMouseClickPosition((prev) => [
      ...prev,
      {
        lat: e.latLng.lat(),
        lng: e.latLng.lng(),
        time: new Date(),
      },
    ]);
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

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <div className="div">
      <GoogleMap
        mapContainerStyle={{ height: "100vh", width: "100vw" }}
        zoom={16}
        center={mapCenter}
        options={options}
        onClick={onMapClick}
        onLoad={onMapLoad}
        onDragEnd={onMapBoundsChange}
        onZoomChanged={onMapBoundsChange}
      >
        <UserIcon position={userPosition} />

        {restaurantList.map((restaurant) => {
          return (
            <Marker
              key={restaurant.name}
              position={restaurant.geometry.location}
              onClick={() => {
                setSelectedRestaurant(restaurant);
              }}
            />
          );
        })}

        {selectedRestaurant ? (
          <InfoWindow
            position={selectedRestaurant.geometry.location}
            onCloseClick={() => {
              setSelectedRestaurant(null);
            }}
          >
            <div>
              <p>{selectedRestaurant.name}</p>
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
  );
}

export default MapContainer;
