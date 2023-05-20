import React from 'react';
import styled from "styled-components";
import {useForm} from "react-hook-form";
import {Search} from "react-feather";
import {get} from "lodash";
import {useTranslation} from "react-i18next";

const Styled = styled.form`
  display: flex;
  position: relative;

  .search-form-input {
    padding: 12px 24px;
    border: 1px solid #D0D0D0;
    border-radius: 30px;
    display: block;
    width: 100%;
    outline: none;
    transition: 0.2s ease;
    font-size: 16px;

    &:focus {
      border-color: #4439C1;
    }
  }

  .search-form-btn {
    background: transparent;
    border: none;
    color: #D0D0D0;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    z-index: 50;
    outline: none;
  }
`;
const SearchComponent = ({
                             handleSearch = () => {
                             },
                             ...rest
                         }) => {
    const {t} = useTranslation()
    const {register, handleSubmit} = useForm();
    const onSubmit = (data) => {
        handleSearch(get(data, 'search'))
    }
    return (
        <Styled onSubmit={handleSubmit(onSubmit)} {...rest}>
            <input placeholder={t('Поиск')}  {...register("search")} type="text" className={'search-form-input'}/>
            <button className={'search-form-btn'} type={'submit'}>
                <Search size={22}/>
            </button>
        </Styled>
    );
};

export default SearchComponent;