import './page.css';

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

import leftArrow from '../../assets/left-arrow.svg';
import pokeImage from '../../assets/poke-ball.jpg';
import PokemonType from '../../components/pokemon-type/pokemon-type';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { getPokemonDetail } from '../api/pokemon';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const pokemon = params.slug.charAt(0).toUpperCase() + params.slug.slice(1);
  return {
    title: `${pokemon} - Pokapp`,
  };
}

export default async function Page({ params }: { params: { slug: string } }) {
  const pokemon = await getPokemonDetail(
    `https://pokeapi.co/api/v2/pokemon/${params.slug}`,
  );

  return (
    <div
      className={`flex h-screen flex-col overflow-hidden px-5 text-white ${pokemon.types[0]}`}
    >
      <div className="py-5">
        <Link className="backBg" href="/">
          <Image className="size-4" src={leftArrow} alt="Left Arrow" />
        </Link>
      </div>
      <div className="mt-4 flex grow">
        <div className="h-full w-1/3 ">
          <h1 className="text-center text-3xl font-extrabold capitalize">
            {pokemon.name}
          </h1>
          <div className="mt-2 flex justify-center gap-2">
            {pokemon.types.map((name) => (
              <PokemonType name={name} key={name} />
            ))}
          </div>
          <div className="m-4 mx-auto flex w-2/4 items-center justify-center rounded-xl border border-gray-100 bg-amber-400 px-6 py-4 shadow-2xl">
            <div className="w-1/2 text-center">
              <h2 className="pb-0.5 font-medium text-red-600">Height</h2>
              <p>{pokemon.height} cm</p>
            </div>
            <div className="w-1/2 border-l text-center">
              <h2 className="pb-0.5 font-medium text-red-600">Weight</h2>
              <p>{pokemon.weight} g</p>
            </div>
          </div>
        </div>
        <div className="relative flex h-full w-1/3 items-end justify-center">
          <div className="absolute z-10">
            <Image
              className="z-auto block max-w-none"
              src={pokemon.sprite}
              alt={pokemon.name}
              width={475}
              height={475}
            />
            <Image className="pokeBall rotar" src={pokeImage} alt="Pokeball" />
          </div>
        </div>
        <div className="h-full w-1/3">
          <h1 className="text-center text-xl font-bold">Base Stats</h1>
          <ProgressBar
            name="Hp"
            value={pokemon.stats.hp ?? 0}
            variation="danger"
          />
          <ProgressBar
            name="Attack"
            value={pokemon.stats.attack ?? 0}
            variation="success"
          />
          <ProgressBar
            name="Defense"
            value={pokemon.stats.defense ?? 0}
            variation="warning"
          />
          <ProgressBar
            name="Speed"
            value={pokemon.stats.speed ?? 0}
            variation="info"
            max={200}
          />
        </div>
      </div>
    </div>
  );
}
