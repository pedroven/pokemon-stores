import styled from "styled-components";

interface IImageProps {
  pokemonId: string;
}

interface Map {
  [key: string]: any;
}

const themes: Map = {
  fire: "var(--o-red)",
  water: "var(--header-blue)",
  grass: "var(--header-green)"
};

const hoverThemes: Map = {
  fire: "var(--d-orange)",
  water: "var(--hover-blue)",
  grass: "var(--hover-green)"
};

interface IProps {
  storecolortype: string;
}

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
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  padding-top: 140px;
  @media (max-width: 801px) {
    flex-direction: column;
    padding-top: 100px;
  }
  @media (min-width: 802px) and (max-width: 1281px) {
    padding: 40px;
    padding-top: 120px;
  }
`;

const pokemonImageURL = (id: string) => {
  return `url(https://pokeres.bastionbot.org/images/pokemon/${id}.png)`;
};

export const PokemonImage = styled.div`
  width: 60%;
  height: 550px;
  background: var(--l-gray);
  border-radius: 4px;
  margin-bottom: 40px;
  background-image: ${(props: IImageProps) => pokemonImageURL(props.pokemonId)};
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  border: 5px solid var(--l-gray);
  margin-right: 4px;
  border-radius: 4px;
  @media (max-width: 800px) {
    width: 90%;
    height: 275px;
    margin-bottom: 20px;
  }
`;

export const PokemonInfoContainer = styled.div`
  width: 70%;
  height: 550px;
  background: var(--d-gray);
  border-radius: 4px;
  margin-bottom: 40px;
  color: #fff;
  padding: 30px 40px;
  h1 {
    margin-bottom: 15px;
  }
  p {
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid gray;
  }
  .pokemonInfoPrice {
    font-size: 20px;
    font-weight: bold;
  }

  @media (max-width: 800px) {
    width: 90%;
    height: fit-content;
    padding: 20px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const PokemonInfoCard = styled.div`
  margin-bottom: 20px;
  span {
    font-weight: bold;
    font-size: 16px;
  }
  ul {
    margin-top: 5px;
    width: 100%;
    display: flex;
    padding-left: 30px;
    flex-wrap: wrap;
    li {
      width: 33%;
      color: ${(props: IProps) => themes[props.storecolortype]};
      list-style: square;
      span {
        color: #fff;
      }
    }
  }
  padding-bottom: 20px;
  border-bottom: 1px solid gray;
  @media (max-width: 800px) {
    width: 100%;
    height: fit-content;
    ul {
      width: 100%;
      justify-content: space-between;
      padding: 0;
      li {
        width: 50%;
        display: flex;
        justify-content: flex-start;
        span {
          font-weight: normal;
        }
      }
    }
  }
`;

export const AddButton = styled.button`
  width: 100%;
  height: 50px;
  margin-top: 20px;
  border: none;
  border-radius: 4px;
  background-color: ${(props: IProps) => themes[props.storecolortype]};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  align-self: center;
  justify-self: center;
  cursor: pointer;
  :hover {
    background-color: ${(props: IProps) => hoverThemes[props.storecolortype]};
  }
`;
