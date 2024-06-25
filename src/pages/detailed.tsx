import * as React from "react";
import { graphql } from "gatsby";
import Navigation from "../components/Navigation";
import { determineStyle } from "../utils/styleUtils";
import PokemonCard from "../components/PokemonCard";
import TrainerCard from "../components/TrainerCard";

type EdgeNode = {
  node: {
    name?: string;
    stage: string;
    nature?: string;
    biome?: string;
    abilityDropDown?: string;
    passive?: string;
    caught?: boolean;
    trainerId?: string;
    trainerType?: string;
  };
};

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

  const groupedEdges: EdgeNode[][] = [];
  let currentGroup: EdgeNode[] = [];
  data.allGoogleSpreadsheetDetailed.edges.forEach(
    (edge: any, index: number) => {
      const hasSteps = stageToWaveMap[edge.node.stage]?.length > 0;
      // double battle grouping
      if (edge.node.name && !hasSteps) {
        if (currentGroup.length > 0) {
          currentGroup.push(edge);
        } else {
          groupedEdges.push([edge]);
        }
      } else {
        // single battle
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

  data.allGoogleSpreadsheetTrainers.edges.forEach((edge: EdgeNode) => {
    const index = parseInt(edge.node.stage) - 1;
    groupedEdges.splice(index, 0, [
      {
        node: edge.node,
      },
    ]);
  });

  return (
    <div>
      <Navigation />
      <div className="detailed-page-container">
        {groupedEdges.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="group-container bg-gray-800 p-4 rounded-lg max-w-3xl mx-auto mb-8"
          >
            <div className="wave-info mr-4">
              {stageToWaveMap[group[0].node.stage]?.map((wave, idx) => (
                <span
                  key={idx}
                  style={determineStyle(wave)}
                  className="wave-text block mb-2 bg-white text-black px-2 py-1 rounded-full font-bold"
                >
                  {wave}
                </span>
              ))}
            </div>
            <div className="card-container flex-grow">
              {group[0].node.trainerId && group[0].node.trainerType ? (
                <TrainerCard
                  trainerId={group[0].node.trainerId}
                  trainerType={group[0].node.trainerType}
                />
              ) : group.length === 2 ? (
                <>
                  <PokemonCard
                    node={group[0].node}
                    pokemonIdMap={pokemonIdMap}
                  />
                  <PokemonCard
                    node={group[1].node}
                    pokemonIdMap={pokemonIdMap}
                  />
                </>
              ) : (
                group.map((edge: any, index: number) => (
                  <PokemonCard
                    key={index}
                    node={edge.node}
                    pokemonIdMap={pokemonIdMap}
                  />
                ))
              )}
            </div>
          </div>
        ))}
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
          passive
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
    allGoogleSpreadsheetTrainers {
      edges {
        node {
          stage
          trainerId
          trainerType
        }
      }
    }
  }
`;

export default DetailedPage;
