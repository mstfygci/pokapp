import Link from 'next/link';
import React from 'react';

import Pagination from '../components/pagination/pagination';
import PokemonCard from '../components/pokemon-card/pokemon-card';
import { getPokemonList } from './api/pokemon';

export const metadata = {
  title: 'Pokapp',
  description: 'Pokapp created by Mustafa Yagci',
};

export default async function Home({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const pageLimit = Number(process.env.NEXT_PAGE_LIMIT) ?? 10;
  const currentPage = Number(searchParams?.page) || 1;
  const { count, pokemons } = await getPokemonList(currentPage, pageLimit);
  const pageCount = Math.ceil(count / pageLimit);

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
