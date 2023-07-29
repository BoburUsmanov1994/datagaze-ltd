import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {Grid, List} from "react-feather";

const Styled = styled.div`
  margin-left: 24px;
  display: flex;
  align-items: center;

  .mr-8 {
    margin-right: 12px;
  }
`;
const Template = ({
                      getTemplate = () => {
                      }, ...rest
                  }) => {
    const [active, setActive] = useState('list');
    useEffect(() => {
        getTemplate(active);
    }, [active])
    return (
        <Styled {...rest}>
            <Grid color={active=='list' ? '#010162' : '#B0ACAC'} onClick={() => setActive('list')} className={'mr-8 cursor-pointer'} size={28}/>
            <List color={active=='grid' ? '#010162' : '#B0ACAC'} onClick={() => setActive('grid')} className={' cursor-pointer'} size={34}/>
        </Styled>
    );
};

export default Template;