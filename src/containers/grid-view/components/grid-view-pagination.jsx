import React, {memo} from 'react';
import styled from "styled-components";
import ReactPaginate from "react-paginate";
import {ChevronRight, ChevronLeft} from "react-feather";
import GridViewPerPage from "./grid-view-per-page";

const Styled = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 30px;

  ul {
    display: flex;
    justify-content: flex-end;

    li {
      a {
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        -webkit-border-radius: 50%;
        -moz-border-radius: 50%;
        border-radius: 50%;
        border: 1px solid transparent;
      }

      &.selected {
        a {
          border-color: #000;
        }
      }
    }
  }
`;


const GridViewPagination = ({
                                setLimit = () => {},
                                limit = 5,
                                pageCount = 0,
                                setPage = () => {
                                },
                                ...rest
                            }) => {
    return (
        <Styled {...rest}>
            <ReactPaginate
                breakLabel="..."
                nextLabel={<ChevronRight size={20}/>}
                onPageChange={({selected}) => setPage(selected)}
                pageRangeDisplayed={limit}
                pageCount={pageCount}
                previousLabel={<ChevronLeft size={20}/>}
                renderOnZeroPageCount={null}
            />
            {pageCount > 0 && <GridViewPerPage defaultValue={{value:limit,label:limit}} setLimit={setLimit} />}
        </Styled>
    );
};

export default memo(GridViewPagination);