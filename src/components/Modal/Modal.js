import { useEffect } from 'react';
import { BackdropStyled, ModalStyled } from './ModalStyled';

export const Modal = ({ onCloseModal, children }) => {
  useEffect(() => {
    const handleKeyDown = event => {
      if (event.code === 'Escape') {
        onCloseModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.addEventListener('keydown', handleKeyDown);
    };
  }, [onCloseModal]);

  const handleOverlayClick = event => {
    if (event.currentTarget === event.target) {
      onCloseModal();
    }
  };

  return (
    <BackdropStyled onClick={handleOverlayClick}>
      <ModalStyled>{children}</ModalStyled>
    </BackdropStyled>
  );
};
