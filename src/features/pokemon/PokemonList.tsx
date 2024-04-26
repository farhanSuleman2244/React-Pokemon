import React from "react";
import { IPokeResult, IPokemon } from "../../types/pokemonTypes";
import { useGetPokemonByIdQuery } from "../../services/pokemonService";
import { getPokeIdFromUrl } from "../../utils/getPokeIdFromUrl";

interface IPokemonListProps {
  poke: IPokeResult;
  handleViewDetails: (poke: IPokemon) => void;
}

const PokemonList: React.FC<IPokemonListProps> = ({
  poke,
  handleViewDetails,
}: IPokemonListProps): React.ReactElement => {
  const { url } = poke;
  const pokeId = getPokeIdFromUrl(url);
  const { data, error, isLoading } = useGetPokemonByIdQuery(pokeId);
  const renderPokeListView = () => {
    if (error) {
      return <p role="contentError">'Something went wrong'</p>;
    }
    if (isLoading) {
      return <p role="contentLoader">'Loading ....'</p>;
    }
    if (data) {
      return (
        <li role="showPokeDetails" onClick={() => handleViewDetails(data!)}>
          <img
            src={data.sprites?.front_default}
            alt={data.sprites?.front_default}
          />
          <p role="pokeName">{data.name}</p>
        </li>
      );
    }
    return <p role="contentError">'Something went wrong'</p>;
  };
  return <>{renderPokeListView()}</>;
};

export default PokemonList;
