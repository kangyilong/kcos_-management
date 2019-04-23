import React, { PureComponent } from 'react';
import DetailsPage from '@/components/DetailsPage/DetailsPage';
import { getQueryString } from '@/methods/util';

export default class Detail extends PureComponent {

  state = {
    statementsDetail: `SELECT
    product_id,
    product_name
    FROM
    productMsg
    WHERE
    product_id = '${getQueryString('id')}'`
  };

  render() {
    const keys = [
      {
        filed: 'product_id',
        name: '产品编号'
      },{
        filed: 'product_name',
        name: '产品名称'
      }
    ];
    return (
      <div>
        <DetailsPage keys={keys} statementsDetail={this.state.statementsDetail}/>
      </div>
    )
  }
}
