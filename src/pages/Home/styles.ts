import styled from "styled-components";
import { Link } from "react-router-dom";

interface ILogoProps {
  logoUrl: string;
}

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.main`
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  span {
    color: #fff;
    font-size: 18px;
    margin-bottom: 10px;
  }
`;

export const Logo = styled.div`
  width: 300px;
  height: 120px;
  display: flex;
  flex-direction: column;
  padding: 0;
  margin-bottom: 20px;
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
    font-size: 22px;
    font-weight: bold;
    letter-spacing: 4px;
    text-align: center;
  }
`;

export const StoreCard = styled.div`
  width: 80%;
  height: 100px;
  padding: 10px 20px;
  background-color: var(--d-gray);
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  span {
    font-size: 28px;
  }
  :hover {
    background-color: var(--l-gray);
  }
`;

export const StoreSymbol = styled.div`
  height: 100%;
  width: 25%;
  background-color: gray;
  margin-right: 50px;
  border-radius: 4px;
  border: 6px solid gray;
  background-image: ${(props: ILogoProps) => `url(${props.logoUrl})`};
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
`;

export const CustomLink = styled(Link)`
  text-decoration: none;
  width: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;
