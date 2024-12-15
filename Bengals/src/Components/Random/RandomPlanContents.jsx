import React, { useState } from "react";
import { Row } from "react-bootstrap";
import RandomPlanTable from "./RandomPlanTable";
import SeatVoteCurveInfo from "../Pages/SeatVoteCurveInfo";
import InfoTitle from "../Pages/InfoTitle";

const RandomPlanContents = ({ title, data }) => {
  const [activePage, setActivePage] = useState(true);

  return (
    <Row>
      {activePage === true && (
        <Row>
          <InfoTitle
            title={title}
            activePage={activePage}
            onPageChange={setActivePage}
          />
          <RandomPlanTable data={data || {}} />
        </Row>
      )}
      {activePage === false && (
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

export default RandomPlanContents;
