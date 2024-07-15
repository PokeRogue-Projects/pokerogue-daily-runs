export interface DrpdJson {
    readonly version: string;
    readonly uuid: string;
    readonly label: string;
    readonly title?: string;
    readonly authors?: readonly string[];
    readonly date: string;
    readonly waves: readonly Wave[];
    readonly starters: readonly Pokemon[];
}

export interface Wave {
    readonly id: string;
    readonly reload: boolean;
    readonly type: string;
    readonly double: boolean;
    readonly actions: readonly string[];
    readonly shop: string;
    readonly biome: string;
    readonly trainer?: Trainer;
    readonly pokemon?: readonly Pokemon[];
};

export interface Pokemon {
    readonly id: string;
    readonly name: string;
    readonly ability: string;
    readonly isHiddenAbility: boolean;
    readonly passive: string;
    readonly nature: Nature;
    readonly gender: string;
    readonly rarity: string;
    readonly captured: boolean;
    readonly level: number;
    readonly items: readonly Item[];
    readonly ivs: Ivs;
};

export interface Nature {
    readonly name: string;
    readonly increased: string;
    readonly decreased: string;
}

export interface Ivs {
    readonly hp: number;
    readonly atk: number;
    readonly def: number;
    readonly spatk: number;
    readonly spdef: number;
    readonly spe: number;
};

export type Trainer = {
    readonly id: string;
    readonly name: string;
    readonly type: string;
}

export type Item = {
    readonly id: string;
    readonly name: string;
    readonly quantity: string;
}
