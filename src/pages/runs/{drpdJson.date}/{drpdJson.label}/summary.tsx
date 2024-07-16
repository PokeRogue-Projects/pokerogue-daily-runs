import BossCard from "@/components/BossCard";
import Layout from "@/components/Layout";
import StarterCard from "@/components/StarterCard";
import SummaryNotableCaptures from "@/components/SummaryNotableCaptures";
import TrainerCard from "@/components/TrainerCard";
import { graphql, PageProps } from "gatsby";
import React from "react";


const SummaryPage: React.FC<PageProps<Queries.SummaryPageQuery>> = ({
  data,
  params
}) => {
  const drpdJson = data.drpdJson;
  const date = params.date;

  return (
    <Layout date={date}>
      <div className="container px-8 py-8 space-y-6">
        <h1 className="text-3xl font-bold">Summary</h1>
        <div className="space-y-4">
          <div>
            <h2 className="text-2xl font-bold mb-4">Starters</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {drpdJson.starters.map((starter, index) => (
                <StarterCard key={index} pokemon={starter}></StarterCard>
              ))}
            </div>
          </div>
        </div>
        <SummaryNotableCaptures drpdJson={drpdJson} />
        <div>
          <h2 className="text-2xl font-bold mb-4">Gym Leaders / Boss</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <TrainerCard
              trainerId={drpdJson.waves[19].trainer.id}
              trainerType={"Gym Leader"}
              name={drpdJson.waves[19].trainer.type}
              waveNumber={20}
            />
            <TrainerCard
              trainerId={drpdJson.waves[29].trainer.id}
              trainerType={"Gym Leader"}
              name={drpdJson.waves[29].trainer.type}
              waveNumber={30}
            />
            <TrainerCard
              trainerId={drpdJson.waves[39].trainer.id}
              trainerType={"Gym Leader"}
              name={drpdJson.waves[39].trainer.type}
              waveNumber={40}
            />
            <BossCard pokemon={drpdJson.waves[49].pokemon[0]} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query SummaryPage($id: String) {
    drpdJson(id: { eq: $id }) {
      starters {
        id
        captured
        items {
          id
          name
          quantity
        }
        isHiddenAbility
        ability
        gender
        rarity
        name
        level
        passive
        nature {
          decreased
          increased
          name
        }
        ivs {
          atk
          def
          hp
          spatk
          spdef
          spe
        }
      }
      waves {
        id
        biome
        trainer {
          id
          name
          type
        }
        pokemon {
          id
          captured
          items {
            id
            name
            quantity
          }
          isHiddenAbility
          ability
          gender
          rarity
          name
          level
          passive
          nature {
            decreased
            increased
            name
          }
          ivs {
            atk
            def
            hp
            spatk
            spdef
            spe
          }
        }
      }
    }
  }
`;

export default SummaryPage;
