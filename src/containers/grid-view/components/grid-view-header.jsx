import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import Search from "../../../components/search";

const Styled = styled.div`
  padding: 10px;
  border-bottom: 1px solid #CDCDCD;
  position: relative;

  .gridview__header {
    display: flex;
    align-items: center;
  }

  .form-group {
    margin-bottom: 0;
  }

  .form-btn {
    margin-top: 0;
  }

  label {
    margin-bottom: 0 !important;
  }
`;

const GridViewHeader = ({
                            headerComponent = null,
                            handleSearch = () => {
                            },
                            ...rest
                        }) => {
    return (
        <Styled {...rest}>
            <Container fluid>
                <Row align={"center"}>
                    <Col xs={9} className={'gridview__header'}>
                        {headerComponent}
                    </Col>
                    <Col xs={3}>
                        <Search handleSearch={handleSearch}/>
                    </Col>
                </Row>
            </Container>
        </Styled>
    );
};

export default GridViewHeader;