import React from 'react';
import styled from "styled-components";
import classNames from "classnames";

const Styled = styled.table`
  width: 100%;

  tr {
    vertical-align: middle;
  }

  .table-head {
    &.hidden {
      opacity: 0;
    }

    th {
      padding: 12px;
      color: #010101;
      font-family: 'Gilroy-Medium', sans-serif;
      font-size: 16px;

      &:first-child {
        text-align: left;
        padding-left: 20px;
      }

      text-align: center;

      &:last-child {
        text-align: right;
        padding-right: 20px;
        min-width: 125px;
      }
    }
  }

  .table-body {
    tr:nth-child(2n+1) {
      background-color: #F4F4F4;
    }

    td {
      padding: 12px;
      font-family: 'Gilroy-Regular', sans-serif;
      color: #000;

      &:first-child {
        text-align: left;
        padding-left: 20px;
      }

      text-align: center;

      &:last-child {
        text-align: right;
        padding-right: 20px;
      }
    }
  }
`;

const Table = ({
                   thead = [],
                   children,
                   hideThead = true,
                   ...rest
               }) => {
    return (
        <Styled>
            <thead className={classNames('table-head', {hidden: hideThead})}>
            <tr>
                {thead && thead.map((th, i) => <th key={i + 1}>{th}</th>)}
            </tr>
            </thead>
            <tbody className={'table-body'}>
            {children}
            </tbody>
        </Styled>
    );
};

export default Table;