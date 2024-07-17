import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pokemon } from "@/types";
import * as React from "react";
import capturedImage from "../images/captured.png";
import uncapturedImage from "../images/uncaptured.png";
import { cn } from "./lib/utils";
import IvChart from "./IvChart";
import { toEnumValue } from "@/utils/enumUtils";
import { Stat, statToDisplayString } from "@/utils/stat";

export enum PokemonGender {
    MALE = "Male",
    FEMALE = "Female",
}

const PokemonCard: React.FC<{
    pokemon: Pokemon;
    biome: string;
    waveNumber?: number;
}> = ({ pokemon, biome, waveNumber }) => {
    const statIncreased = pokemon.nature.increased as Stat;
    const statDecreased = pokemon.nature.decreased as Stat;

    return (
        <Card className="w-full max-w-3xl relative">
            {waveNumber !== undefined && (
                <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center font-bold">
                    {waveNumber}
                </div>
            )}
            <CardHeader className="pb-2">
                <CardTitle className="text-2xl font-bold">
                    <div className="flex gap-3 items-center">
                        <div>{pokemon.name}</div>
                        <div
                            className={cn(
                                "w-8 h-8 ml-2 rounded-full flex items-center justify-center",
                                pokemon.gender === PokemonGender.MALE
                                    ? "bg-blue-500"
                                    : "bg-pink-500"
                            )}
                        >
                            {pokemon.gender === PokemonGender.MALE ? (
                                <p className="text-white font-medium mb-1">♂</p>
                            ) : (
                                <p className="text-white font-medium mb-2">♀</p>
                            )}
                        </div>
                        <img
                            src={
                                pokemon.captured
                                    ? capturedImage
                                    : uncapturedImage
                            }
                            alt={pokemon.captured ? "captured" : "uncaptured"}
                            className="w-10 h-10 object-contain translate-y-[2px]"
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col space-y-6">
                    <div className="flex flex-row items-center md:items-start space-y-4 justify-around md:space-y-0">
                        <img
                            src={`https://wiki.pokerogue.net/_media/starters:sprites:${pokemon.id}.png`}
                            alt={pokemon.name}
                            className="w-1/5 object-contain self-center"
                        />
                        <IvChart
                            ivs={pokemon.ivs}
                            statIncreased={statIncreased}
                            statDecreased={statDecreased}
                            className="w-3/5 min-h-32"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Card>
                            <CardContent className="p-2 gap-2 flex flex-col justify-center items-center">
                                <p className="text-md">Ability</p>
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

                        <Card>
                            <CardContent className="p-2 gap-2 flex flex-col justify-center items-center">
                                <p className="text-md">Passive</p>
                                <p className="text-xs text-center">
                                    {pokemon.passive}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="col-span-2">
                            <CardHeader className="p-3 text-center">
                                <CardTitle className="text-md">
                                    Nature
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 flex justify-center items-baseline gap-6">
                                <p className="text-md font-medium first-letter:capitalize">
                                    {pokemon.nature.name}
                                </p>
                                <div className="flex gap-2">
                                    <p className="text-xs">
                                        {statToDisplayString(statIncreased)} ▲
                                    </p>
                                    <p className="text-xs">
                                        {statToDisplayString(statDecreased)} ▼
                                    </p>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="flex flex-col col-span-2">
                            <CardHeader className="p-3 text-center">
                                <CardTitle className="text-md">Biome</CardTitle>
                            </CardHeader>
                            <CardContent className="p-3 pt-0 flex-grow flex items-center justify-center">
                                {biome !== "???" ? (
                                    <img
                                        src={`https://wiki.pokerogue.net/_media/en:biomes:en_${biome}_bg.png`}
                                        alt={biome}
                                        className="w-full object-cover rounded-md"
                                    />
                                ) : (
                                    <p className="text-center">???</p>
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
