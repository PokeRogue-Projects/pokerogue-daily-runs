export interface DrpdData {
    version: string;
    title?: string;
    authors?: string[];
    date: string;
    waves: WaveData[];
    starters: PokemonData[];
}

export interface WaveData {
    id: string;
    reload: boolean;
    type: string;
    double: boolean;
    action: string[];
    shop?: string;
    biome: string;
    trainer?: TrainerData;
    pokemon?: PokemonData[];
};

export interface PokemonData {
    id: string;
    name: string;
    ability: string;
    isHiddenAbility: boolean;
    passive: string;
    nature: string;
    gender: string;
    rarity: string;
    captured: boolean;
    level: number;
    items: ItemData[];
    ivs: IvData;
};

export interface IvData {
    hp: number;
    atk: number;
    def: number;
    spatk: number;
    spdef: number;
    spe: number;
};

export type TrainerData = {
    id: string;
    name: string;
    type: string;
}

export type ItemData = {
    id: string;
    name: string;
    quantity: string;
}
