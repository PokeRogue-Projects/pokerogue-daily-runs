import * as React from "react";
// @ts-ignore
import caughtImage from "../images/caught.png";
// @ts-ignore
import uncaughtImage from "../images/uncaught.png";

const PokemonCard: React.FC<{
  //TODO: make partial node type for Pokemon from detailed page
  node: any;
  pokemonIdMap: { [name: string]: string };
}> = ({ node: pokemon, pokemonIdMap }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg max-w-3xl mx-auto flex flex-col justify-between h-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <h1 className="bg-white text-black px-2 py-1 rounded-full font-bold">
            {pokemon.name}
          </h1>
        </div>
        <div className="flex items-center space-x-2">
          <div className="bg-gray-200 text-black text-xl font-bold px-3 py-1 rounded-full">
            {pokemon.stage}
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <img
          src={`https://wiki.pokerogue.net/_media/starters:sprites:${
            pokemonIdMap[pokemon.name]
          }.png`}
          alt={pokemon.name}
          style={{ height: "100px" }}
        />
        <img
          src={pokemon.caught ? caughtImage : uncaughtImage}
          alt={pokemon.caught ? "Caught" : "Uncaught"}
          style={{ height: "50px" }}
        />
      </div>
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="bg-gray-200 p-2 rounded-lg">
          <h2 className="text-black font-bold">Biome</h2>
          <div className="bg-gray-400 p-2 rounded-lg mt-2">
            <img
              src="/placeholder.svg"
              alt={pokemon.biome}
              className="w-full h-12 object-cover rounded-lg"
            />
            <p className="text-white text-center mt-1">{pokemon.biome}</p>
          </div>
        </div>
        <div className="bg-gray-200 p-2 rounded-lg">
          <h2 className="text-black font-bold">Ability</h2>
          <p className="text-black mt-2">
            {pokemon.abilityDropDown
              ? pokemon.abilityDropDown
                  .split("_")
                  .map(
                    (word: any) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")
              : ""}
          </p>
        </div>
        <div className="bg-gray-200 p-2 rounded-lg">
          <h2 className="text-black font-bold">Passive</h2>
          <p className="text-black mt-2">{pokemon.passive}</p>
        </div>
        <div className="bg-gray-200 p-2 rounded-lg">
          <h2 className="text-black font-bold">Nature</h2>
          <div className="flex items-center justify-between mt-2">
            <p className="text-black">{pokemon.nature}</p>
            <div className="flex items-center space-x-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
