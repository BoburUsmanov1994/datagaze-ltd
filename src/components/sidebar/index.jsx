import React from 'react';
import styled from "styled-components";
import Menu from "../menu";
import miniLogo from '../../assets/images/mini-logo.svg'
import maxLogo from '../../assets/images/logo.svg'
import {Link} from "react-router-dom";
import {LogOut} from "react-feather";
import Swal from "sweetalert2";
import {useTranslation} from "react-i18next";
import {useNavigate} from "react-router-dom"
import {motion} from "framer-motion";
import {useSettingsStore} from "../../store";
import {get} from "lodash";


const Styled = styled(motion.div)`
  position: sticky;
  top: 0;
  height: 100vh;
  border-right: 1px solid #CDCDCD;
  background-color: #fff;
  overflow-x: hidden;
  padding-top: 20px;
  padding-bottom: 15px;
  overflow-y: auto;

  .miniLogo {
    display: block;
    text-align: ${({isMenuOpen}) => isMenuOpen ? 'left' : 'center'};
    padding-left: ${({isMenuOpen}) => isMenuOpen ? '12px' : '0'};
    margin-bottom: 15px;
  }

  .logout {
    border-top: 1px solid #CDCDCD;
    position: absolute;
    z-index: 9999;
    background: #fff;
    width: 100%;
    height: 50px;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: ${({isMenuOpen}) => isMenuOpen ? 'flex-start' : 'center'};
    cursor: pointer;
    padding-left: ${({isMenuOpen}) => isMenuOpen ? '15px' : '0'};

    span {
      margin-left: 10px;
      display: ${({isMenuOpen}) => isMenuOpen ? 'inline-block' : 'none'};
    }
  }
`;

const Sidebar = ({children, ...rest}) => {
    const {t} = useTranslation()
    const isMenuOpen = useSettingsStore(state => get(state, 'isMenuOpen', true))
    const navigate = useNavigate();
    const logout = () => {
        Swal.fire({
            title: t('Chiqishga ishonchingiz komilmi?'),
            icon: 'warning',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            showCancelButton: true,
            confirmButtonColor: '#CD4472',
            cancelButtonColor: '#463BC1',
            confirmButtonText: t('Ha albatta'),
            cancelButtonText: t('Ortga qaytish'),
            customClass: {
                title: 'title-color',
                content: 'text-color',
                icon: 'icon-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/logout')
            }
        });
    }
    return (
        <Styled isMenuOpen={!isMenuOpen} as={motion.div} animate={{width: !isMenuOpen ? 225 : 60}} {...rest}>
            <Link className={'miniLogo'} to={'/dashboard'}>
                <img width={!isMenuOpen ? 175 : 30} src={!isMenuOpen ? maxLogo : miniLogo} alt="mini logo"/>
            </Link>
            <Menu/>
            <div onClick={logout} className="logout">
                <LogOut color={'#948989'} size={22}/> <span>{t("Logout")}</span>
            </div>
        </Styled>
    );
};

export default Sidebar;