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
        {activePage === true && (
          <RandomPlanTable
            partySplit={
              {
                republican: data.republican,
                democratic: data.democratic,
              } || {}
            }
            numDistricts={data.republican + data.democratic || "N/A"}
            opDistricts={data.num_op_districts || "N/A"}
            safeDistricts={data.num_safe_districts || "N/A"}
            opThreshold={data.op_threshold || "N/A"}
          />
        )}
        {activePage === false && (
          <SeatVoteCurveInfo
            seatVoteCurveData={data.seats_votes || []}
            bias={data.bias || "N/A"}
            symmetry={data.symmetry || "N/A"}
            responsiveness={data.responsiveness || "N/A"}
          />
        )}
      </Row>
    </Row>
  );
};

export default RandomPlanContents;
