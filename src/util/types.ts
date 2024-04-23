export interface Pokemon {
  name: string;
  url: string;
}

export interface PokemonData {
  id: number;
  name: string;
  frontImage: string;
  backImage: string;
  types: string[];
  abilities: string[];
  height: number;
  weight: number;
}

export interface SubPokemonData {
  id: number;
  name: string;
  frontImage: string;
}

export interface Type {
  slot: number;
  type: { name: string; url: string };
}

export interface Ability {
  ability: { name: string; url: string };
  is_hidden: boolean;
  slot: number;
}

export interface Stats {
  base_stat: number;
  effort: number;
  stat: {
    name: string;
    url: string;
  };
}

export interface Query {
  offset: string | null;
  type: string | null;
  ability: string | null;
  keyword: string | null;
  height: string | null;
  weight: string | null;
}

export interface FilterSelectBoxData {
  [key: string]: string;
  type: string;
  ability: string;
}

export interface FilterCheckBoxData {
  [key: string]: string[];
  height: string[];
  weight: string[];
}

export interface TypeColor {
  backgroundColor: string;
  fontColor: string;
}
