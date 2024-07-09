import { graphql } from "gatsby";
import React from "react";

const TestPage: React.FC<{ data: any, params: any }> = ({ data, params }) => {
  return <pre id="json">{JSON.stringify(data, null, 2)}</pre>;
}

export const query = graphql`
  query DrpdQuery($id: String) {
  drpdJson(id: { eq: $id }) {
    authors
    date
    starters {
      ability
      captured
      gender
      id
      isHiddenAbility
      items {
        id
        name
        quantity
      }
      ivs {
        atk
        def
        hp
        spatk
        spdef
        spe
      }
      level
      name
      nature
      passive
      rarity
    }
    title
    version
    waves {
      action
      biome
      double
      id
      pokemon {
        ability
        capture
        id
        gender
        captured
        isHiddenAbility
        items {
          id
          name
          quantity
        }
        ivs {
          atk
          def
          hp
          spatk
          spdef
          spe
        }
        name
        level
        nature
        passive
        rarity
      }
      reload
      trainer {
        id
        name
        type
      }
      type
    }
  }
}
`;

export default TestPage