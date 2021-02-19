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
  name: string;
  url: string;
}

interface PokemonObj {
  pokemon: Pokemon;
}

interface IProps {
  pokemonList: PokemonObj[];
  type: string;
}

function getPokemonIdFromURL(url: string): string {
  let id = url.split("/")[6];
  return id;
}

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

var price: number;

const PokemonList: React.FC<IProps> = ({ pokemonList, type }) => {
  const dispatch = useDispatch();
  return (
    <List>
      {pokemonList.map(p => (
        <Card key={p.pokemon.name}>
          <ImageFrame
            pokemonId={getPokemonIdFromURL(p.pokemon.url)}
            type={type}
          />
          {
            <div style={{ display: "none" }}>
              {(price = Math.random() * 500)}
            </div>
          }
          <CardInfo>
            <div>{parseName(p.pokemon.name)}</div>
            <div>R$ {price.toFixed(2).replace(".", ",")}</div>
          </CardInfo>
          <AddButton
            onClick={() =>
              dispatch(
                addProduct({
                  ...p.pokemon,
                  id: getPokemonIdFromURL(p.pokemon.url),
                  price: price,
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
