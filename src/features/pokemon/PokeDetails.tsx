import React from "react";
import { IPokemon } from "../../types/pokemonTypes";

interface IPokeDetailsProps {
  poke: IPokemon;
  handleViewList: Function;
}

const PokeDetails: React.FC<IPokeDetailsProps> = ({
  poke,
  handleViewList,
}: IPokeDetailsProps): React.ReactElement => {
  return (
    <div className="pokeDetails" role="pokeDetails">
      <h2 className="section-title">{poke.name}</h2>
      <img src={poke.sprites.front_default} alt={poke.sprites.front_default} />
      <ul className="pokeList">
        <li>
          <h3>Name</h3>
          <p role="pokeName">{poke.name}</p>
        </li>
        <li>
          <h3>Height</h3>
          <p role="pokeHeight">{`${poke.height} cm`}</p>
        </li>
        <li>
          <h3>Weight</h3>
          <p role="pokeWeight">{`${poke.weight} kg`}</p>
        </li>
        <li>
          <h3>Types</h3>
          <p>
            {poke.types.map(({ type }, index: number) => (
              <span key={index}>
                <span>{type.name}</span>
                <br />
              </span>
            ))}
          </p>
        </li>
      </ul>
      <button role="displayListViewButton" onClick={() => handleViewList()}>
        Back
      </button>
    </div>
  );
};

export default PokeDetails;
