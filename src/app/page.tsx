import Link from 'next/link';
import React from 'react';

import Pagination from '../components/pagination/pagination';
import PokemonCard from '../components/pokemon-card/pokemon-card';

interface Pokemon {
  name: string;
  url: string;
}

interface PokemonDetail {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: string[];
}

interface IndexApiResponse {
  count: number;
  results: Pokemon[];
}

interface DetailApiResponse {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    },
  ];
}

async function getPokemonDetail(url: string): Promise<PokemonDetail> {
  const detailResp = await fetch(url);

  if (!detailResp.ok) {
    throw new Error(`PokeApi error for ${url}`);
  }

  return detailResp.json().then((resp: DetailApiResponse) => {
    return {
      id: resp.id,
      name: resp.name,
      url,
      sprite: resp.sprites.other['official-artwork'].front_default,
      types: resp.types.map((type) => type.type.name),
    } satisfies PokemonDetail;
  });
}

async function getPokemons(
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

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const currentPage = Number(searchParams?.page) || 1;
  const { count, pokemons } = await getPokemons(currentPage, 10);
  const pageCount = Math.ceil(count / 10);

  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="py-5 pl-4 text-3xl font-bold md:self-start md:pl-16">
        Pokapp
      </h1>
      <div className="z-10 mx-auto grid w-full grid-cols-2 justify-items-center gap-2 pb-10 md:w-11/12 md:grid-cols-4 md:gap-x-4 md:gap-y-5 xl:grid-cols-5">
        {pokemons.map((pokemon) => (
          <Link href={`/${pokemon.name}`} key={pokemon.name}>
            <PokemonCard
              id={pokemon.id}
              name={pokemon.name}
              types={pokemon.types}
              sprite={pokemon.sprite}
            />
          </Link>
        ))}
      </div>
      <div className="flex w-full justify-center gap-4">
        <Pagination page={currentPage} pageCount={pageCount} />
      </div>
    </div>
  );
}
