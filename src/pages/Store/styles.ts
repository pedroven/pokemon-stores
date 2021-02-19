import styled from "styled-components";
import { BsTrash } from "react-icons/bs";

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

export const CartAside = styled.aside`
  width: 350px;
  margin-left: 40px;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  .cartContainer {
    position: fixed;
    width: 260px;
    height: 640px;
    background-color: var(--d-gray);
    border-radius: 4px;
    padding: 0 10px;
    display: flex;
    flex-direction: column;
    .cartTotalPrice {
      color: #fff;
      text-align: center;
      font-weight: bold;
      font-size: 16px;
    }
    .cartContainerWrapper {
      height: 100%;
      height: 498px;
      overflow-y: auto;
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        background: var(--d-gray);
      }
      ::-webkit-scrollbar-thumb {
        background: gray;
        border-radius: 10px;
        width: 2px;
      }
    }
    .cartTitle {
      padding: 20px;
      color: #fff;
      font-size: 18px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const pokemonImageURL = (id: string) => {
  return `url(https://pokeres.bastionbot.org/images/pokemon/${id}.png)`;
};

export const CartAsideInfo = styled.div`
  width: 100%;
  padding: 10px 4px;
  margin-bottom: 10px;
  border-radius: 4px;
  border: 2px solid gray;
  color: #fff;
  font-size: 12px;
  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    button {
      background: none;
      border: none;
      cursor: pointer;
    }
  }

  .productName {
    font-weight: bold;
    font-size: 16px;
    display: flex;
    align-items: center;
  }
  .productImage {
    width: 30px;
    height: 30px;
    background-color: gray;
    background-image: ${(props: IImageProps) =>
      pokemonImageURL(props.pokemonId)};
    background-size: contain;
    margin-right: 4px;
    border-radius: 4px;
  }

  .productPrice {
    font-weight: bold;
    font-size: 14px;
  }
`;

export const RemoveIcon = styled(BsTrash)`
  color: #fff;
  font-size: 18px;
`;

export const FinishPurchaseButton = styled.button`
  position: absolute;
  bottom: 0;
  width: 95%;
  background-color: ${(props: IProps) => buttonTheme[props.storeType]};
  align-self: center;
  justify-self: center;
  padding: 10px;
  margin-bottom: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 18px;
`;

export const EmptyCart = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  padding: 30px;
  text-align: center;
`;
