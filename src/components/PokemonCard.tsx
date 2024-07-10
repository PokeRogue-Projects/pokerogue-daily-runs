import * as React from "react";
import { Pokemon } from "@/types";
import { PolarAngleAxis, PolarGrid, PolarRadiusAxis, Radar, RadarChart } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "./ui/chart";
import capturedImage from "../images/captured.png";
import uncapturedImage from "../images/uncaptured.png";
import { cn } from "./lib/utils";

const getPokemonChartData = (ivs: Pokemon["ivs"]) => [
  { stat: "HP", value: ivs.hp },
  { stat: "Attack", value: ivs.atk },
  { stat: "Defense", value: ivs.def },
  { stat: "Sp. Atk", value: ivs.spatk },
  { stat: "Sp. Def", value: ivs.spdef },
  { stat: "Speed", value: ivs.spe },
];

const chartConfig = {
  value: {
    label: "IV",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const PokemonCard: React.FC<{
  pokemon: Pokemon;
  biome: string;
  waveNumber?: number;
}> = ({ pokemon, biome, waveNumber }) => {
  return (
    <Card className="w-full max-w-3xl relative">
      {waveNumber !== undefined && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {waveNumber}
        </div>
      )}
      <CardHeader className="pb-2">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center">
            <div>{pokemon.name}</div>
            <div
              className={cn(
                "w-8 h-8 ml-2 rounded-full flex items-center justify-center",
                pokemon.gender === "male" ? "bg-blue-500" : "bg-pink-500"
              )}
            >
              {pokemon.gender === "male" ? (
                <p className="text-white font-medium">♂</p>
              ) : (
                <p className="text-white font-medium">♀</p>
              )}
            </div>
            <img
              src={pokemon.captured ? capturedImage : uncapturedImage}
              alt={pokemon.captured ? "captured" : "uncaptured"}
              className="w-10 h-10 object-contain translate-y-[2px]"
            />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col space-y-6">
          <div className="flex flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
            <img
              src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
              alt={pokemon.name}
              className="w-2/5 object-contain self-center"
            />
            <ChartContainer
              config={chartConfig}
              className="w-3/5 min-h-32"
            >
              <RadarChart data={getPokemonChartData(pokemon.ivs)}>
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent />}
                />
                <PolarAngleAxis dataKey="stat" />
                <PolarRadiusAxis className="hidden" domain = {[0, 31]} />
                <PolarGrid />
                <Radar
                  dataKey="value"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.7}
                />
              </RadarChart>
            </ChartContainer>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr] gap-4">
            <Card className="h-full flex flex-col">
              <CardHeader className="p-3 text-center">
                <CardTitle className="text-md">Biome</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0 flex-grow flex items-center justify-center">
                {biome !== "???" ? (
                  <img
                    src={`https://wiki.pokerogue.net/_media/en:biomes:en_${biome}_bg.png`}
                    alt={biome}
                    className="w-full h-auto max-h-24 object-cover rounded-md"
                  />
                ) : (
                  <p className="text-center">???</p>
                )}
              </CardContent>
            </Card>

            <div className="flex flex-col space-y-2">
              <Card className="flex-1">
                <CardHeader className="p-3 text-center">
                  <CardTitle className="text-md">Ability</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-center">
                    {pokemon.ability
                      .split("_")
                      .map(
                        (word) =>
                          word.charAt(0).toUpperCase() +
                          word.slice(1).toLowerCase()
                      )
                      .join(" ")}
                  </p>
                </CardContent>
              </Card>
              <Card className="flex-1">
                <CardHeader className="p-3 text-center">
                  <CardTitle className="text-md">Passive</CardTitle>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                  <p className="text-xs text-center">{pokemon.passive}</p>
                </CardContent>
              </Card>
            </div>

            <Card className="h-full">
              <CardHeader className="p-3 text-center">
                <CardTitle className="text-md">Nature</CardTitle>
              </CardHeader>
              <CardContent className="p-3 pt-0">
                {pokemon.nature && (
                  <div className="text-md text-center">
                    <p className="font-medium">{pokemon.nature}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PokemonCard;
