import React, { useState, useEffect, useCallback } from 'react';
import { Row, Col, Button } from 'antd';
import DetailFooter from '@/components/components/DetailFooter';
import styles from './details.css';
import wantOperationApi from '@/methods/api/wantOperationApi';

interface Props {
  keys: Array<any>,
  statementsDetail: string
}
export default function DetailsPage(props: Props) {

  const [detailsData, setDetailsData] = useState([]);

  const getDetailsFn = useCallback(() => {
    wantOperationApi({statements: props.statementsDetail}).then(data => {
      const k = props.keys.map(item => {
        return {...item, value: data[0][item.filed]}
      });
      setDetailsData(k);
    })
  }, []);

  const detailCol = (item) => {
    return item.type && item.type === 'img' ? (<Col span={10}><img src={item.value} width="160px"/></Col>) : (<Col span={10}>{ item.value }</Col>)
  };

  useEffect(() => {
    getDetailsFn();
    return () => {};
  }, []);

  return (
    <div className={styles.details_page}>
      {
        detailsData.length > 0 && detailsData.map((item, index) => (
          <Row key={index} className={styles.details_row}>
            <Col span={4} offset={2} style={{'textAlign': 'right', 'marginRight': '5px'}}>{item.name}：</Col>
            {
              detailCol(item)
            }
          </Row>
        ))
      }
      <DetailFooter />
    </div>
  )
}
