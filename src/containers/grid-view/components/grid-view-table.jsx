import React, {memo} from 'react';
import styled, {css} from "styled-components";
import {isArray, get, isNil} from "lodash";
import {useNavigate} from "react-router-dom";
import EmptyPage from "../../../modules/auth/pages/EmptyPage";

const Styled = styled.div`
  margin-top: 5px;
  margin-bottom: 20px;

  .table {
    width: 100%;


    tr {
      border-bottom: 1px solid #D0D0D0;
    }

    &__head {
      tr {
        border-bottom-color: #707070;
      }

      th {
        font-size: 14px;
        font-weight: 500;
        color: #000;
        font-family: 'Inter', sans-serif;
        padding: 15px 15px 20px 15px;

        &:first-child {
          text-align: left;
        }

      }
    }

    &__body {
      tr {
        cursor: pointer;
        transition: 0.2s ease;

        &:hover {
          background: #f1f5f7;
        }
      }

      td {
        text-align: center;
        padding: 15px;
        font-size: 14px;
        font-weight: 400;

        &:first-child {
          text-align: left;
        }

      }
    }

    ${({bordered}) => bordered && css`
      border: 1px solid #D0D0D0;

      .table__head {
        th {
          border: 1px solid #D0D0D0;
        }
      }

      .table__body {
        td {
          border: 1px solid #D0D0D0;
        }
      }
    `}
  }

  ${({tableHeadDark}) => tableHeadDark && css`
    .table__head {
      background: #F2F1F1;
    }

  `}
}
`;
const GridViewTable = ({
                           children,
                           tableHeaderData = [],
                           tableBodyData = [],
                           viewUrl = null,
                           offset = 0,
                           onRowClick = () => {
                           },
                           ...rest
                       }) => {
    const navigate = useNavigate();
    if (tableBodyData?.length == 0) {
        return <EmptyPage/>
    }
    return (
        <Styled {...rest}>
            <table className="table">
                <thead className={"table__head"}>
                <tr>
                    {
                        tableHeaderData && isArray(tableHeaderData) && tableHeaderData.map((th, i) => <th
                            key={get(th, "id", i)} style={{
                            textAlign: get(th, 'align', ''),
                            width: get(th, 'width', 'auto')
                        }}>{get(th, "title")}</th>)
                    }
                </tr>
                </thead>
                <tbody className={"table__body"}>
                {
                    tableBodyData && isArray(tableBodyData) && tableBodyData.map((tr, i) => <tr
                        onClick={() => !isNil(viewUrl) ? navigate(`${viewUrl}/${get(tr, "id")}`) : onRowClick(tr, i)}
                        key={i}>
                        {
                            tableHeaderData && isArray(tableHeaderData) && tableHeaderData.map((th, j) =>
                                <td key={j} style={{
                                    textAlign: get(th, 'align', ''),
                                    width: get(th, 'width', 'auto')
                                }}>{get(th, 'render') ? get(th, 'render')(get(tr, get(th, 'dataIndex')), tr, i, offset) : get(tr, get(th, 'dataIndex'), '-')}</td>
                            )
                        }
                    </tr>)
                }
                </tbody>
            </table>
        </Styled>
    );
};

export default memo(GridViewTable);