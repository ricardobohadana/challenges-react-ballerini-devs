import React from "react";
import ReactDOM from "react-dom";
import styles from "./Modal.module.css";

export interface ModalProps {
  isShown: boolean;
  hide: (e: React.SyntheticEvent) => void;
}

export const Modal: React.FC<ModalProps> = ({ children, isShown, hide }) => {
  const modal = (
    <React.Fragment>
      <div className={styles.backdrop} onClick={hide}></div>
      <div className={styles.wrapper}>
        <div className={styles.styledModal}>
          <div className={styles.modalContent}>{children}</div>
        </div>
      </div>
    </React.Fragment>
  );

  return isShown ? ReactDOM.createPortal(modal, document.body) : null;
};
