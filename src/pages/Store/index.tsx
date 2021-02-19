import React, { useState, useEffect } from "react";
import {
  getFirePokemon,
  getGrassPokemon,
  getWaterPokemon
} from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../actions";

import { Container, Content, CartSession } from "./styles";

import Header from "../../components/Header";
import PokemonList from "../../components/PokemonList";
interface IProps {
  type: string;
}

interface Pokemon {
  name: string;
  url: string;
}
interface PokemonObj {
  pokemon: Pokemon;
}
interface Map {
  [key: string]: () => Promise<void> | undefined;
}

const selectPokemonMap: Map = {
  fire: getFirePokemon,
  water: getWaterPokemon,
  grass: getGrassPokemon
};

const Store: React.FC<IProps> = ({ type }) => {
  const [pokemonList, setPokemonList] = useState<PokemonObj[] | []>([]);
  const [initialPokemonList, setInitialPokemonList] = useState<
    PokemonObj[] | []
  >([]);
  const [fetchState, setFetchState] = useState<
    "initial" | "loading" | "resolved"
  >("initial");
  const products = useSelector((store: any) => store.productsState.products);
  const cartState = useSelector((store: any) => store.cartState.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchState("loading");
    const getPokemonList = async () => {
      const { pokemon }: any = await selectPokemonMap[type]();
      setPokemonList(pokemon.slice(0, 59));
      setInitialPokemonList(pokemon.slice(0, 59));
      setFetchState("resolved");
    };
    getPokemonList();
  }, [type]);

  const searchByName = (name: string) => {
    if (name) {
      setPokemonList(pokemonList.filter(p => p.pokemon.name.includes(name)));
    } else {
      setPokemonList(initialPokemonList);
    }
  };

  return (
    <Container>
      <Header type={type} searchByName={searchByName} />
      <Content>
        {fetchState === "loading" && (
          <div style={{ color: "white" }}>Loading...</div>
        )}
        {fetchState === "resolved" && pokemonList.length > 0 && (
          <PokemonList type={type} pokemonList={pokemonList} />
        )}
        {cartState && (
          <CartSession>
            <div className="cartContainer">
              <span>carrinho</span>
              {products &&
                products.map((product: any) => (
                  <div>
                    {product.name} {product.amount}{" "}
                    <button
                      onClick={() =>
                        dispatch(
                          removeProduct({
                            ...product,
                            price: 100
                          })
                        )
                      }
                    >
                      remover
                    </button>
                  </div>
                ))}
            </div>
          </CartSession>
        )}
      </Content>
    </Container>
  );
};

export default Store;
