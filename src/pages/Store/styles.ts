import styled from "styled-components";

interface IImageProps {
  pokemonId: string;
}

interface IProps {
  storeType: string;
}

interface Map {
  [key: string]: any;
}

const buttonTheme: Map = {
  fire: "var(--o-red)",
  water: "var(--o-blue)",
  grass: "var(--o-green)"
};

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--background);
`;

export const Content = styled.main`
  width: 100%;
  max-width: 1280px;
  display: flex;
  justify-self: center;
  align-self: center;
  margin-bottom: 40px;
  padding-top: 80px;
`;
