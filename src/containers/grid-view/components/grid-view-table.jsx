import React, {memo} from 'react';
import styled from "styled-components";
import {isArray, get} from "lodash";
import dayjs from "dayjs";
import Badge from "../../../components/ui/badge";
import {useNavigate} from "react-router-dom";
import EmptyPage from "../../../modules/auth/pages/EmptyPage";

const Styled = styled.div`
  padding: 30px;


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
        padding: 15px 15px 30px 15px;

        &:first-child {
          text-align: left;
        }

        &:last-child {
          //text-align: right;
        }
      }
    }

    &__body {
      tr{
        cursor: pointer;
      }
      td {
        text-align: center;
        padding: 25px 15px;
        font-size: 13px;
        font-weight: 400;

        &:first-child {
          text-align: left;
        }

        &:last-child {
          //text-align: right;
        }
      }
    }
  }
`;
const GridViewTable = ({
                           children,
                           tableHeaderData = [],
                           tableBodyData = [],
    viewUrl,
                           ...rest
                       }) => {
    const navigate = useNavigate();
    if(tableBodyData?.length == 0){
        return <EmptyPage />
    }
    return (
        <Styled {...rest}>
            <table className="table">
                <thead className={"table__head"}>
                <tr>
                    <th>№</th>
                    {
                        tableHeaderData && isArray(tableHeaderData) && tableHeaderData.map((th, i) => <th
                            key={get(th, "id", i)}>{get(th, "title")}</th>)
                    }
                </tr>
                </thead>
                <tbody className={"table__body"}>
                {
                    tableBodyData && isArray(tableBodyData) && tableBodyData.map((tr, i) => <tr onClick={()=>navigate(`${viewUrl}/${get(tr,"id")}`)} key={i}>
                        <td>{i + 1}</td>
                        {
                            tableHeaderData && isArray(tableHeaderData) && tableHeaderData.map((th, j) => {
                                let cell = "-";
                                switch (get(th, "type")) {
                                    case "timestamp":
                                        cell = get(tr, `[${get(th, 'key')}]`, null) ? dayjs(get(tr, `[${get(th, 'key')}]`, "-")).format("DD-MM-YYYY HH:MM") : " - ";
                                        break;
                                    case "array":
                                        cell = get(th, 'key', []).map(k => <><span> {get(tr, `[${k}]`, "-")} </span>{get(th, 'hasBreak') && <br/>}</>);
                                        break;
                                    case "boolean":
                                        cell = <Badge success={get(tr, `[${get(th, 'key')}]`, false)} danger={!get(tr, `[${get(th, 'key')}]`, false)}>{get(tr, `[${get(th, 'key')}]`, false) ? "ДА" : "НЕТ"}</Badge>
                                        break;
                                    default :
                                        cell = get(tr, `[${get(th, 'key')}]`, "-")
                                }
                                return (<td
                                    key={get(th, "id", j)}>
                                    {cell}
                                </td>)
                            })
                        }
                    </tr>)
                }
                </tbody>
            </table>
        </Styled>
    );
};

export default memo(GridViewTable);