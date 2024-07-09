import * as React from "react";
// @ts-ignore
import caughtImage from "../images/caught.png";
// @ts-ignore
import uncaughtImage from "../images/uncaught.png";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";

// Replace the chartData with Pokemon stats
const getPokemonChartData = (ivs: PokemonData["ivs"]) => [
  { stat: "HP", value: ivs.hp },
  { stat: "Attack", value: ivs.atk },
  { stat: "Defense", value: ivs.def },
  { stat: "Sp. Atk", value: ivs.spatk },
  { stat: "Sp. Def", value: ivs.spdef },
  { stat: "Speed", value: ivs.spe },
];

// Update the chartConfig
const chartConfig = {
  value: {
    label: "IV",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

function createPoly(
  health: number,
  attack: number,
  defense: number,
  spAtk: number,
  spDef: number,
  speed: number
): string {
  return (
    "polygon(50% " +
    (50 - Math.floor((health / 31) * 50)) +
    "%, " +
    (50 + Math.floor((attack / 31) * 50)) +
    "% " +
    (50 - Math.floor((attack / 31) * 25)) +
    "%, " +
    (50 + Math.floor((defense / 31) * 50)) +
    "% " +
    (50 + Math.floor((defense / 31) * 25)) +
    "%, 50% " +
    (50 + Math.floor((speed / 31) * 50)) +
    "%, " +
    (50 - Math.floor((spDef / 31) * 50)) +
    "% " +
    (50 + Math.floor((spDef / 31) * 25)) +
    "%, " +
    (50 - Math.floor((spAtk / 31) * 50)) +
    "% " +
    (50 - Math.floor((spAtk / 31) * 25)) +
    "%)"
  );
}

type PokemonData = {
  id: string;
  name: string;
  ability: string;
  captured: boolean;
  passive: string;
  nature: string;
  ivs: {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    spe: number;
  };
  gender: string;
};

const PokemonCard: React.FC<{
  pokemon: PokemonData;
  biome: string;
}> = ({ pokemon, biome }) => {
  const getGenderCircleStyle = (gender: string) => {
    switch (gender) {
      case "male":
        return { backgroundColor: "#228DF2" };
      case "female":
        return { backgroundColor: "#EF737E" };
      default:
        return null;
    }
  };

  const getGenderSymbol = (gender: string) => {
    switch (gender) {
      case "male":
        return "♂";
      case "female":
        return "♀";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div className="flex-1 flex justify-center">
          <h1 className="bg-white text-black px-2 py-1 rounded-full font-bold">
            {pokemon.name}
          </h1>
        </div>
      </div>
      <div className="flex items-start justify-between mt-4">
        <div className="flex flex-col items-center">
          <img
            src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
            alt={pokemon.name}
            style={{ height: "150px" }}
          />
          <div className="flex items-center mt-2">
            {(pokemon.gender === "male" || pokemon.gender === "female") && (
              <div
                style={{
                  ...getGenderCircleStyle(pokemon.gender),
                  width: "30px",
                  height: "30px",
                  borderRadius: "100%",
                  display: "inline-flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "5px",
                }}
              >
                {getGenderSymbol(pokemon.gender)}
              </div>
            )}
            <img
              src={pokemon.captured ? caughtImage : uncaughtImage}
              alt={pokemon.captured ? "Caught" : "Uncaught"}
              style={{ height: "30px" }}
            />
          </div>
        </div>

        <ChartContainer config={chartConfig} className="w-[200px] h-[200px]">
          <RadarChart data={getPokemonChartData(pokemon.ivs)}>
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <PolarAngleAxis dataKey="stat" />
            <PolarGrid />
            <Radar dataKey="value" fill="#234998" fillOpacity={0.95} />
          </RadarChart>
        </ChartContainer>
      </div>
      <div className="info-card">
        <div className="grid grid-container mt-4">
          <div className="grid-item-card" style={{ gridArea: "biome" }}>
            <div className="title-card">
              <h2 className="title-text">Biome</h2>
            </div>
            <div className="rounded-lg mt-2">
              {biome != "???" ? (
                <img
                  src={`https://wiki.pokerogue.net/_media/en:biomes:en_${biome}_bg.png`}
                  alt={biome}
                  className="w-full object-cover rounded-lg"
                />
              ) : (
                <p className="text-center">???</p>
              )}
            </div>
          </div>
          <div className="grid-item-card" style={{ gridArea: "ability" }}>
            <div className="title-card">
              <h2 className="title-text">Ability</h2>
            </div>
            <p className="ability-passive-text">
              {pokemon.ability
                ? pokemon.ability
                    .split("_")
                    .map(
                      (word: string) =>
                        word.charAt(0).toUpperCase() +
                        word.slice(1).toLowerCase()
                    )
                    .join(" ")
                : ""}
            </p>
          </div>
          <div className="grid-item-card" style={{ gridArea: "passive" }}>
            <div className="title-card">
              <h2 className="title-text">Passive</h2>
            </div>
            <p className="ability-passive-text">{pokemon.passive}</p>
          </div>
          <div className="grid-item-card" style={{ gridArea: "nature" }}>
            <div className="title-card">
              <h2 className="title-text">Nature</h2>
            </div>
            {pokemon.nature && (
              <div className="flex items-center">
                <div className="nature-name nature-items">
                  {pokemon.nature.split(/\s+/)[0]}
                </div>
                <div className="nature-modifiers nature-items">
                  <div className="increase-stat">
                    {pokemon.nature.split(/\s+/)[1] +
                      pokemon.nature.split(/\s+/)[2]}
                  </div>
                  <div className="decrease-stat">
                    {pokemon.nature.split(/\s+/)[3] +
                      " " +
                      pokemon.nature.split(/\s+/)[4]}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
