import * as React from "react";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">{pokemon.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
          <img
            src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
            alt={pokemon.name}
            className="w-32 h-32 object-contain"
          />
          <ChartContainer
            config={chartConfig}
            className="w-48 h-48 md:w-64 md:h-64"
          >
            <RadarChart data={getPokemonChartData(pokemon.ivs)}>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <PolarAngleAxis dataKey="stat" />
              <PolarGrid />
              <Radar
                dataKey="value"
                fill="hsl(var(--primary))"
                fillOpacity={0.7}
              />
            </RadarChart>
          </ChartContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
            <div>
              <h3 className="font-semibold mb-1">Biome</h3>
              {biome !== "???" ? (
                <img
                  src={`https://wiki.pokerogue.net/_media/en:biomes:en_${biome}_bg.png`}
                  alt={biome}
                  className="w-full h-20 object-cover rounded-md"
                />
              ) : (
                <p className="text-center">???</p>
              )}
            </div>
            <div>
              <h3 className="font-semibold mb-1">Ability</h3>
              <p>
                {pokemon.ability
                  .split("_")
                  .map(
                    (word) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")}
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Passive</h3>
              <p>{pokemon.passive}</p>
            </div>
            <div>
              <h3 className="font-semibold mb-1">Nature</h3>
              {pokemon.nature && (
                <div>
                  <p className="font-medium">
                    {pokemon.nature.split(/\s+/)[0]}
                  </p>
                  <p className="text-sm text-green-600">
                    +{pokemon.nature.split(/\s+/)[1]}{" "}
                    {pokemon.nature.split(/\s+/)[2]}
                  </p>
                  <p className="text-sm text-red-600">
                    -{pokemon.nature.split(/\s+/)[3]}{" "}
                    {pokemon.nature.split(/\s+/)[4]}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
