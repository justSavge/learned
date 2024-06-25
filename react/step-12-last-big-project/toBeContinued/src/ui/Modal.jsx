import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { MdOutlineClose } from "react-icons/md";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;
const ModalContext = createContext();
function Modal({ children }) {
  const [openName, setOpenName] = useState(""); //似乎是用于设置名字，点击获取名字，有名字就可以展示
  const close = () => setOpenName(""); //没有名字就消失直接return;
  const open = setOpenName; //可以设置名字
  return (
    <ModalContext.Provider value={{ openName, close, open, setOpenName }}>
      {children}
    </ModalContext.Provider>
  );
}
function Open({ children, opens: opensWindowName }) {
  //提供开启功能
  const { open } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => open(opensWindowName),
  });
}
function Window({ children, name }) {
  //展示窗口，依据open
  //有些混乱，充斥着jonas 个人的大量的个性化设置，逻辑有些乱，其实可以使用更好的
  const { openName, close } = useContext(ModalContext);
  const ref = useOutsideClick(close);

  if (openName !== name) return;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <Button onClick={close}>
          <MdOutlineClose />
        </Button>
        {cloneElement(children, { onCloseModal: close })}
        {/* cloneElement这里是为了给children传递props */}
      </StyledModal>
    </Overlay>,
    document.body
  );
}
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
