import React, {memo} from 'react';
import styled from "styled-components";
import classNames from "classnames";

const Styled = styled.table`
  width: 100%;

  tr {
    vertical-align: middle;
  }

  .table-head {

  }

  .table-body {

  }
`;

const Table = ({
                   thead = [],
                   children,
                   ...rest
               }) => {
    return (
        <Styled {...rest}>
            <thead className={classNames('table-head')}>
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

export default memo(Table);