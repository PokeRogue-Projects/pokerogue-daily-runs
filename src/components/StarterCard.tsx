import { Pokemon } from "@/types";
import { Stat } from "@/utils/stat";
import React from "react";
import { getGenderDisplay, PokemonGender } from "./PokemonCard";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

type StarterCardProps = React.HTMLAttributes<HTMLDivElement> & {
  pokemon: Pokemon;
};

const StarterCard: React.FC<StarterCardProps> = ({ pokemon, className }) => {
  const statIncreased = pokemon.nature.increased as Stat;
  const statDecreased = pokemon.nature.decreased as Stat;

  return (
    <Card className="w-full max-w-3xl relative">
      <CardHeader className="pb-4">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center">
            <div>{pokemon.name}</div>
            {getGenderDisplay(pokemon.gender as PokemonGender)}
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-row justify-around">
          <img
            src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
            alt={pokemon.name}
            className="w-1/5 aspect-square object-contain self-center"
          />

          <Card className="w-3/5">
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
                      word.slice(1).toLowerCase(),
                  )
                  .join(" ")}
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
};

export default StarterCard;
