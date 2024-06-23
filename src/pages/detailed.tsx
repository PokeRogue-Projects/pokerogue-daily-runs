import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";

const DetailedPage: React.FC<{ data: any }> = ({ data }) => {
  const stageToWaveMap: { [key: string]: string[] } = {};
  data.allGoogleSpreadsheetFollowAlong.edges.forEach((edge: any) => {
    const { wave, waveNumber } = edge.node;
    if (!wave.startsWith("Wave")) {
      if (!stageToWaveMap[waveNumber]) {
        stageToWaveMap[waveNumber] = [];
      }
      stageToWaveMap[waveNumber].push(wave);
    }
  });

  return (
    <div>
      <Navigation />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table style={{ width: "80%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Stage
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Steps
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Name
              </th>
              <th style={{ borderBottom: "1px solid #ccc", padding: "10px" }}>
                Nature
              </th>
            </tr>
          </thead>
          <tbody>
            {data.allGoogleSpreadsheetDetailed.edges.map(
              (edge: any, index: any) => {
                if (edge.node.name) {
                  const steps =
                    stageToWaveMap[edge.node.stage]?.map((wave) => (
                      <React.Fragment key={wave}>
                        {wave}
                        <br />
                      </React.Fragment>
                    )) || null;
                  return (
                    <tr key={index}>
                      <td style={{ padding: "10px" }}>{edge.node.stage}</td>
                      <td style={{ padding: "10px" }}>{steps}</td>
                      <td style={{ padding: "10px" }}>{edge.node.name}</td>
                      <td style={{ padding: "10px" }}>{edge.node.nature}</td>
                    </tr>
                  );
                }
              }
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const query = graphql`
  query {
    allGoogleSpreadsheetDetailed {
      edges {
        node {
          name
          stage
          nature
        }
      }
    }
    allGoogleSpreadsheetFollowAlong {
      edges {
        node {
          wave
          waveNumber
        }
      }
    }
  }
`;

export default DetailedPage;
