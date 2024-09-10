export const WAVE_GROUP_SIZE = 10;

export const MAX_IV = 31;

export const GYM_FLOORS = [20, 30, 40];
export const BOSS_FLOOR = 50;

const POKEROGUE_MEDIA_URL = "https://wiki.pokerogue.net/_media";

export const getPokmemonSpriteURL = (pokemonId: number) =>
  `${POKEROGUE_MEDIA_URL}/starters:sprites:${pokemonId}.png`;

export const getBiomeSpriteURL = (biome: string) =>
  `${POKEROGUE_MEDIA_URL}/en:biomes:en_${biome}_bg.png`;

export const getTrainerSpriteURL = (trainer: string) => {
  if (trainer === "Crasher Wake")
      return `${POKEROGUE_MEDIA_URL}/trainers:crasher_wa.png`; // Crasher Wake has a different file name
  return `${POKEROGUE_MEDIA_URL}/trainers:${trainer}.png`; 
}