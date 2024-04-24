import './page.css';

import Image from 'next/image';
import Link from 'next/link';

import pokeImage from '../../assets/poke-ball.jpg';
import PokemonType from '../../components/pokemon-type/pokemon-type';
import ProgressBar from '../../components/progress/progressBar';

export default function Page({ params }: { params: { slug: string } }) {
  const types = [{ name: 'Grass' }, { name: 'Poison' }];

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#87c75e] px-5 text-white">
      <div className="py-5">
        <Link className="backBg" href="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            aria-hidden="true"
            className="size-4"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
            />
          </svg>
        </Link>
      </div>
      <div className="mt-4 flex grow">
        <div className="h-full w-1/3 ">
          <h1 className="text-center text-3xl font-extrabold capitalize">
            {params.slug}
          </h1>
          <div className="mt-2 flex justify-center gap-2">
            {types.map((type) => (
              <PokemonType name={type.name} key={type.name} />
            ))}
          </div>
          <div className="m-4 mx-auto flex w-2/4 items-center justify-center rounded-xl border border-gray-100 bg-amber-400 px-6 py-4 shadow-2xl">
            <div className="w-1/2 text-center">
              <h2 className="pb-0.5 font-medium text-red-600">Height</h2>
              <p>2&apos; 04&quot;</p>
            </div>
            <div className="w-1/2 border-l text-center">
              <h2 className="pb-0.5 font-medium text-red-600">Weight</h2>
              <p>15.2 lbs</p>
            </div>
          </div>
        </div>
        <div className="relative flex h-full w-1/3 items-end justify-center">
          <div className="absolute z-10">
            <Image
              className="z-auto block max-w-none"
              src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
              alt={params.slug}
              width={475}
              height={475}
            />
            <Image className="pokeBall rotar" src={pokeImage} alt="Pokeball" />
          </div>
        </div>
        <div className="h-full w-1/3">
          <h1 className="text-center text-xl font-bold">Base Stats</h1>
          <ProgressBar name="Base Happiness" percent={13} variation="success" />
          <h1 className="mt-8 text-center text-xl font-bold">Training</h1>
          <ProgressBar name="Base Happiness" percent={63} variation="danger" />
          <ProgressBar name="Base Happiness" percent={23} variation="warning" />
          <ProgressBar name="Base Happiness" percent={48} variation="info" />
          <ProgressBar name="Base Happiness" percent={13} variation="success" />
        </div>
      </div>
    </div>
  );
}
