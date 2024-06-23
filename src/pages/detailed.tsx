import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { determineStyle } from "../utils/styleUtils";

const DetailedPage: React.FC<{ data: any }> = ({ data }) => {
  const stageToWaveMap: { [key: string]: string[] } = {};
  const pokemonIdMap: { [name: string]: string } = {};

  data.allGoogleSpreadsheetSprites.edges.forEach((edge: any) => {
    const { name, pokemonId } = edge.node;
    pokemonIdMap[name] = pokemonId;
  });

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
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Stage
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Steps
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
                Pokémon
              </th>
              <th
                style={{
                  borderBottom: "1px solid #ccc",
                  padding: "10px",
                  textAlign: "center",
                }}
              >
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
                        <span style={determineStyle(wave)}>{wave}</span>
                        <br />
                      </React.Fragment>
                    )) || null;
                  const pokemonImageUrl = `https://wiki.pokerogue.net/_media/starters:sprites:${
                    pokemonIdMap[edge.node.name]
                  }.png`;
                  return (
                    <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        {edge.node.stage}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        {steps}
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                          }}
                        >
                          <div>{edge.node.name}</div>
                          <img
                            src={pokemonImageUrl}
                            alt={edge.node.name}
                            style={{ height: "50px" }}
                          />
                        </div>
                      </td>
                      <td style={{ padding: "10px", textAlign: "center" }}>
                        {edge.node.nature}
                      </td>
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
    allGoogleSpreadsheetSprites {
      edges {
        node {
          name
          pokemonId
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
