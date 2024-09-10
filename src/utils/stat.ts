import { Ivs } from "@/types";

export const stats = ["hp", "atk", "def", "spe", "spdef", "spatk"] as const;
export type Stat = (typeof stats)[number] | "";

export const statToDisplayString = (stat: Stat): string => {
  switch (stat) {
    case "hp":
      return "HP";
    case "atk":
      return "Attack";
    case "def":
      return "Defense";
    case "spatk":
      return "Sp. Atk";
    case "spdef":
      return "Sp. Def";
    case "spe":
      return "Speed";
    default:
      return "";
  }
};

export const getStatIv = (stat: Stat, ivs: Ivs): number => {
  switch (stat) {
    case "hp":
      return ivs.hp;
    case "atk":
      return ivs.atk;
    case "def":
      return ivs.def;
    case "spatk":
      return ivs.spatk;
    case "spdef":
      return ivs.spdef;
    case "spe":
      return ivs.spe;
    default:
      return 0;
  }
};
