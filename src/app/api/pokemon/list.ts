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
  const res = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${take}&offset=${offset}`,
  );

  if (!res.ok) {
    throw new Error('PokeApi error!');
  }

  const pokemons = await res.json().then((response: IndexApiResponse) => {
    return { results: response.results, count: response.count };
  });

  const pokemonDetailPromises = pokemons.results.map(async (pokemon) =>
    getPokemonDetail(pokemon.url),
  );

  return {
    count: pokemons.count,
    pokemons: await Promise.all(pokemonDetailPromises),
  };
}
