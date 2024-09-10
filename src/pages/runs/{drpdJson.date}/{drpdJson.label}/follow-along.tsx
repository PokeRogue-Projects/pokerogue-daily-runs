import { FollowAlongWaveGroup } from "@/components/FollowAlongWave";
import Layout from "@/components/Layout";
import Navigation from "@/components/Navigation";
import { chunkArray } from "@/utils/arrayUtils";
import { WAVE_GROUP_SIZE } from "@/utils/constants";
import { graphql, PageProps } from "gatsby";
import * as React from "react";

const FollowAlongPage: React.FC<PageProps<Queries.FollowAlongPageQuery>> = ({
  data,
  params,
}) => {
  const waves = data.drpdJson.waves.slice(1); // 1-index waves
  const date = params.date;

  return (
    <Layout date={date}>
      <Navigation />
      <div className="container md:w-[1000px] max-w-full mx-auto px-4 py-8">
        {chunkArray(waves, WAVE_GROUP_SIZE).map((waveGroup, groupIndex) => (
          <FollowAlongWaveGroup
            key={groupIndex}
            className="ml-1"
            waves={waveGroup}
            startIndex={groupIndex * WAVE_GROUP_SIZE}
          />
        ))}
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
        reload
        shop
        id
      }
    }
  }
`;

export default FollowAlongPage;
