import React from "react";

const clusterStyle = {
  color: "#fff",
  background: "#a11b1b",
  borderRadius: "50%",
  padding: "10px",
  width: "10px",
  height: "10px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: "15px",
  fontWeight: "900",
};

const ClusterMarker = ({ key, lat, lng, pointCount, onClick }) => (
  <div key={key} style={clusterStyle} onClick={onClick}>
    {pointCount}
  </div>
);

export default ClusterMarker;
