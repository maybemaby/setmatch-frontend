import React, { useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  changeState: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, changeState, children }: ModalProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      changeState();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, changeState]);

  return (
    <>
      {isOpen && (
        <div className={styles.innerContainer} ref={ref}>
          <AiOutlineClose
            size={25}
            onClick={changeState}
            className={styles.exit}
          />
          {children}
        </div>
      )}
    </>
  );
};
