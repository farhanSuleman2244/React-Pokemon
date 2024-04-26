import React, { useState } from "react";
import { useGetPokemonListQuery } from "../../services/pokemonService";
import PokemonList from "./PokemonList";
import { IPokeResult, IPokemon } from "../../types/pokemonTypes";
import PokeDetails from "./PokeDetails";
import "./PokemonStyles.css";

const Pokemon: React.FC = (): React.ReactElement => {
  const [shouldDisplayPokeDetails, setShouldDisplayPokeDetails] =
    useState<boolean>(false);
  const [selectedPoke, setSelectedPoke] = useState<IPokemon | undefined>();

  const { data, error, isLoading } = useGetPokemonListQuery();
  const renderPokeList = () => {
    if (error) {
      return <p role="contentError">'Something went wrong'</p>;
    }
    if (isLoading) {
      return <p role="contentLoader">'Loading ....'</p>;
    }
    if (data) {
      return data.results.map((poke: IPokeResult, index: number) => (
        <PokemonList
          poke={poke}
          key={index}
          handleViewDetails={handleViewDetails}
        />
      ));
    }
    return <p role="contentError">'Something went wrong'</p>;
  };

  const handleViewDetails = (selectedPoke: IPokemon) => {
    setShouldDisplayPokeDetails(true);
    setSelectedPoke(selectedPoke);
  };
  const handleViewList = () => {
    setShouldDisplayPokeDetails(false);
    setSelectedPoke(undefined);
  };

  return (
    <div className="poke" role="react-poke">
      {shouldDisplayPokeDetails && selectedPoke ? (
        <PokeDetails poke={selectedPoke} handleViewList={handleViewList} />
      ) : (
        <div className="pokeList">
          <h2 className="section-title">PokeReact</h2>
          <ul className="pokeList">{renderPokeList()}</ul>
        </div>
      )}
    </div>
  );
};

export default Pokemon;
