import Layout from "@/components/Layout";
import { Separator } from "@/components/ui/separator";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

const FollowAlongPage: React.FC<PageProps<Queries.FollowAlongPageQuery>> = ({
  data,
}) => {
  // Flatten all waves from all DRPD files

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Follow Along</h1>
        <ul className="space-y-4">
          {data.drpdJson.waves.map((wave, waveIndex) => {
            return (
              <li key={waveIndex} className="items-center">
                <h2 className="font-bold py-1">Wave {waveIndex + 1}</h2>
                <ul className="space-y-1">
                  {wave.actions.map((action, actionIndex) => (
                    <li key={actionIndex}>
                      <input
                        type="checkbox"
                        id={`checkbox-${wave.id}-${actionIndex}`}
                        className="mr-3"
                      />
                      <label htmlFor={`checkbox-${wave.id}-${actionIndex}`}>
                        <span className="font-bold">{action}</span>
                      </label>
                    </li>
                  ))}
                </ul>
                {wave.biome && (
                  <span className="ml-2 text-sm">({wave.biome})</span>
                )}
                {(waveIndex + 1) % 10 === 0 && <Separator className="mt-4" />}
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query FollowAlongPage($id: String) {
    drpdJson(id: { eq: $id }) {
      waves {
        actions
        biome
        id
      }
    }
  }
`;

export default FollowAlongPage;
