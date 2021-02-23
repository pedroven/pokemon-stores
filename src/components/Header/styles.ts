import styled from "styled-components";
import {
  AiOutlineSearch,
  AiOutlineShoppingCart,
  AiOutlineMenu
} from "react-icons/ai";
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

const headerTheme: Map = {
  fire: "var(--d-orange)",
  water: "var(--header-blue)",
  grass: "var(--header-green)"
};

const hoverThemes: Map = {
  fire: "var(--hover-orange)",
  water: "var(--hover-blue)",
  grass: "var(--hover-green)"
};

interface IContainerProps {
  type: string;
}

interface ILogoProps {
  logoUrl: string;
}

interface IIconProps {
  iconcolortype: string;
}

export const Container = styled.header`
  width: 100%;
  height: 80px;
  position: fixed;
  background-color: ${(props: IContainerProps) => headerTheme[props.type]};
  display: flex;
  justify-content: center;
  .wrapper {
    width: 100%;
    height: 100%;
    max-width: 1280px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    @media (max-width: 799px) {
      max-width: 599px;
      width: 100%;
      justify-content: space-between;
    }
    @media (max-width: 1280px) {
      padding: 0 25px;
    }
    padding: 0 30px;
  }
`;

export const MenuButton = styled.button`
  width: 30px;
  height: 30px;
  background: none;
  border: 2px solid #fff;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (min-width: 600px) {
    display: none;
  }
`;

export const MenuIcon = styled(AiOutlineMenu)`
  color: #fff;
  font-size: 18px;
`;

export const Logo = styled.div`
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  padding: 0;
  div {
    width: 100%;
    height: 100%;
    background-image: ${(props: ILogoProps) => `url(${props.logoUrl})`};
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
  }
  span {
    color: #fff;
    font-size: 13px;
    font-weight: bold;
    letter-spacing: 2px;
    text-align: center;
  }
  @media (max-width: 599px) {
    justify-content: center;
    align-items: center;
  }
`;

export const SearchBar = styled.form`
  width: 70%;
  display: flex;
  @media (max-width: 599px) {
    display: none;
  }
`;

export const SearchBarMobileContainer = styled.div`
  width: 100%;
  height: 50px;
  background-color: ${(props: IContainerProps) => headerTheme[props.type]};
  margin-top: 80px;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const SearchBarMobile = styled.form`
  width: 92%;
  display: flex;
`;

export const SearchInput = styled.input`
  width: 100%;
  padding: 10px 4px;
  border: none;
  border-top-left-radius: 4px;
  border-bottom-left-radius: 4px;
`;

export const SearchBarButton = styled.button`
  border: none;
  background-color: #fff;
  border-top-right-radius: 4px;
  border-bottom-right-radius: 4px;
  padding: 0 5px;
  cursor: pointer;
`;

export const SearchBarButtonIcon = styled(AiOutlineSearch)`
  color: ${(props: IIconProps) => headerTheme[props.iconcolortype]};
  font-size: 22px;
`;

export const CartButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 8px;
  border-radius: 50%;
  :hover {
    background-color: ${(props: IIconProps) =>
      hoverThemes[props.iconcolortype]};
  }
  span {
    position: absolute;
    top: 0;
    right: -5px;
    color: #fff;
    font-weight: bold;
    width: 15px;
    height: 15px;
    background-color: red;
    border-radius: 50%;
  }
`;

export const CartIcon = styled(AiOutlineShoppingCart)`
  color: #fff;
  font-size: 30px;
`;

export const CartAside = styled.aside`
  width: 100%;
  height: 100vh;
  background-color: black;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  padding: 20px 0;
  position: fixed;
`;

export const CartContainer = styled.div`
  position: fixed;
  z-index: 101;
  right: 30px;
  top: 100px;
  width: 300px;
  height: 400px;
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
    display: flex;
    justify-content: space-around;
    margin-top: 2px;
  }
  .cartContainerWrapper {
    height: 100%;
    height: 255px;
    overflow-y: auto;
    ::-webkit-scrollbar {
      width: 12px;
    }
    ::-webkit-scrollbar-track {
      background: var(--d-gray);
    }
    ::-webkit-scrollbar-thumb {
      background: gray;
      border-radius: 10px;
      border-left: 5px solid var(--d-gray);
    }
  }
  .cartTitle {
    padding: 20px;
    color: #fff;
    font-size: 17px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 599px) {
    top: 90px;
    right: 10px;
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
