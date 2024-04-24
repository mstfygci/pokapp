import './pokemon-type.css';

import type { ReactElement } from 'react';

export default function PokemonType({ name }: { name: string }): ReactElement {
  return (
    <small className="typeName my-1 rounded-full text-xs md:text-base">
      {name}
    </small>
  );
}
