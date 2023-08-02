import React, {useState, useEffect} from 'react';
import {Col, Row} from "react-grid-system";
import {VerticalTimeline, VerticalTimelineElement} from 'react-vertical-timeline-component';
import styled from "styled-components";
import {ReactSVG} from "react-svg";
import 'react-vertical-timeline-component/style.min.css';
import Flex from "../flex";
import ImageLightboxGallery from "../image-lightbox-gallery";
import galleryIcon from "../../assets/icons/polygon.svg";
import {AiFillCheckCircle} from "react-icons/ai";
import {get, isEmpty, isNil} from "lodash"
import dayjs from "dayjs";
import config from "../../config";
import {useInView} from "react-intersection-observer";
import {useStore} from "../../store";
import {useInfiniteLoadingQuery, usePaginateQuery} from "../../hooks/api";
import {KEYS} from "../../constants/key";
import {URLS} from "../../constants/url";
import {OverlayLoader} from "../loader";
import {Navigate} from "react-router-dom";


const StyledVerticalTimelineComponent = styled.div`
  .vertical-timeline--two-columns.vertical-timeline-element-icon {
    width: unset !important;
    height: unset !important;
    top: 0 !important;
  }

  .vertical-timeline::before {
    background-color: #D8DADF;
    top: 10px;
    width: 2px;
    height: 100%;
  }

  .vertical-timeline {
    padding: 0;
    width: 100% !important;
    max-width: unset;
    margin-top: 30px;
  }

  .vertical-timeline-element-icon {
    box-shadow: unset;
    top: 0px;
  }

  .vertical-timeline-element {
    margin: 0;
  }

  .vertical-timeline-element-content {
    box-shadow: unset;
    border: 1px solid #C9C9C9;
    margin-bottom: 25px;
    padding: 0;
  }

  .vertical-timeline-element-content-arrow {
    display: none;
  }

  .head-text {
    margin-top: 0;
    margin-left: 65px;
    display: flex;
    align-items: center;

    span {
      color: #6B7281;
      font-size: 14px;
      margin-right: 10px;
    }
  }

  .timeline-gallery {
    overflow-x: auto;
    white-space: nowrap;
    padding: 20px 16px 0px;
    cursor: pointer;

    .img {
      height: 180px;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      margin-bottom: 10px;
    }

    ::-webkit-scrollbar {
      height: 8px;
    }

    /* Track */

    ::-webkit-scrollbar-track {
      background: #F5F5F5;
    }

    /* Handle */

    ::-webkit-scrollbar-thumb {
      background: #B3B5B9;
      border-radius: 11px;
    }

    /* Handle on hover */

    ::-webkit-scrollbar-thumb:hover {
      background: #555;
    }

    &-item {
      width: 300px;
      min-height: 200px;
      background: transparent;
      border-radius: 10px;
      padding: 15px;
      margin-right: 30px;
      display: inline-block;
      border: 1px solid #CDCDCD;

      .count {
        color: #3E424A;
        font-size: 14px;
        font-weight: 500;
        margin-left: 10px;
      }

      h2 {
        font-size: 16px;
        font-weight: 500;
        color: #3E424A;
      }
    }
  }

  .timeline__box__head {
    background-color: #F1F1F1;
    padding: 8px 16px;
    border-bottom: 1px solid #C9C9C9;
    border-radius: 4px 4px 0px 0px;
  }
`;

const VerticalTimelineComponent = ({id = null, ...props}) => {
    const [open, setOpen] = useState(false);
    const [imageIndex, setImageIndex] = useState(null);
    const [items, setItems] = useState([]);
    const [page, setPage] = useState(0);

    const {ref, inView} = useInView();

    const dateRange = useStore(state => get(state, 'dateRange', null))

    const {
        data,
        isError,
        isFetching,
        isLoading
    } = usePaginateQuery({
        key: KEYS.screenshot,
        url: URLS.screenshot,
        params: {
            take: 10,
            skip: 0,
            employeeId: id,
            start: get(dateRange, 'startDate'),
            end: get(dateRange, 'endDate')
        },
        enabled:!isEmpty(dateRange)
    })


    useEffect(() => {
        if (inView) {
            if (items.length < parseInt(get(data, 'data.data.total'))) {
                setPage(prev => ++prev)
            }
        }
    }, [inView])
    useEffect(() => {
        if (!isEmpty(get(data, 'data.data.result', []))) {
            setItems(prev => [...prev, ...get(data, 'data.data.result', [])])
        }
    }, [data])

    if (isLoading) {
        return <OverlayLoader/>
    }
    return (
        <StyledVerticalTimelineComponent {...props}>

            <VerticalTimeline layout={'1-column-left'}>
                {items.map((item, i) => <VerticalTimelineElement key={i}
                                                                 className="vertical-timeline-element--work"
                                                                 icon={<AiFillCheckCircle
                                                                     color={'#5CC139'} size={'2em'}/>}
                >
                    <Row className={'mb-24'}>
                        <Col xs={12}>
                            <div className={'timeline__box__head'}>
                                <h2>{dayjs(get(item, 'dateTime')).format("DD.MM.YYYY")}</h2>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <div className="timeline-gallery">
                                <div className="timeline-gallery-item">
                                    <div className="img"
                                         style={{backgroundImage: `url(${config.FILE_SERVER}${get(item, 'filePath')})`}}
                                         onClick={() => {
                                             setImageIndex(get(item, '_id'))
                                             setOpen(true);
                                         }}/>
                                    <Row>
                                        <Col xs={12}>
                                            <Flex justify={'space-between'}>
                                                <p>68% of 1 hour</p>
                                            </Flex>
                                        </Col>
                                    </Row>
                                    {!isNil(imageIndex) && open &&
                                    <ImageLightboxGallery images={[`${config.FILE_SERVER}${get(item, 'filePath')}`]}
                                                          setOpen={setOpen}/>}
                                </div>
                            </div>
                        </Col>
                    </Row>
                </VerticalTimelineElement>)

                }
            </VerticalTimeline>
            <div>
                <button
                    ref={ref}
                >
                    {isFetching ? 'Loading...' : 'Nothing to load'}
                </button>
            </div>
        </StyledVerticalTimelineComponent>
    );
};

export default VerticalTimelineComponent;