import React from "react";
import Routes from "./routes";
import GlobalStyle from "./styles";
import styled from "styled-components";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "styled-react-modal";

import "react-toastify/dist/ReactToastify.min.css";

const StyledContainer = styled(ToastContainer).attrs({})`
  .Toastify__toast {
    background-color: var(--d-gray);
    color: #fff;
  }
`;

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ModalProvider>
        <Routes />
      </ModalProvider>
      <GlobalStyle />
      <StyledContainer hideProgressBar={true} limit={3} autoClose={2000} />
    </React.Fragment>
  );
};

export default App;
