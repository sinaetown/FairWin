import React from "react";
import { Col, Row } from "react-bootstrap";
import BackButton from "../UI/BackButton";

const DistrictMapTitle = ({ title, address }) => {
  return (
    <Row className="item_contents_Random">
      <Col xs={1}>
        <BackButton address={address} />
      </Col>
      <Col xs={11}>
        <div className="text_contentsTitle_Analysis">{title}</div>
      </Col>
    </Row>
  );
};

export default DistrictMapTitle;
