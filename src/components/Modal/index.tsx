import React from "react";

import { StyledModal } from "./styles";

interface IProps {
  isOpen: boolean;
  toggleModal: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<IProps> = ({ isOpen, toggleModal, children }) => {
  return (
    <StyledModal
      isOpen={isOpen}
      onBackgroundClick={toggleModal}
      onEscapeKeydown={toggleModal}
    >
      {children}
    </StyledModal>
  );
};

export default Modal;
