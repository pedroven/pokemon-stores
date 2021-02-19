import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCartState } from "../../actions";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";

import {
  Container,
  Logo,
  CartButton,
  SearchBar,
  SearchInput,
  SearchBarButton,
  SearchBarButtonIcon,
  CartIcon
} from "./styles";

import pokemonLogo from "../../assets/pokemon-logo.png";

interface IProps {
  type: string;
  searchByName: (name: string) => void;
}

interface Inputs {
  searchedName: string;
}

interface Pokemon {
  id: string;
  name: string;
  url: string;
  price?: number;
  amount?: number;
  storeType?: string;
}

interface Store {
  productsState: { products: Pokemon[] };
  cartState: { cartState: boolean };
}

const Header: React.FC<IProps> = ({ type, searchByName }) => {
  const cartState = useSelector((store: Store) => store.cartState.cartState);
  const products = useSelector((store: Store) => store.productsState.products);
  const productsLength = products.filter(
    (product: Pokemon) => product.storeType === type
  ).length;
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const onSubmit = (data: Inputs) => {
    const { searchedName } = data;
    searchByName(searchedName);
    reset();
  };

  return (
    <Container type={type}>
      <div className="wrapper">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Logo logoUrl={pokemonLogo}>
            <div />
            <span>STORE</span>
          </Logo>
        </Link>
        <SearchBar onSubmit={handleSubmit(onSubmit)}>
          <SearchInput
            name="searchedName"
            defaultValue=""
            placeholder="Pesquisar..."
            ref={register}
          />
          <SearchBarButton type="submit">
            <SearchBarButtonIcon iconcolortype={type} />
          </SearchBarButton>
        </SearchBar>
        <CartButton
          iconcolortype={type}
          onClick={() => dispatch(changeCartState(!cartState))}
        >
          <CartIcon /> {productsLength > 0 && <span>{productsLength}</span>}
        </CartButton>
      </div>
    </Container>
  );
};

export default Header;
