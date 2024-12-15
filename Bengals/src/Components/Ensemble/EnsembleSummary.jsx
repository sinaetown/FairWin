import React, { useState, useEffect } from "react";
import axios from "axios";
import { Row, Col } from "react-bootstrap";
import SeatVoteCurveInfo from "../Pages/SeatVoteCurveInfo";
import InfoTitle from "../Pages/InfoTitle";

const EnsembleSummary = ({ title, smdmmd, selectedStateAbbr }) => {
  const [activePage, setActivePage] = useState(true);
  const [data, setData] = useState({});

  useEffect(() => {
    setData({ averagePartySplit: {} });
    const getData = async () => {
      const api = `/${selectedStateAbbr.toUpperCase()}/ensemble-summary/${smdmmd}`;
      try {
        const response = await axios.get(`http://localhost:8080${api}`);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    getData();
  }, [selectedStateAbbr, smdmmd]);

  const infoItems = [
    {
      title: "Number of District Plans",
      values: [
        {
          value: data.numDistrictPlan?.toLocaleString() || 0,
          suffix: "plans in ensemble",
        },
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
    ...(smdmmd === "mmd"
      ? [
          {
            title: "MMD Layout",
            values: [
              {
                value: Array.isArray(data.layout)
                  ? data.layout.map((x) => `${x}`).join(", ") || 0
                  : "",
                suffix: "member districts",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <Row>
      {activePage && (
        <Row>
          <InfoTitle
            title={title}
            activePage={activePage}
            onPageChange={setActivePage}
          />
          <Row className="info-grid">
            {infoItems.map((item, index) => (
              <Col key={index} className="info-item">
                <div className="info-subtitle">{item.title}</div>
                {item.values.map((val, idx) => (
                  <div key={idx}>
                    <span className="info-data">{val.value}</span> {val.suffix}
                  </div>
                ))}
              </Col>
            ))}
          </Row>
        </Row>
      )}
      {!activePage && (
        <Row>
          <InfoTitle
            title="Seats-Votes Curve"
            activePage={activePage}
            onPageChange={setActivePage}
          />
          <SeatVoteCurveInfo
            seatVoteCurveData={data.seatsVotes || []}
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
