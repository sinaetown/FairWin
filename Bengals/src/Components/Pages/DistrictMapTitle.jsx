import React from "react";
import { Col, Row } from "react-bootstrap";
import BackButton from "../UI/BackButton";

const DistrictMapTitle = ({ title, address }) => {
  return (
    <Row className="info-contents-row">
      <Col xs={1}>
        <BackButton address={address} />
      </Col>
      <Col xs={11}>
        <div className="text-district-map-title">{title}</div>
      </Col>
    </Row>
  );
};

export default DistrictMapTitle;
