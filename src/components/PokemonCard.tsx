import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pokemon } from "@/types";
import * as React from "react";
import capturedImage from "../images/captured.png";
import uncapturedImage from "../images/uncaptured.png";
import { cn } from "./lib/utils";
import IvChart from "./IvChart";
import { getDecreaseStat, getIncreaseStat, Nature } from "@/utils/nature";
import { toEnumValue } from "@/utils/enumUtils";

const PokemonCard: React.FC<{
  pokemon: Pokemon;
  biome: string;
  waveNumber?: number;
}> = ({ pokemon, biome, waveNumber }) => {
  const nature = toEnumValue(Nature, pokemon.nature);

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
            <IvChart ivs={pokemon.ivs} nature={toEnumValue(Nature, pokemon.nature)} className="w-3/5 min-h-32" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                {nature && (
                  <div className="text-center space-y-3">
                    <p className="text-md font-medium">{nature}</p>
                    <div className="space-y-1">
                      <p className="text-xs">{getIncreaseStat(nature)} ▲</p>
                      <p className="text-xs">{getDecreaseStat(nature)} ▼</p>
                    </div>
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
