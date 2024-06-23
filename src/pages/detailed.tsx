import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { determineStyle } from "../utils/styleUtils";
// @ts-ignore
import caughtImage from "../images/caught.png";
// @ts-ignore
import uncaughtImage from "../images/uncaught.png";
import PokemonCard from "../components/PokemonCard";

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

  // double battle grouping
  const groupedEdges = [];
  let currentGroup: any[] = [];
  data.allGoogleSpreadsheetDetailed.edges.forEach(
    (edge: any, index: number) => {
      const hasSteps = stageToWaveMap[edge.node.stage]?.length > 0;
      if (edge.node.name && !hasSteps) {
        if (currentGroup.length > 0) {
          currentGroup.push(edge);
        } else {
          groupedEdges.push([edge]);
        }
      } else {
        if (currentGroup.length > 0) {
          groupedEdges.push(currentGroup);
          currentGroup = [];
        }
        currentGroup.push(edge);
      }
    }
  );
  if (currentGroup.length > 0) {
    groupedEdges.push(currentGroup);
  }

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
            </tr>
          </thead>
          <tbody>
            {groupedEdges.map((group, groupIndex) => {
              if (group.length === 2) {
                // Double battle
                return (
                  <tr
                    key={groupIndex}
                    style={{ borderBottom: "1px solid #ccc" }}
                  >
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ marginRight: "10px" }}>
                          {group[0].node.stage}
                        </span>
                        <img
                          src={
                            group[0].node.caught ? caughtImage : uncaughtImage
                          }
                          alt={group[0].node.caught ? "Caught" : "Uncaught"}
                          style={{ height: "50px" }}
                        />
                        <img
                          src={
                            group[1].node.caught ? caughtImage : uncaughtImage
                          }
                          alt={group[1].node.caught ? "Caught" : "Uncaught"}
                          style={{ height: "50px" }}
                        />
                      </div>
                    </td>

                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {stageToWaveMap[group[0].node.stage]?.map((wave, idx) => (
                        <React.Fragment key={idx}>
                          <span style={determineStyle(wave)}>{wave}</span>
                          <br />
                        </React.Fragment>
                      ))}
                    </td>
                    <td>
                      <PokemonCard
                        node={group[0].node}
                        pokemonIdMap={pokemonIdMap}
                      />
                      <PokemonCard
                        node={group[1].node}
                        pokemonIdMap={pokemonIdMap}
                      />
                    </td>
                  </tr>
                );
              } else {
                return group.map((edge: any, index: number) => (
                  <tr key={index} style={{ borderBottom: "1px solid #ccc" }}>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <span style={{ marginRight: "10px" }}>
                          {edge.node.stage}
                        </span>
                        <img
                          src={edge.node.caught ? caughtImage : uncaughtImage}
                          alt={edge.node.caught ? "Caught" : "Uncaught"}
                          style={{ height: "50px" }}
                        />
                      </div>
                    </td>
                    <td style={{ padding: "10px", textAlign: "center" }}>
                      {stageToWaveMap[edge.node.stage]?.map((wave) => (
                        <React.Fragment key={wave}>
                          <span style={determineStyle(wave)}>{wave}</span>
                          <br />
                        </React.Fragment>
                      )) || null}
                    </td>
                    <td>
                      <PokemonCard
                        node={edge.node}
                        pokemonIdMap={pokemonIdMap}
                      />
                    </td>
                  </tr>
                ));
              }
            })}
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
          biome
          abilityDropDown
          caught
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
