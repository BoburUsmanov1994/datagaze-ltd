import React from 'react';
import styled from "styled-components";
import Menu from "../menu";
import miniLogo from '../../assets/images/mini-logo.svg'
import {Link, useNavigate} from "react-router-dom";
import {LogOut} from "react-feather";
import Swal from "sweetalert2";
import {get} from "lodash";
import {useSettingsStore, useStore} from "../../store";
import storage from "../../services/storage";
import {  useQueryClient } from "react-query"


const Styled = styled.aside`
  position: fixed;
  width: 60px;
  height: 100vh;
  border-right: 1px solid #CDCDCD;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom: 15px;
  overflow-y: auto;

  .miniLogo {
    display: block;
    text-align: center;
    margin-bottom: 15px;
  }

  .logout {
    position: absolute;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`;

const Sidebar = ({children, ...rest}) => {
    const queryClient = useQueryClient();
    const clearToken = useSettingsStore(state => get(state, 'setToken', () => {
    }))
    const setAuth = useStore(state => get(state, 'setAuth', () => {
    }))
    const setUser = useStore(state => get(state, 'setUser', () => {
    }))

    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title: 'Chiqishga ishonchingiz komilmi?',
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#CD4472',
            cancelButtonColor: '#463BC1',
            confirmButtonText: 'Ha albatta',
            cancelButtonText: 'Ortga qaytish',
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                queryClient.removeQueries("profile")
                setAuth(false);
                clearToken(null);
                setUser(null);
                storage.remove('settings');
                navigate('/auth');
            }
        });
    }
    return (
        <Styled {...rest}>
            <Link className={'miniLogo'} to={'/dashboard'}>
                <img src={miniLogo} alt="mini logo"/>
            </Link>
            <Menu/>
            <div onClick={logout} className="logout">
                <LogOut color={'#948989'} size={22}/>
            </div>
        </Styled>
    );
};

export default Sidebar;