export const WAVE_GROUP_SIZE = 10;

export const MAX_IV = 31;

export const GYM_FLOORS = [20, 30, 40];
export const BOSS_FLOOR = 50;

export const getPokmemonSpriteURL = (pokemonId: string) =>
  `https://wiki.pokerogue.net/_media/starters:sprites:${pokemonId}.png`;

export const getBiomeSpriteURL = (biome: string) =>
  `https://wiki.pokerogue.net/_media/en:biomes:en_${biome}_bg.png`;

export const getTrainerSpriteURL = (trainer: string) =>
  `https://wiki.pokerogue.net/_media/trainers:${trainer}.png`;
