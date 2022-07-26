import React from 'react';
import styled from "styled-components";
import {Container, Row, Col} from "react-grid-system";
import GridViewCalendar from "./grid-view-calendar";
import GridViewFilter from "./grid-view-filter";
import GridViewInterval from "./grid-view-interval";
import GridViewExport from "./grid-view-export";
import Flex from "../../../components/flex";

const Styled = styled.div`
  padding: 10px;
  border-bottom: 1px solid #CDCDCD;
  position: relative;

  .gridview__header {
    display: flex;
    align-items: center;
  }
`;

const GridViewHeader = ({...rest}) => {
    return (
        <Styled {...rest}>
            <Container fluid>
                <Row align={"center"}>
                    <Col xs={9} className={'gridview__header'}>
                        <GridViewCalendar/>
                        <GridViewFilter/>
                        <GridViewInterval/>
                    </Col>
                    <Col xs={3}>
                        <Flex  justify={'flex-end'}> <GridViewExport/></Flex>
                    </Col>
                </Row>
            </Container>
        </Styled>
    );
};

export default GridViewHeader;