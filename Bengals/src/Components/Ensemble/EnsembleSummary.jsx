import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col, Button } from "react-bootstrap";
import SeatVoteCurveInfo from "../Pages/SeatVoteCurveInfo";
import LeftArrowIcon from "../../assets/left-arrow-icon.svg";
import RightArrowIcon from "../../assets/right-arrow-icon.svg";

const EnsembleSummary = ({ title, SMDMMD, selectedStateAbbr }) => {
  const [activePage, setActivePage] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ averagePartySplit: {} });
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/ensemble-summary/${SMDMMD}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, SMDMMD]);
  const infoItems = [
    {
      title: "Number of District Plans",
      values: [
        { value: data.numDistrictPlan || 0, suffix: "plans in ensemble" },
      ],
    },
    {
      title: "Average Number of Minority Representatives Per Plan",
      values: [
        {
          value: data.averageNonWhiteRepresentatives || 0,
          suffix: "Non-whites per plan",
        },
      ],
    },
    {
      title: "Average Min-Max Difference of District Population",
      values: [{ value: data.averageMinMaxDifference || 0, suffix: "%" }],
    },
    {
      title: "Average Party Split",
      values: [
        {
          value: data.averagePartySplit?.republican || 0,
          suffix: "Republicans/state",
        },
        {
          value: data.averagePartySplit?.democratic || 0,
          suffix: "Democrats/state",
        },
      ],
    },
  ];
  return (
    <Row>
      <Row>
        <div className="info_title">
          <Button onClick={() => setActivePage(!activePage)} variant="link">
            <img alt="" src={LeftArrowIcon} width="30" height="30" />
          </Button>
          {title}
          <Button onClick={() => setActivePage(!activePage)} variant="link">
            <img alt="" src={RightArrowIcon} width="30" height="30" />
          </Button>
        </div>
        {activePage && (
          <Row className="info_grid">
            {infoItems.map((item, index) => (
              <Col key={index} className="info_item">
                <div className="info_subTitle">{item.title}</div>
                {item.values.map((val, idx) => (
                  <div key={idx}>
                    <span className="info_data">{val.value}</span> {val.suffix}
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        )}
        {!activePage && (
          <SeatVoteCurveInfo
            seatVoteCurveData={data.seatsVotes || []}
            bias={data.bias || 0}
            symmetry={data.symmetry || 0}
            responsiveness={data.responsiveness || 0}
          />
        )}
      </Row>
    </Row>
  );
};

export default EnsembleSummary;
