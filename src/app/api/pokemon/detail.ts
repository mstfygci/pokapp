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
  const detailResp = await fetch(url);

  if (!detailResp.ok) {
    throw new Error(`PokeApi error for ${url}`);
  }

  return detailResp.json().then(
    (resp: DetailApiResponse) =>
      ({
        id: resp.id,
        name: resp.name,
        url,
        sprite: resp.sprites.other['official-artwork'].front_default,
        types: resp.types.map((type) => type.type.name),
        height: resp.height,
        weight: resp.weight,
        stats: {
          hp: resp.stats.find((stat) => stat.stat.name === 'hp')?.base_stat,
          attack: resp.stats.find((stat) => stat.stat.name === 'attack')
            ?.base_stat,
          defense: resp.stats.find((stat) => stat.stat.name === 'defense')
            ?.base_stat,
          speed: resp.stats.find((stat) => stat.stat.name === 'speed')
            ?.base_stat,
        },
      }) satisfies PokemonDetail,
  );
}
