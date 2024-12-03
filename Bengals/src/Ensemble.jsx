import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import SideBar from "./Components/UI/SideBar";
import { Row, Col } from "react-bootstrap";
import DistrictMap from "./Components/Visualization/DistrictMap";
import Brand from "./Components/UI/Brand";
import EnsembleSummary from "./Components/Ensemble/EnsembleSummary";
import NavBar from "./Components/UI/NavBar";
import RacialDistribution from "./Components/Ensemble/RacialDistribution";
import PartySplitsDistribution from "./Components/Ensemble/PartySplitsDistribution";
import PartyPopulationDistribution from "./Components/Ensemble/PartyPopulationDistribution";
import PlanComparison from "./Components/Ensemble/PlanComparison";
import DistrictMapTitle from "./Components/Pages/DistrictMapTitle";
import OpportunityDistribution from "./Components/Ensemble/OpportunityDistribution";

const Ensemble = () => {
  const abbreviation = { ms: "MISSISSIPPI", al: "ALABAMA", pa: "PENNSYLVANIA" };
  const { id: selectedStateAbbr } = useParams();
  const location = useLocation().pathname;
  const SMDMMD = location.split("/")[3];
  const selectedState = abbreviation[selectedStateAbbr];
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [showRacialGraph1, setShowRacialGraph1] = useState("black");
  const [showRacialGraph2, setShowRacialGraph2] = useState("black");
  const [showPartyGraph, setShowPartyGraph] = useState("republican");
  const [showContent, setShowContent] = useState("Ensemble Summary");
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const initValue = () => {
      setGeoFeature([]);
    };
    const getMap = async () => {
      const api_sampleMMDMap = `/${selectedStateAbbr.toUpperCase()}/sample-mmd-map`;
      const api_enactedMap = `/${selectedStateAbbr.toUpperCase()}/enacted-map`;
      let map;
      try {
        if (SMDMMD == "smd") {
          map = await axios.get(`http://localhost:8080${api_enactedMap}`);
        } else {
          map = await axios.get(`http://localhost:8080${api_sampleMMDMap}`);
        }
        setGeoFeature(map.data.features || []);
        setMapKey(mapKey + 1);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initValue();
    getMap();
  }, [selectedStateAbbr, SMDMMD]);

  return (
    <>
      <div className="body">
        <SideBar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
          {SMDMMD == "smd" && (
            <NavBar
              setShowContent={setShowContent}
              simpleItem={["Ensemble Summary"]}
              dropDown={[
                {
                  title: "Racial Data",
                  items: [
                    "Distribution of Racial Population",
                    "Opportunity Districts & Representatives",
                  ],
                },
                {
                  title: "Party Data",
                  items: ["Distribution of Party Population", "Party Splits"],
                },
              ]}
            />
          )}
          {SMDMMD == "mmd" && (
            <NavBar
              setShowContent={setShowContent}
              simpleItem={[
                "Ensemble Summary",
                "Enacted Plan vs Average MMD Plans",
              ]}
              dropDown={[
                {
                  title: "Racial Data",
                  items: [
                    "Distribution of Racial Population",
                    "Opportunity Districts & Representatives",
                  ],
                },
                {
                  title: "Party Data",
                  items: ["Distribution of Party Population", "Party Splits"],
                },
              ]}
            />
          )}
          <Row className="contents_Random">
            <Col xs={12} md={6} className="col_stateInformation">
              {SMDMMD == "smd" && (
                <DistrictMapTitle
                  title={"Enacted Plan"}
                  address={`/${selectedStateAbbr}`}
                />
              )}
              {SMDMMD == "mmd" && (
                <DistrictMapTitle
                  title={"Sample MMD Plan"}
                  address={`/${selectedStateAbbr}`}
                />
              )}
              <Row className="item_plot_Random">
                <DistrictMap
                  mapKey={mapKey}
                  data={geoFeature}
                  selectedState={selectedState}
                />
              </Row>
            </Col>
            <Col className="col_districtInformation_Random">
              {showContent === "Ensemble Summary" && (
                <EnsembleSummary
                  title={`${SMDMMD.toLocaleUpperCase()} Ensemble Summary`}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Distribution of Racial Population" && (
                <RacialDistribution
                  title={"Distribution of Racial Population"}
                  showGraph={showRacialGraph1}
                  setShowGraph={setShowRacialGraph1}
                  navbarItem={["African American", "Asian", "Hispanic"]}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Opportunity Districts & Representatives" && (
                <OpportunityDistribution
                  title={"Opportunity Districts & Representatives"}
                  showGraph={showRacialGraph2}
                  setShowGraph={setShowRacialGraph2}
                  navbarItem={["African American", "Asian", "Hispanic"]}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Distribution of Party Population" && (
                <PartyPopulationDistribution
                  title={"Distribution of Party Population"}
                  showGraph={showPartyGraph}
                  setShowGraph={setShowPartyGraph}
                  navbarItem={["Republican", "Democratic"]}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Party Splits" && (
                <PartySplitsDistribution
                  title={"Distribution of Party Splits"}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Enacted Plan vs Average MMD Plans" && (
                <PlanComparison
                  title={"Enacted Plan vs Average MMD Plans"}
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default Ensemble;
