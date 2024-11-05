import React, { useState } from "react";
import { Table } from "react-bootstrap";
import OpportunityBar from "./Components/OpportunityBar";
import Sidebar from "./Components/Sidebar";
import Brand from "./Components/Brand";

function CompareCurrent() {
  const { selectedState } = location.state || {};
  const [showSideBar, setShowSideBar] = useState(false);
  const [rebublicansBar, setRebublicansBar] = useState([]);
  const [democratsBar, setDemocratsBar] = useState([]);
  const [opDistrictBar, setOPDistrictBar] = useState([]);
  const [opRepresentativesBar, setOPRepresentativesBar] = useState([]);

  useEffect(() => {
    const api = {
      Mississippi: { stateInfo: "/MS/compare" },
      Alabama: { stateInfo: "/AL/compare" },
      Pennsylvania: { stateInfo: "/PA/compare" },
    };
    const initValue = () => {
      setRebublicansBar([]);
      setDemocratsBar([]);
      setOPDistrictBar([]);
      setOPRepresentativesBar([]);
    };
    const setValue = (compareCurrent) => {
      let features = compareCurrent.data;
      setRebublicansBar(features["republicans_bar"]);
      setDemocratsBar(features["democrats_bar"]);
      setOPDistrictBar(features["op_districts_bar"]);
      setOPRepresentativesBar(features["op_representatives_bar"]);
    };
    const fetchData = async () => {
      try {
        initValue();
        const compareCurrent = await axios.get(
          `http://localhost:8080${api[selectedState]}`
        );
        setValue(compareCurrent);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedState]);
  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand />
        <div className="body_analysis">
          <Table striped bordered hover className="table_compareCurrent">
            <tr>
              <td>
                {" "}
                <OpportunityBar keyName="Republicans" data={rebublicansBar} />
              </td>
              <td>
                {" "}
                <OpportunityBar keyName="Democrats" data={democratsBar} />
              </td>
            </tr>
            <tr>
              <td>
                {" "}
                <OpportunityBar keyName="op_districts" data={opDistrictBar} />
              </td>
              <td>
                {" "}
                <OpportunityBar
                  keyName="op_representatives"
                  data={opRepresentativesBar}
                />
              </td>
            </tr>
          </Table>
        </div>
      </div>
    </>
  );
}

export default CompareCurrent;
