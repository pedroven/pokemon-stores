import React, { MouseEvent } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { addProduct } from "../../actions";
import { toast } from "react-toastify";

import { List, Card, ImageFrame, CardInfo, AddButton } from "./styles";

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

const stores: { [key: string]: any } = {
  fire: "fogo",
  water: "agua",
  grass: "grama"
};

const PokemonList = ({ pokemonList, type }: IProps) => {
  const dispatch = useDispatch();
  const { push } = useHistory();

  const goToInfoPage = (event: MouseEvent, id: string, pokemon: Pokemon) => {
    const target = event.target as HTMLElement;
    if (target.tagName !== "BUTTON" && target.tagName !== "svg") {
      push(`/pokemon/${stores[type]}/${id}`, { ...pokemon, type: type });
    }
  };

  return (
    <List>
      {pokemonList.map(p => (
        <Card
          data-testid="pokemon-card"
          key={p.pokemon.name}
          onClick={(event: MouseEvent) =>
            goToInfoPage(event, p.pokemon.id, p.pokemon)
          }
        >
          <ImageFrame pokemonId={p.pokemon.id} type={type} />
          <CardInfo>
            <div>{p.pokemon.name}</div>
            <div>R$ {p.pokemon.price},00</div>
          </CardInfo>
          <AddButton
            onClick={() => {
              dispatch(
                addProduct({
                  ...p.pokemon,
                  id: p.pokemon.id,
                  price: p.pokemon.price,
                  amount: 1,
                  storeType: type
                })
              );
              toast("Pokemon Adicionado!");
            }}
            buttonType={type}
          >
            Adicionar
          </AddButton>
        </Card>
      ))}
    </List>
  );
};

export default PokemonList;
