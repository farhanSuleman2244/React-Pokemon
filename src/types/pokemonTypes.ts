export interface IPokeResult {
  name: string;
  url: string;
}

interface IPokemonTypes {
  slot: number;
  type: Itype;
}
interface Itype {
  name: string;
  url: string;
}

interface ISprites {
  front_default: string;
}

export interface IPokemonListing {
  count: number;
  results: Array<IPokeResult>;
  next: string;
  previous: string | null;
}

export interface IPokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: Array<IPokemonTypes>;
  sprites: ISprites;
}
