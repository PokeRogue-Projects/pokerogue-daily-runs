import { Stat } from "./stat"

export enum Nature {
  HARDY = "Hardy",
  LONELY = "Lonely",
  BRAVE = "Brave",
  ADAMANT = "Adamant",
  NAUGHTY = "Naughty",
  BOLD = "Bold",
  DOCILE = "Docile",
  RELAXED = "Relaxed",
  IMPISH = "Impish",
  LAX = "Lax",
  TIMID = "Timid",
  HASTY = "Hasty",
  SERIOUS = "Serious",
  JOLLY = "Jolly",
  NAIVE = "Naive",
  MODEST = "Modest",
  MILD = "Mild",
  QUIET = "Quiet",
  BASHFUL = "Bashful",
  RASH = "Rash",
  CALM = "Calm",
  GENTLE = "Gentle",
  SASSY = "Sassy",
  CAREFUL = "Careful",
  QUIRKY = "Quirky"
};

export const getIncreaseStat = (nature: Nature): Stat | null => {
  switch (nature) {
    case Nature.LONELY:
    case Nature.BRAVE:
    case Nature.ADAMANT:
    case Nature.NAUGHTY:
      return Stat.ATK;
    case Nature.BOLD:
    case Nature.RELAXED:
    case Nature.IMPISH:
    case Nature.LAX:
      return Stat.DEF;
    case Nature.MODEST:
    case Nature.MILD:
    case Nature.QUIET:
    case Nature.RASH:
      return Stat.SPATK;
    case Nature.CALM:
    case Nature.GENTLE:
    case Nature.SASSY:
    case Nature.CAREFUL:
      return Stat.SPDEF;
    case Nature.TIMID:
    case Nature.HASTY:
    case Nature.JOLLY:
    case Nature.NAIVE:
      return Stat.SPE;
    case Nature.HARDY:
    case Nature.DOCILE:
    case Nature.SERIOUS:
    case Nature.BASHFUL:
    case Nature.QUIRKY:
      return null;
  }
}

export const getDecreaseStat = (nature: Nature): Stat | null => {
  switch(nature) {
    case Nature.BOLD:
    case Nature.TIMID:
    case Nature.MODEST:
    case Nature.CALM:
      return Stat.ATK;
    case Nature.LONELY:
    case Nature.HASTY:
    case Nature.MILD:
    case Nature.GENTLE:
      return Stat.DEF;
    case Nature.ADAMANT:
    case Nature.IMPISH:
    case Nature.JOLLY:
    case Nature.CAREFUL:
      return Stat.SPATK;
    case Nature.NAUGHTY:
    case Nature.LAX:
    case Nature.NAIVE:
    case Nature.RASH:
      return Stat.SPDEF;
    case Nature.BRAVE:
    case Nature.RELAXED:
    case Nature.QUIET:
    case Nature.SASSY:
      return Stat.SPE;
    case Nature.HARDY:
    case Nature.DOCILE:
    case Nature.SERIOUS:
    case Nature.BASHFUL:
    case Nature.QUIRKY:
      return null;
  }
}

export const isIncreaseStat = (stat: Stat, nature: Nature): boolean => {
  return stat == getIncreaseStat(nature);
}

export const isDecreaseStat = (stat: Stat, nature: Nature): boolean => {
  return stat == getDecreaseStat(nature);
}