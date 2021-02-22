import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router";
import Header from "../../components/Header";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions";

import { getPokemonInfo } from "../../services/api";

import {
  Container,
  Content,
  PokemonImage,
  PokemonInfoContainer,
  PokemonInfoCard,
  AddButton
} from "./styles";

interface IParams {
  id: string;
  type: string;
}

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price: number;
  type: string;
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
  name: string;
  height: number;
  weight: number;
}

interface State {
  state: Pokemon;
}

const stores: { [key: string]: any } = {
  fogo: "fire",
  agua: "water",
  grama: "grass"
};

function parseName(name: string): string {
  if (name.includes("-")) {
    let splitedName = name.split("-");
    splitedName = splitedName.map(
      word => word.charAt(0).toUpperCase() + word.slice(1)
    );
    let newName = splitedName.join(" ");
    return newName;
  } else {
    return name.charAt(0).toUpperCase() + name.slice(1);
  }
}

const PokemonInfo: React.FC = () => {
  const { id, type }: IParams = useParams();
  const [pokemonInfo, setPokemonInfo] = useState<PokemonInfo>();
  const { state }: State = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    const getPokemonInfoData = async () => {
      const result = (await getPokemonInfo(id)) as PokemonInfo;
      setPokemonInfo({
        abilities: result.abilities.slice(0, 10),
        moves: result.moves.slice(0, 20),
        name: parseName(result.name),
        height: result.height,
        weight: result.weight
      });
    };
    getPokemonInfoData();
  }, [id]);

  return (
    <Container>
      <Header type={stores[type]} />
      <Content>
        {pokemonInfo && (
          <React.Fragment>
            <PokemonImage pokemonId={id} />
            <PokemonInfoContainer>
              <h1>{parseName(pokemonInfo.name)}</h1>
              <p>
                {parseName(pokemonInfo.name)} é um pokemon do tipo fogo com
                altura de {pokemonInfo.height * 10} centímetros e peso de{" "}
                {pokemonInfo.weight / 10} kg.
              </p>
              <PokemonInfoCard storecolortype={stores[type]}>
                <span>Habilidades</span>
                <ul>
                  {pokemonInfo.abilities.map(ability => (
                    <li key={ability.ability.name}>
                      <span>{ability.ability.name}</span>
                    </li>
                  ))}
                </ul>
              </PokemonInfoCard>
              <PokemonInfoCard storecolortype={stores[type]}>
                <span>Movimentos</span>
                <ul>
                  {pokemonInfo.moves.map(move => (
                    <li key={move.move.name}>
                      <span>{move.move.name}</span>
                    </li>
                  ))}
                </ul>
              </PokemonInfoCard>
              <span className="pokemonInfoPrice">
                Valor: R$ {(state && state.price) || 100},00
              </span>
              <AddButton
                storecolortype={stores[type]}
                onClick={() =>
                  dispatch(
                    addProduct({
                      id: id,
                      price: state.price,
                      amount: 1,
                      name: pokemonInfo.name,
                      storeType: stores[type]
                    })
                  )
                }
              >
                Adicionar
              </AddButton>
            </PokemonInfoContainer>
          </React.Fragment>
        )}
      </Content>
    </Container>
  );
};

export default PokemonInfo;
