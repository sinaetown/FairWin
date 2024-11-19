import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import SeatVoteCurveInfo from "./SeatVoteCurveInfo";
import leftArrowIcon from "../assets/leftArrowIcon.svg";
import rightArrowIcon from "../assets/rightArrowIcon.svg";

const EnsembleSummary = ({ title, SMDMMD, selectedStateAbbr }) => {
  const [activePage, setActivePage] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ avg_party_split: {} });
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/ensembleSummary/${SMDMMD}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, SMDMMD]);

  return (
    <Row>
      {activePage && (
        <Row>
          <div className="info_title">
            <Button onClick={() => setActivePage(!activePage)} variant="link">
              <img alt="" src={leftArrowIcon} width="30" height="30" />
            </Button>
            {title}
            <Button onClick={() => setActivePage(!activePage)} variant="link">
              <img alt="" src={rightArrowIcon} width="30" height="30" />
            </Button>
          </div>
          <Row className="info_grid">
            <Row className="info_grid">
              <Col className="info_item">
                <div className="info_subTitle">Number of District Plans</div>
                <div>
                  <span className="info_data">{data.num_dist_plan || 0}</span>{" "}
                  plans in ensemble
                </div>
              </Col>
              <Col className="info_item">
                <div className="info_subTitle">
                  Average Number of Minority Representatives Per Plan
                </div>
                <div>
                  <span className="info_data">
                    {data.avg_num_minor_representatives?.non_wht || 0}
                  </span>{" "}
                  Non-whites per plan
                </div>
              </Col>
            </Row>
            <Row className="info_grid">
              <Col className="info_item">
                <div className="info_subTitle">
                  Average Min-Max Difference of District Population
                </div>
                <div>
                  Within{" "}
                  <span className="info_data">
                    {data.avg_min_max_diff || 0}
                  </span>
                  %
                </div>
              </Col>
              <Col className="info_item">
                <div className="info_subTitle">Average Party Split</div>
                <div>
                  <span className="info_data">
                    {data.avg_party_split?.republican || 0}
                  </span>{" "}
                  Republicans/state
                  <br />
                  <span className="info_data">
                    {data.avg_party_split?.democratic || 0}
                  </span>{" "}
                  Democrats/state
                </div>
              </Col>
            </Row>
          </Row>
        </Row>
      )}
      {!activePage && (
        <Row>
          <div className="info_title">
            <Button onClick={() => setActivePage(!activePage)} variant="link">
              <img alt="" src={leftArrowIcon} width="30" height="30" />
            </Button>
            {title}
            <Button onClick={() => setActivePage(!activePage)} variant="link">
              <img alt="" src={rightArrowIcon} width="30" height="30" />
            </Button>
          </div>
          <SeatVoteCurveInfo
            seatVoteCurveData={data.seats_votes || []}
            bias={data.bias || 0}
            symmetry={data.symmetry || 0}
            responsiveness={data.responsiveness || 0}
          />
        </Row>
      )}
    </Row>
  );
};

export default EnsembleSummary;
