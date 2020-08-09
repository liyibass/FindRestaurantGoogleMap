import React from "react";
import "./UserIcon.style.scss";

import { Marker } from "@react-google-maps/api";

function UserIcon({ position }) {
  return <Marker className="UserIcon" position={position} />;
}

export default UserIcon;
