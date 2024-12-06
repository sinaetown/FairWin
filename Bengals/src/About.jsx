import React, { useState } from "react";
import SideBar from "./Components/UI/SideBar";
import Brand from "./Components/UI/Brand";
import NavBar from "./Components/UI/NavBar";

const About = () => {
  const [showSideBar, setShowSideBar] = useState(false);
  const [showContent, setShowContent] = useState("Precinct Data");

  return (
    <>
      <div className="body">
        <SideBar show={showSideBar} handleClose={() => setShowSideBar(false)} />
        <Brand />
        <div className="body-contents">
          <NavBar
            setShowContent={setShowContent}
            simpleItem={["Precinct Data", "Project Information", "Algorithms"]}
          />
          <div className="body-about">
            {showContent === "Precinct Data" && (
              <div>
                <h1 className="text-about-title">Precinct Data</h1>
                <h4>Geographical Information</h4>
                <p>
                  <b>Alabama</b>: U.S. Department of Commerce, U.S. Census
                  Bureau, Geography Division, Spatial Data Collection, and
                  Products Branch “TIGER/Line Shapefile, Current, State,
                  Alabama, 2020 Census Voting District (VTD).” October 28, 2022.
                  https://catalog.data.gov/dataset/tiger-line-shapefile-current-state-alabama-2020-census-voting-district-vtd
                </p>
                <p>
                  <b>Mississippi</b>: U.S. Department of Commerce, U.S. Census
                  Bureau, Geography Division, Spatial Data Collection and
                  Products Branch “TIGER/Line Shapefile, Current, State,
                  Mississippi 2020 Census Voting District (VTD).” October 28,
                  2022.
                  https://catalog.data.gov/dataset/tiger-line-shapefile-current-state-mississippi-2020-census-voting-district-vtd
                </p>
                <p>
                  <b>Pennsylvania</b>: U.S. Department of Commerce, U.S. Census
                  Bureau, Geography Division, Spatial Data Collection, and
                  Products Branch “TIGER/Line Shapefile, Current, State,
                  Pennsylvania, 2020 Census Voting District (VTD).” October 28,
                  2022.
                  https://catalog.data.gov/dataset/tiger-line-shapefile-current-state-pennsylvania-2020-census-voting-district-vtd
                </p>
                <h4>Demographic Information</h4>
                <p>
                  T. Kenny, Christopher, and Cory McCartan. 2021. “2020
                  Redistricting Data Files.” August 10, 2021.
                  https://alarm-redist.github.io/posts/2021-08-10-census-2020/.{" "}
                </p>
              </div>
            )}
            {showContent === "Project Information" && (
              <div>
                <h1 className="text-about-title">Project Information</h1>
                <p>
                  One of the most important aspects to consider when creating
                  district plans of a state is the gerrymandering effect: With
                  some slight tricks applied, this would enable a weak party
                  (party with fewer votes) to win over the strong party (party
                  with the most votes), which leads to unfairness in political
                  elections.
                </p>
                <p>
                  The main objective of this project lies in providing
                  statistical information on two different district plans: SMD
                  (Single Member District) and MMD (Multi Member District)
                  plans. We especially focus on showing such information with
                  respect to the minority population and political parties. We
                  expect the users to see how these two district plans differ
                  and observe the level of impact that gerrymandering would have
                  on both district plans.
                </p>
              </div>
            )}
            {showContent === "Algorithms" && (
              <div>
                <h1 className="text-about-title">Algorithms</h1>
                <p>
                  To provide sufficient data for both district plans, we have
                  generated SMD & MMD ensembles (5000 district plans generated
                  with simulation [Recom algorithm]). Also as MMD requires
                  election based on FRA (Fair Representation Act), we have
                  implemented a voting algorithm that would generate a simulated
                  result when applied to such a rule.
                </p>
                <p>
                  <b>Recom Algorithm</b>: Recom is a graph algorithm intended to
                  create a new representation of the graphs by moving a node
                  inside a subgraph to another subgraph. However, constraints
                  prevent the algorithm from generating graphs that are not
                  consistent with the original graph. Under such constraints,
                  the algorithm runs for a designated number of iterations and
                  returns a new graph with changed node compositions.
                </p>
                <p>
                  <b>Gluing Algorithm</b>: To create an MMD plan, we need to
                  “group” the districts created from the SMD plan according to
                  the set number of districts calculated by the rules provided
                  under FRA. The gluing algorithm ensures that the created group
                  is compact and checks whether the glued districts are
                  geographically apart.
                </p>
                <p>
                  <b>MMD Election Algorithm</b>: Unlike the SMD plan, MMD
                  requires to have multiple candidates inside each district,
                  requiring a distinct election method. The algorithm provides a
                  “Ballot” to each voter where the voters need to submit the
                  ranks of the candidate according to their preferences. In the
                  first round of the election, the amount of votes that each
                  candidate gets is counted by the ballots to whom the 1st
                  ranked is marked. When the candidate with the most votes has
                  votes exceeding the threshold, the candidate is elected and
                  the amount of votes that have exceeded is distributed to the
                  next ranked candidates. If it has not exceeded the threshold,
                  the candidate with the lowest number of votes is eliminated,
                  and the votes earned are distributed to the next ranked
                  candidates. Such a process loops until the required number of
                  candidates are elected.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
