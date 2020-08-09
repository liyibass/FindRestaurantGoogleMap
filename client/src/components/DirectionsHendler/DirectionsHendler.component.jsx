import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./DirectionsHendler.style.scss";

import { DirectionsService, DirectionsRenderer } from "@react-google-maps/api";

function DirectionsHendler({ navigationFlag }) {
  const mapCenter = useSelector((state) => state.restaurantList.mapCenter);
  const selectedRestaurant = useSelector(
    (state) => state.restaurantList.selectedRestaurant
  );
  const [directionResult, setDirectionResult] = useState();

  if (!navigationFlag) return null;

  const options = {
    origin: mapCenter,
    destination: selectedRestaurant.geometry.location,
    travelMode: "WALKING",
  };

  return (
    <div className="DirectionHandler">
      <DirectionsService
        options={options}
        callback={(result) => {
          setDirectionResult(result);
        }}
      />
      <DirectionsRenderer directions={directionResult} />;
    </div>
  );
}

export default React.memo(DirectionsHendler);
