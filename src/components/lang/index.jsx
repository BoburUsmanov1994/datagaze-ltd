import React, {useState} from 'react';
import styled from "styled-components";
import Dropdown from "../dropdown";
import {get, isEqual} from "lodash";
import {useTranslation} from "react-i18next";
import config from "../../config";
import {useSettingsStore} from "../../store";
import {langData} from "../../constants/lang";
import {ChevronDown} from "react-feather";


const Styled = styled.div`
  margin-left: 28px;
  margin-right: 28px;

  .lang {
    display: flex;
    align-items: flex-end;


    span {
      font-family: 'Gilroy-Bold', sans-serif;
      font-size: 18px;
      margin-right: 0px;
    }

    .lang__icon {
      margin-right: 5px;
      width: 26px;
      height: 26px;
      object-fit: cover;
    }

    &-body {
      padding: 10px 15px;


      li {
        margin-bottom: 5px;
        cursor: pointer;
        transition: 0.3s ease;
        text-align: center !important;
        font-size: 18px;

        &:hover {
          color: #4439C1;
        }

        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
`;

const Language = ({
                      ...rest
                  }) => {

    const [close, setClose] = useState(false);

    const {t, i18n} = useTranslation()

    const setLang = useSettingsStore(state => get(state, 'setLang', () => {
    }))

    const lang = useSettingsStore(state => get(state, 'lang', config.DEFAULT_APP_LANG))

    const changeLang = (code = "ru") => {
        setLang(code);
        setClose(true);
        return i18n.changeLanguage(code)
    }

    return (
        <Styled {...rest}>
            <Dropdown isClose={close} button={<div onClick={() => setClose(false)} className={'lang'}>
                <img className={'lang__icon'} src={get(langData.find(item => isEqual(get(item, 'code'), lang)), 'icon')}
                     alt=""/><span>{get(langData.find(item => isEqual(get(item, 'code'), lang)), 'title')}</span><ChevronDown
                size={20} color={'#9B9B9B'}/>
            </div>}>
                {!close && <ul className={'lang-body'}>
                    {
                        langData && langData.map(item => <li
                            key={get(item, 'code')}
                            onClick={() => changeLang(get(item, 'code'))}>{get(item, 'title')}</li>)
                    }

                </ul>}
            </Dropdown>
        </Styled>
    );
};

export default Language;