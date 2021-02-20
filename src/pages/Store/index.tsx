import React, { useState, useEffect } from "react";
import {
  getFirePokemon,
  getGrassPokemon,
  getWaterPokemon
} from "../../services/api";
import { useSelector, useDispatch } from "react-redux";
import { removeProduct, clearProducts, changeCartState } from "../../actions";
import { AiOutlineClose } from "react-icons/ai";

import {
  Container,
  Content,
  CartAside,
  CartAsideInfo,
  FinishPurchaseButton,
  RemoveIcon,
  EmptyCart
} from "./styles";

import Header from "../../components/Header";
import PokemonList from "../../components/PokemonList";
import Modal from "../../components/Modal";
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

function getTotalValue(products: Pokemon[], type: string): number {
  return products
    .filter((product: Pokemon) => product.storeType === type)
    .reduce((a, b) => a + b.price * b.amount, 0);
}

const Store: React.FC<IProps> = ({ type }) => {
  const [pokemonList, setPokemonList] = useState<PokemonObj[] | []>([]);
  const [initialPokemonList, setInitialPokemonList] = useState<
    PokemonObj[] | []
  >([]);
  const [fetchState, setFetchState] = useState<
    "initial" | "loading" | "resolved"
  >("initial");
  const products = useSelector((store: Store) => store.productsState.products);

  const [totalValue, setTotalValue] = useState<number>(0);
  const [lastTotalValue, setLastTotalValue] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const cartState = useSelector((store: Store) => store.cartState.cartState);
  const dispatch = useDispatch();

  useEffect(() => {
    setFetchState("loading");
    const getPokemonList = async () => {
      let pokemon: PokemonObj[] = await selectPokemonMap[type]();
      pokemon = pokemon.map(p => {
        p.pokemon.price = Math.floor(Math.random() * 500);
        p.pokemon.name = parseName(p.pokemon.name);
        p.pokemon.id = getPokemonIdFromURL(p.pokemon.url);
        return p;
      });
      setPokemonList(pokemon.slice(0, 59));
      setInitialPokemonList(pokemon.slice(0, 59));
      setFetchState("resolved");
    };
    getPokemonList();
  }, [type]);

  useEffect(() => {
    setTotalValue(getTotalValue(products, type));
  }, [products, type]);

  const searchByName = (name: string) => {
    if (name) {
      setPokemonList(
        pokemonList.filter(p => p.pokemon.name.toLowerCase().includes(name))
      );
    } else {
      setPokemonList(initialPokemonList);
    }
  };

  const toggleModal = () => {
    if (totalValue > 0) {
      setLastTotalValue(totalValue);
      setIsOpen(!isOpen);
      dispatch(clearProducts());
      dispatch(changeCartState(false));
    } else {
      setIsOpen(!isOpen);
    }
  };

  return (
    <Container>
      <Modal isOpen={isOpen} toggleModal={toggleModal}>
        <div className="modalContent">
          <div>Obrigado por finalizar sua compra!</div>
          <div>Valor total: R$ {lastTotalValue},00 :)</div>
          <span className="buttonCloseModal" onClick={toggleModal}>
            <AiOutlineClose style={{ color: "#fff" }} />
          </span>
        </div>
      </Modal>
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
              <span className="cartTitle">Pokemon Selecionados</span>
              <div className="cartContainerWrapper">
                {products &&
                products.filter(
                  (product: Pokemon) => product.storeType === type
                ).length > 0 ? (
                  products
                    .filter((product: Pokemon) => product.storeType === type)
                    .map((product: Pokemon) => (
                      <CartAsideInfo pokemonId={product.id} key={product.id}>
                        <div>
                          <span className="productName">
                            <div className="productImage" />
                            <div>{product.name}</div>
                          </span>
                          <span className="productPrice">
                            R${" "}
                            {product.amount &&
                              product.price &&
                              product.price * product.amount}
                            ,00
                          </span>
                        </div>
                        <div>
                          <span> Quantidade: {product.amount}</span>
                          <button
                            title="Remover"
                            onClick={() =>
                              dispatch(
                                removeProduct({
                                  ...product,
                                  price: product.price,
                                  storeType: type
                                })
                              )
                            }
                          >
                            <RemoveIcon />
                          </button>
                        </div>
                      </CartAsideInfo>
                    ))
                ) : (
                  <EmptyCart>
                    Você não possui nenhum Pokemon selecionado
                  </EmptyCart>
                )}
              </div>
              {totalValue > 0 && (
                <React.Fragment>
                  <span className="cartTotalPrice">
                    Valor Total: R$ {totalValue},00
                  </span>
                  <FinishPurchaseButton storeType={type} onClick={toggleModal}>
                    Finalizar
                  </FinishPurchaseButton>
                </React.Fragment>
              )}
            </div>
          </CartAside>
        )}
      </Content>
    </Container>
  );
};

export default Store;
