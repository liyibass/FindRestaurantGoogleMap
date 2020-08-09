import React from "react";
import "./UserIcon.style.scss";

function UserIcon() {
  return (
    <div className="UserIcon">
      <i className="fas fa-map-marker-alt"></i>
    </div>
  );
}

export default React.memo(UserIcon);
