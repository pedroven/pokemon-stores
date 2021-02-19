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

const Header: React.FC<IProps> = ({ type, searchByName }) => {
  const cartState = useSelector((store: any) => store.cartState.cartState);
  const products = useSelector((store: any) => store.productsState.products);
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
            <SearchBarButtonIcon iconColorType={type} />
          </SearchBarButton>
        </SearchBar>
        <CartButton
          iconColorType={type}
          onClick={() => dispatch(changeCartState(!cartState))}
        >
          <CartIcon /> {products.length > 0 && <span>{products.length}</span>}
        </CartButton>
      </div>
    </Container>
  );
};

export default Header;
