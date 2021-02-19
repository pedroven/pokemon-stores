import React from "react";
import { useDispatch } from "react-redux";
import { addProduct } from "../../actions";

import {
  List,
  Card,
  ImageFrame,
  CardInfo,
  AddButton,
  AddButtonIcon
} from "./styles";

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price: number;
}

interface PokemonObj {
  pokemon: Pokemon;
}

interface IProps {
  pokemonList: PokemonObj[];
  type: string;
}

const PokemonList: React.FC<IProps> = ({ pokemonList, type }) => {
  const dispatch = useDispatch();
  return (
    <List>
      {pokemonList.map(p => (
        <Card key={p.pokemon.name}>
          <ImageFrame pokemonId={p.pokemon.id} type={type} />
          <CardInfo>
            <div>{p.pokemon.name}</div>
            <div>R$ {p.pokemon.price},00</div>
          </CardInfo>
          <AddButton
            onClick={() =>
              dispatch(
                addProduct({
                  ...p.pokemon,
                  id: p.pokemon.id,
                  price: p.pokemon.price,
                  amount: 1,
                  storeType: type
                })
              )
            }
            buttonType={type}
          >
            Adicionar
            <AddButtonIcon />
          </AddButton>
        </Card>
      ))}
    </List>
  );
};

export default PokemonList;
