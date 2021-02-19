import styled from "styled-components";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";

interface Map {
  [key: string]: any;
}

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
  iconColorType: string;
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
  }
`;

export const Logo = styled.div`
  width: 100px;
  height: 60px;
  display: flex;
  flex-direction: column;
  /* background-color: purple; */
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
`;

export const SearchBar = styled.form`
  width: 70%;
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
  color: ${(props: IIconProps) => headerTheme[props.iconColorType]};
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
      hoverThemes[props.iconColorType]};
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
