import axios from "axios";
import axiosInstance from "../util/axiosInstance";
import {
  Ability,
  Pokemon,
  PokemonData,
  Query,
  Stats,
  SubPokemonData,
  Type,
} from "../util/types";

export async function getPokemonList({
  offset,
  type,
  ability,
  keyword,
  height,
  weight,
  sort,
}: Query): Promise<{ totalItems: number; pagedPokemonList: PokemonData[] }> {
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

    if (sort) {
      pokemonList =
        sort === "asc"
          ? pokemonList.sort((a, b) => a.id - b.id)
          : pokemonList.sort((a, b) => b.id - a.id);
    }

    const startIndex = offset === null ? 0 : Number(offset);
    const pagedPokemonList = pokemonList.slice(startIndex, startIndex + 9);

    return { totalItems: pokemonList.length, pagedPokemonList };
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Pokemon list");
  }
}

export async function getPokemon(id: string) {
  try {
    const { data } = await axiosInstance.get(`pokemon/${id}`);

    const { data: speciesData } = await axiosInstance.get(
      `pokemon-species/${id}`
    );

    const pokemonData = {
      id: data.id,
      name: data.name,
      frontImage: data.sprites.front_default,
      backImage: data.sprites.back_default,
      types: data.types.map((type: Type) => type.type.name),
      abilities: data.abilities.map((ability: Ability) => ability.ability.name),
      stats: data.stats.map((stat: Stats) => {
        return { base_stat: stat.base_stat, name: stat.stat.name };
      }),
      height: data.height,
      weight: data.weight,
      color: speciesData.color.name,
      habitat: speciesData.habitat.name,
    };
    return pokemonData;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to fetch Pokemon");
  }
}

export async function getAllPokemon(offset: number): Promise<SubPokemonData[]> {
  try {
    const { data } = await axiosInstance.get(
      `pokemon/?offset=${offset}&limit=20`
    );

    const response = data.results;
    const pokemonList = await Promise.all(
      response.map(async (pokemon: Pokemon) => {
        const { data } = await axios.get(pokemon.url);
        const pokemonData = {
          id: data.id,
          name: data.name,
          frontImage: data.sprites.front_default,
        };
        return pokemonData;
      })
    );
    return pokemonList;
  } catch (error) {
    console.log(error);
    return [];
  }
}
