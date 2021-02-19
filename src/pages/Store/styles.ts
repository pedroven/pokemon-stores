import styled from "styled-components";

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

export const CartSession = styled.section`
  width: 350px;
  background: orange;
  margin-left: 40px;
  .cartContainer {
    position: fixed;
    height: 100%;
  }
`;
