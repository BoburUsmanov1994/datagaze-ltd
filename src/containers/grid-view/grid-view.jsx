import React, {useState} from 'react';
import styled from "styled-components";
import GridTable from "./components/grid-table";
import GridTableBody from "./components/grid-table-body";
import {Col, Row} from "react-grid-system";
import Title from "../../components/ui/title";
import {get, isEmpty} from "lodash"
import {
    useDeleteQuery,
    useGetAllQuery,
    useGetOneQuery,
    usePaginateQuery,
    usePostQuery,
    usePutQuery
} from "../../hooks/api";
import ErrorPage from "../../modules/auth/pages/ErrorPage";
import {OverlayLoader} from "../../components/loader";
import GridModal from "./components/grid-modal";
import Button from "../../components/ui/button";
import Panel from "../../components/panel"
import Search from "../../components/search";
import Section from "../../components/section";
import Swal from "sweetalert2";
import EmptyPage from "../../modules/auth/pages/EmptyPage";
import Pagination from "../../components/pagination";


const Styled = styled.div`

`;
const GridView = ({
                      TableBody = GridTableBody,
                      ModalBody = () => <h2>Modal body</h2>,
                      tableHeaderData = [],
                      title = '',
                      keyId,
                      url,
                      responseDataKey = 'data'
                  }) => {
    const [openModal, setOpenModal] = useState(false)
    const [rowId, setRowId] = useState(null)
    const [page, setPage] = useState(1)
    const {data, isError, isLoading, isFetching} = usePaginateQuery({key: keyId, url,page})
    const {mutate: createRequest,isLoading:postLoading} = usePostQuery({listKeyId: keyId})
    const {mutate: updateRequest,isLoading:putLoading} = usePutQuery({listKeyId: keyId})
    const {mutate: deleteRequest,isLoading:deleteLoading} = useDeleteQuery({listKeyId: keyId})

    const create = ({data}) => {
        createRequest({url, attributes: data}, {
            onSuccess: () => {
                setOpenModal(false)
            },
            onError: () => {
                setOpenModal(false)
            }
        })
    }

    const update = ({data}) => {
        if (rowId) {
            updateRequest({url: `${url}/${rowId}`, attributes: data}, {
                onSuccess: () => {
                    setOpenModal(false)
                },
                onError: () => {
                    setOpenModal(false)
                }
            })
        }
    }

    const openEditModal = (id) => {
        setOpenModal(true);
        setRowId(id);
    }

    const remove = (id) => {
        Swal.fire({
            position: 'center',
            icon: 'error',
            backdrop: 'rgba(0,0,0,0.9)',
            background: 'none',
            title: 'Are you sure?',
            showConfirmButton: true,
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#13D6D1',
            confirmButtonText: 'Delete',
            customClass: {
                title: 'title-color',
            },
        }).then((result) => {
            if (result.isConfirmed) {
                deleteRequest({url: `${url}/${id}`})
            }
        });
    }

    if (isLoading || putLoading || postLoading || deleteLoading) {
        return <OverlayLoader/>
    }

    if (isError) {
        return <ErrorPage/>
    }
    return (
        <Styled>
            <Panel>
                <Row>
                    <Col xs={10}>
                        <Search/>
                    </Col>
                    <Col xs={2} className={'text-right'}>
                        <Button lg onClick={() => {
                            setOpenModal(true);
                            setRowId(null)
                        }}>
                            Добавить
                        </Button>
                    </Col>
                </Row>
            </Panel>
            <Section>
                <Row>
                    <Col xs={12}>
                        <Title>{title}</Title>
                    </Col>
                    <Col xs={12}>
                        <GridModal
                            responseDataKey={responseDataKey}
                            keyId={keyId}
                            rowId={rowId}
                            url={url}
                            create={create}
                            update={update}
                            visible={openModal}
                            hide={() => setOpenModal(false)}
                            ModalBody={ModalBody}
                        />
                    </Col>

                </Row>
                {isEmpty(get(data, `data[${responseDataKey}]`, [])) ? <EmptyPage/> : <>
                    <div className={'horizontal-scroll'}><GridTable
                        page={page}
                        TableBody={TableBody}
                        tableHeaderData={tableHeaderData}
                        remove={remove}
                        openEditModal={openEditModal}
                        tableBodyData={get(data, `data[${responseDataKey}]`, [])}
                        isFetching={isFetching}
                    /></div>
                <Pagination page={page} setPage={setPage} totalItems={get(data, `data.totalItems`, 0)} />
                </>}
            </Section>
        </Styled>
    );
};

export default GridView;