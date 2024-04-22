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
}

export interface Type {
  slot: number;
  type: { name: string; url: string };
}

export interface Query {
  offset: string | null;
  type: string | null;
}
