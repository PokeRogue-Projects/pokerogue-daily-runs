import * as React from "react";
import { graphql } from "gatsby";
import Layout from "@/components/Layout";
import { determineStyle } from "../../utils/styleUtils";

type Wave = {
  action: string;
  biome: string;
  id: string;
};

type DrpdData = {
  allDrpdJson: {
    edges: Array<{
      node: {
        waves: Wave[];
      };
    }>;
  };
};

const FollowAlongPage: React.FC<{ data: DrpdData }> = ({ data }) => {
  // Flatten all waves from all DRPD files
  const allWaves = data.allDrpdJson.edges.flatMap((edge) => edge.node.waves);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Follow Along</h1>
        <ul className="space-y-4">
          {allWaves.map((wave, index) => {
            // const style = determineStyle(wave.action);

            return (
              <li key={wave.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`checkbox-${wave.id}`}
                  className="mr-3"
                />
                <label
                  htmlFor={`checkbox-${wave.id}`}
                  //className={`flex-1 p-3 rounded ${style.backgroundColor} ${style.color}`}
                >
                  <span className="font-bold">{wave.action}</span>
                  {wave.biome && (
                    <span className="ml-2 text-sm">({wave.biome})</span>
                  )}
                </label>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query {
    allDrpdJson {
      edges {
        node {
          waves {
            action
            biome
            id
          }
        }
      }
    }
  }
`;

export default FollowAlongPage;
