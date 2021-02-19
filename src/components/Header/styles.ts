import styled from "styled-components";

interface Map {
  [key: string]: any;
}

const headerTheme: Map = {
  fire: "var(--d-orange)",
  water: "var(--header-blue)",
  grass: "var(--header-green)"
};

interface IContainer {
  type: string;
}

export const Container = styled.header`
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: ${(props: IContainer) => headerTheme[props.type]};
`;

export const Logo = styled.div``;

export const SearchBar = styled.form``;

export const SearchInput = styled.input``;

export const SearchBarButton = styled.input``;

export const CartButton = styled.div``;
