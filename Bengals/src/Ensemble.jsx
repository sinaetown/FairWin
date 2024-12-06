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
  const smdmmd = location.split("/")[3];
  const selectedState = abbreviation[selectedStateAbbr];
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [showRacialPopulationGraph, setShowRacialPopulationGraph] =
    useState("black");
  const [showOpportunityDistrictGraph, setShowOpportunityDistrictGraph] =
    useState("black");
  const [showPartyGraph, setShowPartyGraph] = useState("republican");
  const [showContent, setShowContent] = useState("Ensemble Summary");
  const [mapKey, setMapKey] = useState(0);

  useEffect(() => {
    const getMap = async () => {
      const api_sampleMMDMap = `/${selectedStateAbbr.toUpperCase()}/sample-mmd-map`;
      const api_enactedMap = `/${selectedStateAbbr.toUpperCase()}/enacted-map`;
      let map;

      try {
        if (smdmmd == "smd") {
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

    setGeoFeature([]);
    getMap();
  }, [selectedStateAbbr, smdmmd]);

  useEffect(() => {
    setShowRacialPopulationGraph("black");
    setShowOpportunityDistrictGraph("black");
    setShowPartyGraph("republican");
  }, [showContent]);

  return (
    <>
      <div className="body">
        <SideBar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand title={selectedState} className={"text-brand"} />
        <div className="body-contents">
          {smdmmd == "smd" && (
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
                  items: [
                    "Distribution of Party Population",
                    "Distribution of Party Splits",
                  ],
                },
              ]}
            />
          )}
          {smdmmd == "mmd" && (
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
                  items: [
                    "Distribution of Party Population",
                    "Distribution of Party Splits",
                  ],
                },
              ]}
            />
          )}
          <Row className="map-contents-row">
            <Col xs={12} md={6} className="map-contents-col">
              {smdmmd == "smd" && (
                <DistrictMapTitle
                  title={"Enacted Plan"}
                  address={`/${selectedStateAbbr}`}
                />
              )}
              {smdmmd == "mmd" && (
                <DistrictMapTitle
                  title={"Sample MMD Plan"}
                  address={`/${selectedStateAbbr}`}
                />
              )}
              <Row className="district-map-container">
                <DistrictMap
                  mapKey={mapKey}
                  data={geoFeature}
                  selectedState={selectedState}
                />
              </Row>
            </Col>
            <Col className="info-contents-col">
              {showContent === "Ensemble Summary" && (
                <EnsembleSummary
                  title={`${smdmmd.toLocaleUpperCase()} Ensemble Summary`}
                  smdmmd={smdmmd}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Distribution of Racial Population" && (
                <RacialDistribution
                  title={"Distribution of Racial Population"}
                  showGraph={showRacialPopulationGraph}
                  setShowGraph={setShowRacialPopulationGraph}
                  navbarItem={["African American", "Asian", "Hispanic"]}
                  smdmmd={smdmmd}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Opportunity Districts & Representatives" && (
                <OpportunityDistribution
                  title={"Opportunity Districts & Representatives"}
                  showGraph={showOpportunityDistrictGraph}
                  setShowGraph={setShowOpportunityDistrictGraph}
                  navbarItem={["African American", "Asian", "Hispanic"]}
                  smdmmd={smdmmd}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Distribution of Party Population" && (
                <PartyPopulationDistribution
                  title={"Distribution of Party Population"}
                  showGraph={showPartyGraph}
                  setShowGraph={setShowPartyGraph}
                  navbarItem={["Republican", "Democratic"]}
                  smdmmd={smdmmd}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Distribution of Party Splits" && (
                <PartySplitsDistribution
                  title={"Distribution of Party Splits"}
                  smdmmd={smdmmd}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {showContent === "Enacted Plan vs Average MMD Plans" && (
                <PlanComparison
                  title={"Enacted Plan vs Average MMD Plans"}
                  smdmmd={smdmmd}
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
