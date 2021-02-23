import React, { useState, useEffect } from "react";
import {
  getFirePokemon,
  getGrassPokemon,
  getWaterPokemon
} from "../../services/api";
import { useSelector } from "react-redux";
import Loader from "react-loader-spinner";

import { Container, Content } from "./styles";

import Header from "../../components/Header";
import PokemonList from "../../components/PokemonList";

import { prices } from "../../utils/prices";
interface IProps {
  type: string;
}

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price: number;
  amount: number;
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
  searchedNameState: { searchedNameState: string };
}

const selectPokemonMap: Map = {
  fire: getFirePokemon,
  water: getWaterPokemon,
  grass: getGrassPokemon
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

function getPokemonIdFromURL(url: string): string {
  let id = url.split("/")[6];
  return id;
}

const Store: React.FC<IProps> = ({ type }) => {
  const [pokemonList, setPokemonList] = useState<PokemonObj[] | []>([]);
  const [initialPokemonList, setInitialPokemonList] = useState<
    PokemonObj[] | []
  >([]);
  const [fetchState, setFetchState] = useState<
    "initial" | "loading" | "resolved"
  >("initial");

  const searchedName = useSelector(
    (store: Store) => store.searchedNameState.searchedNameState
  );

  useEffect(() => {
    setFetchState("loading");
    const getPokemonList = async () => {
      let pokemon: PokemonObj[] = await selectPokemonMap[type]();
      let counter = 0;
      pokemon = pokemon.map(p => {
        p.pokemon.price = prices[counter];
        p.pokemon.name = parseName(p.pokemon.name);
        p.pokemon.id = getPokemonIdFromURL(p.pokemon.url);
        counter++;
        return p;
      });
      setPokemonList(pokemon.slice(0, 59));
      setInitialPokemonList(pokemon.slice(0, 59));
      setFetchState("resolved");
    };
    getPokemonList();
  }, [type]);

  useEffect(() => {
    const searchByName = (name: string) => {
      if (name) {
        setPokemonList(
          initialPokemonList.filter(p =>
            p.pokemon.name.toLowerCase().includes(name.toLowerCase())
          )
        );
      } else {
        setPokemonList(initialPokemonList);
      }
    };
    fetchState === "resolved" && searchByName(searchedName);
  }, [searchedName, fetchState, initialPokemonList]);

  return (
    <Container>
      <Header type={type} />
      <Content>
        {fetchState === "loading" && (
          <div className="loaderContainer">
            <Loader type="ThreeDots" color="#fff" height="100" width="100" />
          </div>
        )}
        {fetchState === "resolved" && pokemonList.length > 0 && (
          <PokemonList type={type} pokemonList={pokemonList} />
        )}
      </Content>
    </Container>
  );
};

export default Store;
