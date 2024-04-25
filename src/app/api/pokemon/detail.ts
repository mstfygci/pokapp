import pokeApi from './api';

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
  stats: [
    {
      base_stat: number;
      stat: { name: string };
    },
  ];
  height: number;
  weight: number;
}

export interface PokemonDetail {
  id: number;
  name: string;
  url: string;
  sprite: string;
  types: string[];
  height: number;
  weight: number;
  stats: {
    hp?: number;
    attack?: number;
    defense?: number;
    speed?: number;
  };
}

export default async function getPokemonDetail(
  url: string,
): Promise<PokemonDetail> {
  const responsive = await pokeApi
    .get<DetailApiResponse>(url)
    .then((res) => res.data)
    .catch((error) => {
      throw new Error(error);
    });

  return {
    id: responsive.id,
    name: responsive.name,
    url,
    sprite: responsive.sprites.other['official-artwork'].front_default,
    types: responsive.types.map((type) => type.type.name),
    height: responsive.height,
    weight: responsive.weight,
    stats: {
      hp: responsive.stats.find((stat) => stat.stat.name === 'hp')?.base_stat,
      attack: responsive.stats.find((stat) => stat.stat.name === 'attack')
        ?.base_stat,
      defense: responsive.stats.find((stat) => stat.stat.name === 'defense')
        ?.base_stat,
      speed: responsive.stats.find((stat) => stat.stat.name === 'speed')
        ?.base_stat,
    },
  } satisfies PokemonDetail;
}
