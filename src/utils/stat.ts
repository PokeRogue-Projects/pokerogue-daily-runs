import { Pokemon } from "@/types";

export enum Stat {
  HP = "HP",
  ATK = "Attack",
  DEF = "Defence",
  SPATK = "Sp. Atk",
  SPDEF = "Sp. Def",
  SPE = "Speed"
};

export const stats = [
  Stat.HP,
  Stat.ATK,
  Stat.DEF,
  Stat.SPATK,
  Stat.SPDEF,
  Stat.SPE
];

export const getStatIv = (stat: Stat, ivs: Pokemon["ivs"]) => {
  switch (stat) {
    case Stat.HP: return ivs.hp;
    case Stat.ATK: return ivs.atk;
    case Stat.DEF: return ivs.def;
    case Stat.SPATK: return ivs.spatk;
    case Stat.SPDEF: return ivs.spdef;
    case Stat.SPE: return ivs.spe;
  }
};