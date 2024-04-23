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

export interface Query {
  offset: string | null;
  type: string | null;
  ability: string | null;
  keyword: string | null;
}

export interface FilterSelectBoxData {
  [key: string]: string;
  type: string;
  ability: string;
}

export interface FilterCheckBoxData {
  heightSmall: boolean;
  heightMedium: boolean;
  heightLarge: boolean;
  weightSmall: boolean;
  weightMedium: boolean;
  weightLarge: boolean;
}
