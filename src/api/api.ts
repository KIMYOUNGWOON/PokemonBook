import axios from "axios";
import axiosInstance from "../util/axiosInstance";
import { Ability, Pokemon, PokemonData, Query, Type } from "../util/types";

export async function getPokemonList({
  offset,
  type,
  ability,
  keyword,
  height,
  weight,
}: Query): Promise<{ totalItems: number; pagedPokemonList: PokemonData[] }> {
  console.log(height);
  console.log(weight);
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
          abilities: data.abilities.map(
            (ability: Ability) => ability.ability.name
          ),
          height: data.height,
          weight: data.weight,
        };
        console.log(pokemonData.id, pokemonData.height, pokemonData.weight);
        return pokemonData;
      })
    );

    if (type) {
      pokemonList = pokemonList.filter((pokemon) =>
        pokemon.types.includes(type)
      );
    }

    if (ability) {
      pokemonList = pokemonList.filter((pokemon) =>
        pokemon.abilities.includes(ability)
      );
    }

    if (height) {
      pokemonList = pokemonList.filter((pokemon) => {
        return (
          (height.includes("small") && pokemon.height < 10) ||
          (height.includes("medium") &&
            pokemon.height >= 10 &&
            pokemon.height < 20) ||
          (height.includes("large") && pokemon.height >= 20)
        );
      });
    }

    if (weight) {
      pokemonList = pokemonList.filter((pokemon) => {
        return (
          (weight.includes("small") && pokemon.weight < 300) ||
          (weight.includes("medium") &&
            pokemon.weight >= 300 &&
            pokemon.weight < 1000) ||
          (weight.includes("large") && pokemon.weight >= 1000)
        );
      });
    }

    if (keyword) {
      pokemonList = pokemonList.filter(
        (pokemon) =>
          pokemon.name.includes(keyword) || pokemon.id === Number(keyword)
      );
    }

    const startIndex = offset === null ? 0 : Number(offset);
    const pagedPokemonList = pokemonList.slice(startIndex, startIndex + 9);

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
