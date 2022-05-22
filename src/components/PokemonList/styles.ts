import styled from "styled-components";

interface IImageProps {
  pokemonId: string;
  type: string;
}

interface IButtonProps {
  buttonType: string;
}

interface Map {
  [key: string]: any;
}

const buttonTheme: Map = {
  fire: "var(--o-red)",
  water: "var(--o-blue)",
  grass: "var(--o-green)"
};

const backgroundImageTheme: Map = {
  fire: "orange",
  water: "var(--b-blue)",
  grass: "var(--b-green)"
};

export const List = styled.ul`
  list-style: none;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-top: 20px;
  @media (max-width: 599px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (min-width: 600px) and (max-width: 800px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

export const Card = styled.li`
  width: 100%;
  height: 300px;
  background-color: var(--d-gray);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 4px;
  :hover {
    background-color: var(--l-gray);
  }
  cursor: pointer;
`;

export const ImageFrame = styled.div`
  width: 90%;
  height: 65%;
  padding: 50px;
  border-radius: 4px;
  background-image: ${(props: IImageProps) => pokemonImageURL(props.pokemonId)};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-color: ${(props: IImageProps) => backgroundImageTheme[props.type]};
  border: 8px solid ${(props: IImageProps) => backgroundImageTheme[props.type]};
`;

const pokemonImageURL = (id: string) => {
  return `url(https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png)`;
};

export const CardInfo = styled.div`
  width: 90%;
  color: white;
  margin-top: 15px;
  div {
    font-weight: bold;
    margin-bottom: 8px;
    font-size: 18px;
  }
`;

export const AddButton = styled.button`
  width: 90%;
  height: 50px;
  border: none;
  border-radius: 4px;
  background-color: ${(props: IButtonProps) => buttonTheme[props.buttonType]};
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
  :hover {
    height: 58px;
    width: 92%;
    transition: all 0.4s;
  }
`;
