import { Pokemon } from "@/types";
import { getStatIv, Stat, stats, statToDisplayString } from "@/utils/stat";
import React, { useEffect, useRef, useState } from "react";
import SummaryPokemonCard from "./SummaryPokemonCard";

type SummaryNotableCapturesProp = React.HTMLAttributes<HTMLDivElement> & {
  drpdJson: Queries.SummaryPageQuery["drpdJson"];
};

const ITEM_MIN_WIDTH = 250;
const GAP = 16;
const MAX_IV = 31;
const NOTABLE_RARITIES: readonly string[] = [
  "Rare",
  "Super Rare",
  "Ultra Rare",
];

const SummaryNotableCaptures: React.FC<SummaryNotableCapturesProp> = ({
  drpdJson,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemFlexBasis, setItemFlexBasis] = useState("");

  const adjustItemWidths = (containerWidth: number) => {
    const itemsPerRow = Math.floor(containerWidth / ITEM_MIN_WIDTH);
    setItemFlexBasis(
      `calc(${100 / itemsPerRow}% - ${
        (GAP * (itemsPerRow - 1)) / itemsPerRow
      }px)`
    );
  };

  const getNotableReasons = (pokemon: Pokemon): string[] => {
    if (!pokemon.captured) return [];

    const reasons: string[] = [];

    stats.forEach((stat: Stat) => {
      if (getStatIv(stat, pokemon.ivs) === MAX_IV) {
        reasons.push(`31 ${statToDisplayString(stat)}`);
      }
    });

    if (pokemon.isHiddenAbility)
      reasons.push(`Hidden Ability: ${pokemon.ability}`);

    NOTABLE_RARITIES.forEach((rarity) => {
      if (pokemon.rarity === rarity) {
        reasons.push(`${rarity} Spawn`);
      }
    });

    return reasons;
  };

  useEffect(() => {
    const observer = new ResizeObserver((entries) =>
      adjustItemWidths(entries[0].contentRect.width)
    );

    if (containerRef.current) observer.observe(containerRef.current);
    return () =>
      containerRef.current && observer.unobserve(containerRef.current);
  }, [containerRef.current]);

  return (
    <div className={className}>
      <h2 className="text-2xl font-bold mb-4">Notable Catches</h2>
      <div className={`flex flex-wrap justify-center gap-4`} ref={containerRef}>
        {drpdJson.waves
          .flatMap(
            (wave, waveIndex) =>
              wave.pokemon?.map((pokemonSingle) => ({
                waveNumber: waveIndex + 1,
                pokemon: pokemonSingle,
                notableReasons: getNotableReasons(pokemonSingle),
              })) || []
          ) // Seperate waves with multiple pokemon into two entries, along with wave number and notable reasons
          .filter((wave) => wave.notableReasons.length !== 0)
          .map((wave) => (
            <SummaryPokemonCard
              key={wave.waveNumber}
              style={{ flexBasis: itemFlexBasis }}
              pokemon={wave.pokemon}
              waveNumber={wave.waveNumber}
              notableReasons={wave.notableReasons}
            />
          ))}
      </div>
    </div>
  );
};

export default SummaryNotableCaptures;
