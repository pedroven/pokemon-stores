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
  justify-content: center;
  align-items: center;
  margin-bottom: 40px;
  padding: 80px 20px;
  .loaderContainer {
    width: 90%;
    height: 600px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
