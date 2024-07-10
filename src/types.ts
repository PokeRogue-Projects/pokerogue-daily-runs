export type Pokemon = {
    id: string;
    name: string;
    ability: string;
    captured: boolean;
    passive: string;
    nature: string;
    ivs: {
        hp: number;
        atk: number;
        def: number;
        spatk: number;
        spdef: number;
        spe: number;
    };
    gender: string;
    isHiddenAbility: boolean;
    level: number;
    rarity: string;
};

export type Wave = {
    action: string[];
    biome: string;
    double: boolean;
    id: string;
    pokemon: Pokemon[];
    reload: boolean;
    trainer?: {
        id: string;
        name: string;
        type: string;
    };
    shop: boolean | string;
    type: string;
};