import Layout from "@/components/Layout";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

const FollowAlongPage: React.FC<PageProps<Queries.FollowAlongPageQuery>> = ({ data }) => {
  // Flatten all waves from all DRPD files
  const allWaves = data.allDrpdJson.edges.flatMap((edge) => edge.node.waves);

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Follow Along</h1>
        <ul className="space-y-4">
          {allWaves.map((wave, index) => {
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
                  <span className="font-bold">{wave.actions}</span>
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
  query FollowAlongPage {
    allDrpdJson {
      edges {
        node {
          waves {
            actions
            biome
            id
          }
        }
      }
    }
  }
`;

export default FollowAlongPage;
