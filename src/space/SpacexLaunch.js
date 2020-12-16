import React from "react";
import { Card } from "react-bootstrap";
import "./SpacexLaunch.css";

function SpacexLaunch({ details }) {
  const {
    flight_number,
    mission_id,
    launch_year,
    launch_success,
    mission_name,
    links,
    rocket,
  } = details;
  console.log("links",links)
  const imgSrc = links.mission_patch;
  const land_success = rocket.first_stage.cores[0].land_success;
  return (
    <Card className="space-card">
      <div key={flight_number}>
        <div>
          <img
            src={imgSrc}
            alt="mission patch img not available on api"
            className="space-image"
          />
        </div>
        <div className="space-mission-flight">
          {mission_name} #{flight_number}
        </div>
        <div className="space-detail">
          Mission Ids:{" "}
          <ul>
            {" "}
            <li className="spacedetail-value">{mission_id}</li>
          </ul>
        </div>
        <div className="space-detail">
          Launch Year:{" "}
          <span className="space-detail-value">{launch_year}</span>
        </div>
        <div className="space-detail">
          Successful Launch:{" "}
          <span className="space-detail-value">
            {launch_success ? "true" : "false"}
          </span>
        </div>
        <div className="space-detail">
          Successful Landing:{" "}
          <span className="space-detail-value">
            {land_success ? "true" : "false"}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default SpacexLaunch;
