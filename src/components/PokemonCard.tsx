import * as React from "react";

const PokemonCard: React.FC<{
  node: any;
  pokemonIdMap: { [name: string]: string };
}> = ({ node, pokemonIdMap }) => {
  return (
    <div style={{ padding: "10px", textAlign: "center" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div>{node.name}</div>
        <div className="pokemon-card">
          <div className="pokemon-sprite">
            <img
              src={`https://wiki.pokerogue.net/_media/starters:sprites:${
                pokemonIdMap[node.name]
              }.png`}
              alt={node.name}
              style={{ height: "50px" }}
            />
          </div>
          <div className="pokemon-ivs"></div>
          <div className="pokemon-details">
            {node.nature} <br />
            {node.biome} <br />
            {node.abilityDropDown
              ? node.abilityDropDown
                  .split("_")
                  .map(
                    (word: any) =>
                      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                  )
                  .join(" ")
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PokemonCard;
