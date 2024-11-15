import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams } from "react-router-dom";
import Sidebar from "./Components/Sidebar";
import { Row, Col } from "react-bootstrap";
import DistrictMap from "./Components/DistrictMap";
import Brand from "./Components/Brand";
import EnsembleSummary from "./CombinedComponents/EnsembleSummary";
import NavBar from "./Components/NavBar";
import RacialDistribution from "./CombinedComponents/RacialDistribution";
import PartySplitsDistribution from "./CombinedComponents/PartySplitsDistribution";
import PartyPopulationDistribution from "./CombinedComponents/PartyPopulationDistribution";
import PlanComparison from "./CombinedComponents/PlanComparison";
import DistrictMapTitle from "./CombinedComponents/DistrictMapTitle";
import OpportunityDistribution from "./CombinedComponents/OpportunityDistribution";

function EnsembleMMD() {
  const abbreviation = { ms: "MISSISSIPPI", al: "ALABAMA", pa: "PENNSYLVANIA" };
  const { id: selectedStateAbbr } = useParams();
  const selectedState = abbreviation[selectedStateAbbr];
  const location = useLocation().pathname;
  const SMDMMD = location.split("/")[3];
  const [showSideBar, setShowSideBar] = useState(false);
  const [geoFeature, setGeoFeature] = useState([]);
  const [showGraph, setShowGraph] = useState("blk");
  const [showContent, setShowContent] = useState("Ensemble Summary");
  const [mapKey, setMapKey] = useState(0);
  useEffect(() => {
    const initValue = () => {
      setGeoFeature([]);
    };
    const getsampleMMDMap = async () => {
      const api_sampleMMDMap = `/${selectedStateAbbr.toUpperCase()}/sampleMMDMap`;
      try {
        const sampleMMDMap = await axios.get(
          `http://localhost:8080${api_sampleMMDMap}`
        );
        setGeoFeature(sampleMMDMap.data["features"]);
        setMapKey(mapKey + 1);
        console.log("Connected!");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    initValue();
    getsampleMMDMap();
  }, [selectedStateAbbr]);
  const seatVoteCurveData = {};
  const summaryInfo = {
    districtPlans: 0,
    minorityReps: 0,
    districtPopulationRange: 0,
    republicanRep: 0,
    democraticRep: 0,
  };
  const partySplits = {
    data: [
      { name: "Republicans", count: 0, voteShare: 0 },
      { name: "Democrats", count: 0, voteShare: 0 },
    ],
    enactedPlan: {
      Republicans: 0,
      Democrats: 0,
      opportunityReps: 0,
      seatVoteData: [
        {
          Republicans: 0.0,
          Democrats: 0.0,
        },
      ],
    },
    averageMMDPlan: {
      republicans: 0,
      democrats: 0,
      opportunityReps: 0,
      seatVoteData: [
        {
          Republicans: 0.0,
          Democrats: 0.0,
        },
      ],
    },
  };
  const voteShare = 0;
  const repSeatShare = 0;
  const demSeatShare = 0;
  const enactedPlan = {
    partySplits: {
      Republicans: 0,
      Democrats: 0,
    },
    opportunityRepresentatives: 0,
    seatVoteCurveData: [],
  };
  const averageMMDPlan = {
    Republicans: 0,
    Democrats: 0,
    opportunityReps: 0,
    seatVoteData: [
      {
        Republicans: 0.0,
        Democrats: 0.0,
      },
    ],
  };
  const boxWhisker1 = {
    data: [
      {
        name: 2,
        min: 0.058453,
        lowerQuartile: 0.066818,
        median: 0.071184,
        upperQuartile: 0.07467,
        max: 0.080534,
        average: 0.070499,
        enacted: 0.061841,
      },
      {
        name: 2,
        min: 0.058453,
        lowerQuartile: 0.066818,
        median: 0.071184,
        upperQuartile: 0.07467,
        max: 0.080534,
        average: 0.070499,
        enacted: 0.061841,
      },
    ],
    option: "smd",
  };
  const boxWhisker2 = {
    data: [
      {
        name: 2,
        min: 0.058453,
        lowerQuartile: 0.066818,
        median: 0.071184,
        upperQuartile: 0.07467,
        max: 0.080534,
        average: 0.070499,
        enacted: 0.061841,
      },
      {
        name: 2,
        min: 0.058453,
        lowerQuartile: 0.066818,
        median: 0.071184,
        upperQuartile: 0.07467,
        max: 0.080534,
        average: 0.070499,
        enacted: 0.061841,
      },
    ],
    option: "smd",
  };
  return (
    <>
      <div className="body">
        <Sidebar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand
          title={selectedState}
          className={"text_selectedState_Analysis"}
        />
        <div className="body_analysis">
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
          <Row className="contents_Random">
            <Col xs={12} md={6} className="col_stateInformation">
              <DistrictMapTitle
                title={"Sample MMD Plan"}
                address={`/${selectedState}`}
              />
              <Row className="item_plot_Random">
                <DistrictMap
                  mapKey={mapKey}
                  data={geoFeature}
                  selectedState={selectedState}
                />
              </Row>
            </Col>
            <Col className="col_districtInformation_Random">
              {/* Ensemble Summary */}
              {showContent === "Ensemble Summary" && (
                <EnsembleSummary
                  title="MMD Ensemble Summary"
                  SMDMMD={SMDMMD}
                  selectedStateAbbr={selectedStateAbbr}
                />
              )}
              {/* Racial Data */}
              {showContent === "Distribution of Racial Population" && (
                <RacialDistribution
                  title={"Distribution of Racial Population"}
                  showGraph={showGraph}
                  setShowGraph={setShowGraph}
                  navbarItem={["African American", "Asian", "Hispanic"]}
                  SMDMMD={SMDMMD}
                />
              )}
              {showContent === "Opportunity Districts & Representatives" && (
                <OpportunityDistribution
                  title={"Opportunity Districts & Representatives"}
                  showGraph={showGraph}
                  setShowGraph={setShowGraph}
                  navbarItem={["African American", "Hispanic"]}
                  SMDMMD={SMDMMD}
                />
              )}
              {/* Party Data */}
              {showContent === "Distribution of Party Population" && (
                <PartyPopulationDistribution
                  title={"Distribution of Party Population"}
                  showGraph={showGraph}
                  setShowGraph={setShowGraph}
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
}

export default EnsembleMMD;
