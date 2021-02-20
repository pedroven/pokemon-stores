import React from "react";

import pokemonLogo from "../../assets/pokemon-logo.png";
import fire from "../../assets/fire.png";
import water from "../../assets/water.png";
import grass from "../../assets/grass.png";

import {
  Container,
  Content,
  Logo,
  StoreCard,
  StoreSymbol,
  CustomLink
} from "./styles";

const Home: React.FC = () => {
  return (
    <Container>
      <Content>
        <Logo logoUrl={pokemonLogo}>
          <div />
          <span>STORE</span>
        </Logo>
        <span>Selecione o tipo da sua Pokemon Store</span>
        <CustomLink to="/store/fogo">
          <StoreCard>
            <StoreSymbol logoUrl={fire} />
            <span>Store fogo</span>
          </StoreCard>
        </CustomLink>
        <CustomLink to="/store/agua">
          <StoreCard>
            <StoreSymbol logoUrl={water} />
            <span>Store água</span>
          </StoreCard>
        </CustomLink>
        <CustomLink to="/store/grama">
          <StoreCard>
            <StoreSymbol logoUrl={grass} />
            <span>Store grama</span>
          </StoreCard>
        </CustomLink>
      </Content>
    </Container>
  );
};

export default Home;
