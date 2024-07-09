import * as React from "react";
import { useState } from "react";
import { graphql } from "gatsby";
import PokemonCard from "@/components/PokemonCard";
import TrainerCard from "@/components/TrainerCard";
import Layout from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Pokemon = {
  id: string;
  name: string;
  ability: string;
  captured: boolean;
  gender: string;
  isHiddenAbility: boolean;
  items: Array<{ id: string; name: string; quantity: number }>;
  ivs: {
    atk: number;
    def: number;
    hp: number;
    spatk: number;
    spdef: number;
    spe: number;
  };
  level: number;
  nature: string;
  passive: string;
  rarity: string;
};

type Wave = {
  action: string;
  biome: string;
  double: boolean;
  id: string;
  pokemon: Pokemon[];
  reload: boolean;
  trainer?: {
    id: string;
    name: string;
    type: string;
  };
  type: string;
};

type DrpdData = {
  drpdJson: {
    authors: string[];
    date: string;
    starters: Pokemon[];
    title: string;
    version: string;
    waves: Wave[];
  };
};

const WaveInfoCard: React.FC<{ wave: Wave; waveIndex: number }> = ({
  wave,
  waveIndex,
}) => (
  <Card className="h-fit">
    <CardHeader>
      <CardTitle className="text-2xl font-bold">
        Wave {waveIndex + 1}: {wave.action}
      </CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        <div>
          <p className="font-semibold">Biome:</p>
          <p>{wave.biome}</p>
        </div>
        <div>
          <p className="font-semibold">Type:</p>
          <p>{wave.type}</p>
        </div>
        {wave.double && (
          <div>
            <p className="font-semibold">Double:</p>
            <p>Yes</p>
          </div>
        )}
        {wave.reload && (
          <div>
            <p className="font-semibold">Reload:</p>
            <p>Yes</p>
          </div>
        )}
      </div>
    </CardContent>
  </Card>
);

const DetailedPage: React.FC<{ data: DrpdData; params: any }> = ({ data }) => {
  const { drpdJson } = data;

  const renderPokemonCards = (pokemon: Pokemon[], biome: string) => (
    <div className="space-y-6">
      {pokemon.map((p, index) => (
        <PokemonCard key={index} pokemon={p} biome={biome} />
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {drpdJson.waves.map((wave, waveIndex) => (
          <div key={waveIndex} className="mb-12">
            {wave.trainer ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <WaveInfoCard wave={wave} waveIndex={waveIndex} />
                </div>
                <div className="lg:w-2/3">
                  <TrainerCard
                    trainerId={wave.trainer.id}
                    trainerType={wave.trainer.type}
                  />
                </div>
              </div>
            ) : wave.pokemon.length === 1 ? (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3">
                  <WaveInfoCard wave={wave} waveIndex={waveIndex} />
                </div>
                <div className="lg:w-2/3">
                  {renderPokemonCards(wave.pokemon, wave.biome)}
                </div>
              </div>
            ) : (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="lg:w-1/3 flex items-center">
                  <WaveInfoCard wave={wave} waveIndex={waveIndex} />
                </div>
                <div className="lg:w-2/3">
                  <div className="flex flex-col gap-6">
                    {renderPokemonCards([wave.pokemon[0]], wave.biome)}
                    {renderPokemonCards([wave.pokemon[1]], wave.biome)}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export const query = graphql`
  query DrpdQuery($id: String) {
    drpdJson(id: { eq: $id }) {
      authors
      date
      starters {
        ability
        captured
        gender
        id
        isHiddenAbility
        items {
          id
          name
          quantity
        }
        ivs {
          atk
          def
          hp
          spatk
          spdef
          spe
        }
        name
        level
        nature
        passive
        rarity
      }
      title
      version
      waves {
        action
        biome
        double
        id
        pokemon {
          ability
          capture
          id
          gender
          captured
          isHiddenAbility
          items {
            id
            name
            quantity
          }
          ivs {
            atk
            def
            hp
            spatk
            spdef
            spe
          }
          name
          level
          nature
          passive
          rarity
        }
        reload
        trainer {
          id
          name
          type
        }
        type
      }
    }
  }
`;

export default DetailedPage;
