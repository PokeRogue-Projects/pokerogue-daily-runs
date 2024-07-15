import { GatsbyNode } from "gatsby";
import * as path from "path";

export const onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@/components": path.resolve(__dirname, "src/components"),
        "@/lib/utils": path.resolve(__dirname, "src/components/lib/utils"),
        "@/utils": path.resolve(__dirname, "src/utils"),
      },
    },
  });
};

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({ actions }) => {
  actions.createTypes(`
    type DrpdJson implements Node @childOf(types: ["File", "Json"]) {
      version: String!
      uuid: String!
      label: String!
      title: String
      authors: [String!]
      date: String!
      waves: [Wave!]!
      starters: [Pokemon!]!
    }

    type Wave {
      id: String!
      reload: Boolean!
      type: String!
      double: Boolean!
      actions: [String!]!
      shop: String!
      biome: String!
      trainer: Trainer
      pokemon: [Pokemon!]
    }

    type Pokemon {
      id: String!
      name: String!
      ability: String!
      isHiddenAbility: Boolean!
      passive: String!
      nature: Nature!
      gender: String!
      rarity: String!
      captured: Boolean!
      level: Int!
      items: [Item!]!
      ivs: Ivs!
    }

    type Nature {
      name: String!
      increased: String!
      decreased: String!
    }

    type Ivs {
      hp: Int!
      atk: Int!
      def: Int!
      spatk: Int!
      spdef: Int!
      spe: Int!
    }
    
    type Item {
      id: String!
      name: String!
      quantity: String!
    }

    type Trainer {
      id: String!
      name: String!
      type: String!
    }
  `)
}