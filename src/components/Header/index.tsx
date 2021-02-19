import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeCartState } from "../../actions";
import { useForm } from "react-hook-form";

import {
  Container,
  Logo,
  CartButton,
  SearchBar,
  SearchInput,
  SearchBarButton
} from "./styles";

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
      <Logo />
      <SearchBar onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          name="searchedName"
          defaultValue=""
          placeholder="Pesquisar..."
          ref={register}
        />
        <SearchBarButton type="submit" value="Buscar" />
      </SearchBar>
      <button onClick={() => dispatch(changeCartState(!cartState))}>
        carrinho {products.length > 0 && products.length}
      </button>
    </Container>
  );
};

export default Header;
