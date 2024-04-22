import axios from "axios";
import axiosInstance from "../util/axiosInstance";
import { Pokemon, PokemonData, Query, Type } from "../util/types";

export async function getPokemonList({
  offset,
  type,
}: Query): Promise<{ totalItems: number; pagedPokemonList: PokemonData[] }> {
  console.log(offset);
  console.log(type);
  try {
    const { data } = await axiosInstance.get(`pokemon?limit=151`);
    const response = data.results;

    let pokemonList: PokemonData[] = await Promise.all(
      response.map(async (pokemon: Pokemon) => {
        const { data } = await axios.get(pokemon.url);
        const pokemonData = {
          id: data.id,
          name: data.name,
          frontImage: data.sprites.front_default,
          backImage: data.sprites.back_default,
          types: data.types.map((type: Type) => type.type.name),
        };
        return pokemonData;
      })
    );

    if (type) {
      pokemonList = pokemonList.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }

    const startIndex = offset === null ? 0 : Number(offset);
    const pagedPokemonList = pokemonList.slice(startIndex, startIndex + 9);

    console.log(pagedPokemonList);
    return { totalItems: pokemonList.length, pagedPokemonList };
  } catch (error) {
    console.log(error);
    return { totalItems: 0, pagedPokemonList: [] };
  }
}

export async function getPokemon(id: string) {
  try {
    const { data } = await axiosInstance.get(`pokemon/${id}`);
    return data;
  } catch (error) {
    console.log(error);
  }
}
