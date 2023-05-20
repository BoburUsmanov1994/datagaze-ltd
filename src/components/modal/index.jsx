import React, {useEffect} from 'react';
import styled from "styled-components";
import {X} from "react-feather"

const Styled = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100%;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;

  .modal__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background: rgba(217, 217, 217, 0.62);
  }

  .modal__body {
    box-shadow: 0px 4px 52px rgba(0, 0, 0, 0.25);
    border-radius: 10px;
    padding: 30px;
    min-width: 600px;
    background: white;
    position: relative;
    z-index: 999;
  }

  .modal__close {
    background: #FFFAFA;
    box-shadow: 0px 4px 21px rgba(0, 0, 0, 0.25);
    position: absolute;
    width: 36px;
    height: 36px;
    border-radius: 100%;
    top: -18px;
    right: -18px;
    z-index: 9;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    color: #999696;
  }
`;
const Modal = ({
                   open = false,
                   onClose = () => {
                   },
                   children,
                   ...rest
               }) => {
        useEffect(() => {
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [open]);
        return (
            <>
                {open && <Styled {...rest}>
                    <div className="modal__backdrop"></div>
                    <div className="modal__body">
                        <div className="modal__close">
                            <X size={24}/>
                        </div>
                        {children}
                    </div>
                </Styled>}
            </>
        );
    }
;

export default Modal;