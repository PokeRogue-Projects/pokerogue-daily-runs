import * as React from "react";
import { useState } from "react";
import { graphql } from "gatsby";
import Navigation from "../../components/Navigation";
import { determineStyle } from "../../utils/styleUtils";
import PokemonCard from "../../components/PokemonCard";
import TrainerCard from "../../components/TrainerCard";

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

const DetailedPage: React.FC<{ data: DrpdData; params: any }> = ({ data }) => {
  const [toggle, setToggle] = useState(false);
  const { drpdJson } = data;

  const renderPokemonCards = (pokemon: Pokemon[], biome: string) => {
    return pokemon.map((p, index) => (
      <PokemonCard key={index} pokemon={p} biome={biome} />
    ));
  };

  return (
    <div>
      <Navigation currentPage="detailed" />
      <button
        style={{ border: "1px solid black", padding: "10px" }}
        onClick={() => setToggle(!toggle)}
      >
        Dark Mode Toggle
      </button>
      {toggle ? <p>Dark Mode</p> : <p>Light Mode</p>}
      <div className="detailed-page-container">
        {drpdJson.waves.map((wave, waveIndex) => (
          <div
            key={waveIndex}
            className="group-container bg-gray-800 p-4 rounded-lg max-w-3xl mx-auto mb-8"
          >
            <div className="wave-info-card">
              <div className="wave-group">
                <span
                  // style={determineStyle(wave.action)}
                  className="text-black font-bold block mb-2"
                >
                  {wave.action}
                </span>
              </div>
            </div>
            <div className="card-container">
              {wave.trainer ? (
                <TrainerCard
                  trainerId={wave.trainer.id}
                  trainerType={wave.trainer.type}
                />
              ) : (
                renderPokemonCards(wave.pokemon, wave.biome)
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
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
        level
        name
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
