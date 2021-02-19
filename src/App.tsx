import React from "react";
import Routes from "./routes";
import GlobalStyle from "./styles";
import { ToastContainer } from "react-toastify";
import { ModalProvider } from "styled-react-modal";

import "react-toastify/dist/ReactToastify.min.css";

const App: React.FC = () => {
  return (
    <React.Fragment>
      <ModalProvider>
        <Routes />
      </ModalProvider>
      <GlobalStyle />
      <ToastContainer hideProgressBar={true} />
    </React.Fragment>
  );
};

export default App;
