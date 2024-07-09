import * as React from "react";
// @ts-ignore
import caughtImage from "../images/caught.png";
// @ts-ignore
import uncaughtImage from "../images/uncaught.png";

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

const PokemonCard: React.FC<{
  node: {
    name: string;
    abilityDropDown: string;
    caught: boolean;
    passive: string;
    nature: string;
    hp: string;
    attack: string;
    defense: string;
    spAtk: string;
    spDef: string;
    speed: string;
    gender: string;
  };
  pokemonIdMap: { [name: string]: string };
}> = ({ node: pokemon, pokemonIdMap }) => {
  const getGenderCircleStyle = (gender: string) => {
    switch (gender) {
      case "♂":
        return { backgroundColor: "#228DF2" };
      case "♀":
        return { backgroundColor: "#EF737E" };
      default:
        return null;
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
        <div className="flex items-center space-x-2">
          {/* Remove the stage section as it's not in the new data structure */}
        </div>
      </div>
      <div className="flex items-center" style={{ marginTop: "-50px" }}>
        <img
          src={`https://wiki.pokerogue.net/_media/starters:sprites:${
            pokemonIdMap[pokemon.name]
          }.png`}
          alt={pokemon.name}
          style={{ height: "200px" }}
        />
        {(pokemon.gender === "♂" || pokemon.gender === "♀") && (
          <div
            style={{
              ...getGenderCircleStyle(pokemon.gender),
              width: "50px",
              height: "50px",
              borderRadius: "100%",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "5px",
            }}
          >
            {pokemon.gender}
          </div>
        )}
        <img
          src={pokemon.caught ? caughtImage : uncaughtImage}
          alt={pokemon.caught ? "Caught" : "Uncaught"}
          style={{ height: "50px", marginLeft: "10px" }}
        />
        <div className="hexagon-wrapper">
          <div className="hexagon">
            <div
              className="ivgon"
              style={{
                clipPath: createPoly(
                  parseInt(pokemon.hp),
                  parseInt(pokemon.attack),
                  parseInt(pokemon.defense),
                  parseInt(pokemon.spAtk),
                  parseInt(pokemon.spDef),
                  parseInt(pokemon.speed)
                ),
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="info-card">
        <div className="grid grid-container mt-4">
          {/* Remove the biome section as it's not in the new data structure */}
          <div className="grid-item-card" style={{ gridArea: "ability" }}>
            <div className="title-card">
              <h2 className="title-text">Ability</h2>
            </div>
            <p className="ability-passive-text">
              {pokemon.abilityDropDown
                ? pokemon.abilityDropDown
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
