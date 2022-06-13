import React from 'react';
import {get} from "lodash";
import {Trash2, Edit, Eye} from "react-feather";

const GridTableBody = ({
                           tableHeaderData = [],
                           tableBodyData = [],
                           remove = () => {
                           },
                           openEditModal = () => {
                           },
                           page,
                       }) => {
    return (
        <>
            {
                tableBodyData && tableBodyData.map((tr, i) => <tr key={get(tr, '_id', i)}>
                    <td>{(page-1)*20+(i+1)}</td>
                    {
                        tableHeaderData && tableHeaderData.map((td, j) => <td key={get(td, 'id', j)}>
                            {
                                get(tr, `${get(td, 'key')}`, '-')
                            }
                        </td>)
                    }
                    <td><Eye className={'cursor-pointer mr-10'} size={20} color={'#78716c'}/><Edit
                        onClick={() => openEditModal(get(tr, '_id', null))} className={'cursor-pointer mr-10'} size={20}
                        color={'#13D6D1'}/><Trash2 onClick={() => remove(get(tr, '_id', null))}
                                                   className={'cursor-pointer '} size={20} color={'#dc2626'}/></td>
                </tr>)
            }
        </>
    );
};

export default GridTableBody;