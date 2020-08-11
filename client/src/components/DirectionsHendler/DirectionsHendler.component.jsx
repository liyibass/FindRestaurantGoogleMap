import React, { useState } from "react";
import { useSelector } from "react-redux";

import "./DirectionsHendler.style.scss";

function DirectionsHendler({ mapInstance }) {
  const mapApi = useSelector((state) => state.restaurantList.mapApi);
  const mapCenter = useSelector((state) => state.restaurantList.mapCenter);
  const destination = useSelector((state) => state.restaurantList.destination);
  console.log(mapInstance);
  if (destination.name) {
    const directionsService = new mapApi.DirectionsService();
    const directionsRenderer = new mapApi.DirectionsRenderer();

    const request = {
      origin: mapCenter,
      destination: destination.geometry.location,
      travelMode: "WALKING",
    };

    directionsService.route(request, function (result, status) {
      if (status == "OK") {
        console.log(directionsRenderer);

        directionsRenderer.setDirections(result);
      } else {
        console.log(status);
      }
    });
    return (
      <div className="DirectionHandler">
        {directionsRenderer.setMap(mapInstance)}
      </div>
    );
  } else {
    return <div className="DirectionHandler"></div>;
  }
}

export default React.memo(DirectionsHendler);
