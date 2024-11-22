import React, { useState } from "react";
import { Row } from "react-bootstrap";
import RandomPlanTable from "./RandomPlanTable";
import SeatVoteCurveInfo from "./SeatVoteCurveInfo";
import InfoTitle from "./InfoTitle";

const RandomPlanContents = ({ title, data }) => {
  const [activePage, setActivePage] = useState(true);

  return (
    <Row>
      <Row>
        <InfoTitle
          title={title}
          activePage={activePage}
          onPageChange={setActivePage}
        />
        {activePage === true && <RandomPlanTable data={data || {}} />}
        {activePage === false && (
          <SeatVoteCurveInfo
            seatVoteCurveData={data.seats_votes || []}
            bias={data.bias || 0}
            symmetry={data.symmetry || 0}
            responsiveness={data.responsiveness || 0}
          />
        )}
      </Row>
    </Row>
  );
};

export default RandomPlanContents;
