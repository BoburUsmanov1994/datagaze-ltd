import React, {useEffect} from 'react';
import styled from "styled-components";
import {X} from "react-feather";
import {get} from "lodash"
import Avatar from "../../../components/avatar";
import telegramBg from "../../../assets/images/telegram-bg.png";

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
    min-width: 900px;
    background: white;
    position: relative;
    z-index: 999;
  }

  .modal__close {
    background: #E9E9E9;
    display: flex;
    justify-content: flex-end;
    color: #323232;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    padding: 10px 15px;

    &_icon {
      cursor: pointer;
    }
  }

  .modal__content {
    display: flex;
    overflow: hidden;
    position: relative;

    &_left {
      position: relative;
      width: 300px;
      min-width: 300px;
      background: #FBFBFB;
     &_top{
       padding: 12px 16px;
      
     }
    }

    &_right {
      position: relative;
      flex: 1;
      &_top{
        padding: 16px;
        background: #FBFBFB;
        border-left:1px solid #E9E9E9;
        border-bottom:1px solid #E9E9E9;
        height: 60px;
        h2{
          font-size: 18px;
          color: #000;
          font-weight: 500;
        }
      }
      &_content{
        height: 70vh;
        overflow-y: auto;
        background-image: url(${telegramBg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position:center ;
      }
    }

    &_search {
      width: 100%;
      padding: 10px 12px;
      background: #EEEBEB;
      border: none;
      outline: none;
      border-radius: 4px;
      position: sticky;
      top: 0;
      z-index: 999;

      &::placeholder {
        font-weight: 500;
        color: #A8A8A8;
      }
    }

    &_owner_list {
      height: 70vh;
      overflow-y: auto;
      &_content {
        margin-left: 12px;
        padding-top: 6px;
        h4 {
          font-size: 16px;
          color: #000;
          margin-bottom: 4px;
        }

        p {
          font-size: 14px;
          color: #9297A3;
        }
      }

      li {
        cursor: pointer;
        display: flex;
        align-items: start;
        padding: 8px 12px;
        margin-top: 4px;
        &:hover{
          background: #f1f5f7;
        }
      }
    }
  }
`;
const TelegramChat = ({
                          open = false,
                          onClose = () => {
                          },
                          chats = [],
                          ...rest
                      }) => {

        useEffect(() => {
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        }, [open]);
        console.log('chats',chats)

        return (
            <>
                {open && <Styled {...rest}>
                    <div onClick={onClose} className="modal__backdrop"></div>
                    <div className="modal__body">
                        <div  className="modal__close">
                            <X onClick={onClose} className={'modal__close_icon'} size={24}/>
                        </div>
                        <div className="modal__content">
                            <div className="modal__content_left">
                                <div className={'modal__content_left_top'}>
                                    <input className={'modal__content_search'} type="text" placeholder={'Search'}/>
                                </div>
                                <ul className={'modal__content_owner_list'}>
                                    {
                                        chats.map(chat=> <li key={get(chat,'id')}>
                                            <Avatar size={'md'}  />
                                            <div className={'modal__content_owner_list_content'}>
                                                <h4>{get(chat,'name')}</h4>
                                                <p>{get(chat,'username')}</p>
                                            </div>
                                        </li>)
                                    }
                                </ul>
                            </div>
                            <div className="modal__content_right">
                                <div className="modal__content_right_top">
                                    <h2>Turapov Avazbek</h2>
                                </div>
                                <div className="modal__content_right_content"></div>
                            </div>
                        </div>
                    </div>
                </Styled>}
            </>
        );
    }
;

export default TelegramChat;