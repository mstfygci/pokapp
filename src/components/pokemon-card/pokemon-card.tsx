import './pokemon-card.css';

import Image from 'next/image';
import { type ReactElement } from 'react';

import pokeImage from '../../assets/poke-ball.jpg';

interface Type {
  name: string;
}

export default function PokemonCard({
  name,
  id,
  types,
  sprite,
}: {
  id: number;
  name: string;
  types: Type[];
  sprite: string;
}): ReactElement {
  return (
    <section className={`pokemonCard cursor-pointer ${types[0].name}`}>
      <h2 className="text-sm font-bold capitalize tracking-tighter text-white md:text-lg">
        {name}
      </h2>
      <h3>#{String(`${id}`).padStart(3, '0')}</h3>
      <figure className="flex items-center justify-center">
        <figcaption className="flex w-1/2  flex-col items-center justify-center">
          {types.map((type) => (
            <small
              key={`${id}_${type.name}`}
              className="typeName my-1 rounded-full text-xs md:text-base"
            >
              {type.name}
            </small>
          ))}
        </figcaption>
        <div className="relative w-1/2">
          <Image className="pokeBall" src={pokeImage} alt="Pokeball" />
          <Image
            className="pokemonImg"
            src={sprite}
            alt={name}
            width={475}
            height={475}
          />
        </div>
      </figure>
    </section>
  );
}
