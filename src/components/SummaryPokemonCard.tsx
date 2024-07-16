import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pokemon } from "@/types";
import React from "react";
import { cn } from "./lib/utils";

type SummaryPokemonCardProps = React.HTMLAttributes<HTMLDivElement> & {
  pokemon: Pokemon;
  waveNumber: number;
  notableReasons: readonly string[];
};

const SummaryPokemonCard: React.FC<SummaryPokemonCardProps> = ({
  pokemon,
  waveNumber,
  notableReasons,
  className,
  style,
}) => {
  return (
    <Card
      style={style}
      className={cn("w-full max-w-3xl relative flex flex-col", className)}
    >
      {waveNumber !== undefined && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {waveNumber}
        </div>
      )}
      <CardHeader className="pb-2 pt-4">
        <CardTitle className="text-2xl font-bold">
          <div className="flex items-center">
            <div>{pokemon.name}</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-4 flex-grow flex justify-around">
        <img
          src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
          alt={pokemon.name}
          className="w-1/5 aspect-square object-contain self-center"
        />
        <Card className="self-stretch w-3/5">
          <div className="p-4 w-full h-full flex flex-col items-start justify-center">
            {notableReasons.map((reason) => (
              <div>{reason}</div>
            ))}
          </div>
        </Card>
      </CardContent>
    </Card>
  );
};

export default SummaryPokemonCard;
