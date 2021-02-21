import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

import { getPokemonInfo } from "../../services/api";
// import { Container } from './styles';

interface IParams {
  id: string;
}

interface Ability {
  ability: { name: string };
}

interface Move {
  move: { name: string };
}

interface PokemonInfo {
  abilities: Ability[];
  moves: Move[];
}

const PokemonInfo: React.FC = () => {
  const { id }: IParams = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();

  useEffect(() => {
    const getPokemonInfoData = async () => {
      const result = (await getPokemonInfo(id)) as PokemonInfo;
      console.log(result);
    };
    getPokemonInfoData();
  }, [id]);

  return <div style={{ color: "#fff" }}>info {id}</div>;
};

export default PokemonInfo;
