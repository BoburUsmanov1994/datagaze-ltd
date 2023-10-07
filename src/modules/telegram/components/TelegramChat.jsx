import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {X} from "react-feather";
import {get, isEmpty, head, isNil, debounce} from "lodash"
import Avatar from "../../../components/avatar";
import telegramBg from "../../../assets/images/telegram-bg.png";
import * as classNames from "classnames";
import {usePaginateQuery} from "../../../hooks/api";
import {KEYS} from "../../../constants/key";
import {URLS} from "../../../constants/url";
import dayjs from "dayjs";
import {useTranslation} from "react-i18next";

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

      &_top {
        padding: 12px 16px;
      }
    }

    &_right {
      position: relative;
      flex: 1;

      &_top {
        padding: 16px;
        background: #FBFBFB;
        border-left: 1px solid #E9E9E9;
        border-bottom: 1px solid #E9E9E9;
        height: 60px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-right: 0;

        .modal__content_left_top {
          position: static;
          flex: 1;
          max-width: 75%;
          min-width: 50%;
        }

        h2 {
          font-size: 18px;
          color: #000;
          font-weight: 500;
        }
      }

      &_content {
        height: 70vh;
        overflow-y: auto;
        background-image: url(${telegramBg});
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        padding: 20px;

        .message {
          display: flex;

          &__owner {
            font-weight: 500;
            color: #3E424A;
            margin-bottom: 4px;
          }

          &__content {
            color: #3E424A;
            margin-bottom: 4px;
          }

          &__date {
            color: #797979;
            font-size: 14px;
            text-align: right;
          }


          &.out {
            justify-content: flex-end;

            .message__box {
              background: #E9E9E9 !important;
              border-bottom-right-radius: 0;
            }
          }

          &.in {
            border-bottom-left-radius: 0;
          }

          &__box {
            padding: 12px 24px;
            margin-bottom: 25px;
            background: #F5F5F5;
            max-width: 80%;
            min-width: 50%;
            display: inline-block;
            border-radius: 10px;
          }
        }
      }
    }

    &_search {
      width: 100%;
      padding: 12px 16px;
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

        &.active {
          background: #f1f5f7;
        }

        &:hover {
          background: #f1f5f7;
        }
      }
    }
  }
`;
const TelegramChat = ({
                          id = null,
                          open = false,
                          onClose = () => {
                          },
                          chats = [],
                          owner = {},
                          dateRange = null,
                          getSearchByChat = () => {
                          },
                          search = '',
                          ...rest
                      }) => {
        const {t} = useTranslation()
        const [active, setActive] = useState(null);
        const [searchByMessage, setSearchByMessage] = useState('');

        const {data: messages} = usePaginateQuery({
            key: [KEYS.telegramMessage, active],
            url: URLS.telegramMessage,
            params: {
                employeeId: id,
                ownerId: get(owner, 'id'),
                chatId: active,
                start: get(dateRange, 'startDate'),
                end: get(dateRange, 'endDate'),
                search: searchByMessage,
                take: 100,
                skip: 0,
            },
            enabled: !isNil(get(owner, 'id') && id && active && dateRange)
        })


        useEffect(() => {
            if (open) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }

        }, [open]);
        useEffect(() => {
            if (!isEmpty(chats)) {
                setActive(get(head(chats), 'id'))
            }
        }, [chats]);

        return (
            <>
                {open && <Styled {...rest}>
                    <div onClick={onClose} className="modal__backdrop"></div>
                    <div className="modal__body">
                        <div className="modal__close">
                            <X onClick={onClose} className={'modal__close_icon'} size={24}/>
                        </div>
                        <div className="modal__content">
                            <div className="modal__content_left">
                                <div className={'modal__content_left_top'}>
                                    <input value={search} onChange={(e) => getSearchByChat(e?.target?.value)}
                                           className={'modal__content_search'} type="text"
                                           placeholder={t('Search by chat owner')}/>
                                </div>
                                <ul className={'modal__content_owner_list'}>
                                    {
                                        chats.map(chat => <li className={classNames({'active': get(chat, 'id') == active})}
                                                              onClick={() => setActive(get(chat, 'id'))}
                                                              key={get(chat, 'id')}>
                                            <Avatar size={'md'}/>
                                            <div className={'modal__content_owner_list_content'}>
                                                <h4>{get(chat, 'name')}</h4>
                                                <p>{get(chat, 'username')}</p>
                                            </div>
                                        </li>)
                                    }
                                </ul>
                            </div>
                            <div className="modal__content_right">
                                <div className="modal__content_right_top">
                                    <h2>{get(owner, 'name')}</h2>
                                    <div className={'modal__content_left_top'}>
                                        <input value={searchByMessage}
                                               onChange={(e) => setSearchByMessage(e?.target?.value)}
                                               className={'modal__content_search'} type="text"
                                               placeholder={t('Search by chat messages')}/>
                                    </div>
                                </div>
                                <div className="modal__content_right_content">
                                    {
                                        get(messages, 'data.data.result', []).map(message => <div key={get(message, 'id')}
                                                                                                  className={classNames(`message ${get(message, 'direction')}`)}>
                                            <div className={'message__box'}>
                                                <div className="message__owner">{get(message, 'senderName')}</div>
                                                <div className="message__content">{get(message, 'messege')}</div>
                                                <div
                                                    className="message__date">{dayjs(get(message, 'dateTime')).format('MMM D, YYYY HH:mm')}</div>
                                            </div>
                                        </div>)
                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                </Styled>}
            </>
        );
    }
;

export default TelegramChat;