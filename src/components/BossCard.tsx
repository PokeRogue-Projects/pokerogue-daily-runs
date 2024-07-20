import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Pokemon } from "@/types";

type BossCardProps = React.HTMLAttributes<HTMLDivElement> & {
  pokemon: Pokemon;
};

const BossCard: React.FC<BossCardProps> = ({ pokemon, className }) => {
  const waveNumber = 50;

  return (
    <Card className="w-full max-w-sm mx-auto relative">
      {!!waveNumber && (
        <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
          {waveNumber}
        </div>
      )}
      <CardContent className="flex flex-col items-center p-6">
        <p className="text-lg font-semibold mb-2">Boss</p>
        <p className="text-xl font-bold mb-4">{pokemon.name}</p>
        <div className="rounded-lg p-4 max-w-4/5 aspect-square bg-purple-200">
          <img
            src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
            alt={pokemon.name}
            className="w-32 max-w-full aspect-square object-contain self-center"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default BossCard;
