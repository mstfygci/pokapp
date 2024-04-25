import pokeApi from './api';
import getPokemonDetail, { type PokemonDetail } from './detail';

interface Pokemon {
  name: string;
  url: string;
}

interface IndexApiResponse {
  count: number;
  results: Pokemon[];
}

export default async function getPokemonList(
  page: number,
  take: number,
): Promise<{ count: number; pokemons: PokemonDetail[] }> {
  const offset = (page - 1) * take;
  const response = await pokeApi
    .get<IndexApiResponse>(`pokemon?limit=${take}&offset=${offset}`)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });

  const pokemons = { results: response.results, count: response.count };

  const pokemonDetailPromises = pokemons.results.map(async (pokemon) =>
    getPokemonDetail(pokemon.url),
  );

  return {
    count: pokemons.count,
    pokemons: await Promise.all(pokemonDetailPromises),
  };
}
