import React, { useState, useEffect } from "react";
import {
  getFirePokemon,
  getGrassPokemon,
  getWaterPokemon
} from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct } from "../../actions";

import { Container, Content, CartAside } from "./styles";

import Header from "../../components/Header";
import PokemonList from "../../components/PokemonList";
interface IProps {
  type: string;
}

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price?: number;
  amount?: number;
  storeType?: string;
}
interface PokemonObj {
  pokemon: Pokemon;
}
interface Map {
  [key: string]: () => Promise<PokemonObj[]>;
}

interface Store {
  productsState: { products: Pokemon[] };
  cartState: { cartState: boolean };
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
  const products = useSelector((store: Store) => store.productsState.products);
  const cartState = useSelector((store: Store) => store.cartState.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchState("loading");
    const getPokemonList = async () => {
      const pokemon: PokemonObj[] = await selectPokemonMap[type]();
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
          <CartAside>
            <div className="cartContainer">
              <span>carrinho</span>
              {products &&
                products
                  .filter((product: Pokemon) => product.storeType === type)
                  .map((product: Pokemon) => (
                    <div key={product.id}>
                      {product.name} {product.amount}{" "}
                      <button
                        onClick={() =>
                          dispatch(
                            removeProduct({
                              ...product,
                              price: 100,
                              storeType: type
                            })
                          )
                        }
                      >
                        remover
                      </button>
                    </div>
                  ))}
            </div>
          </CartAside>
        )}
      </Content>
    </Container>
  );
};

export default Store;
