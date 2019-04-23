import React, { PureComponent } from 'react';
import { Table } from 'antd';
import ListPage from '@/components/ListPage/ListPage';
// SELECT product_id, product_name FROM productMsg
interface Props {
  match?: any
}
export default class MallProduct extends PureComponent<Props, any> {
  render() {
    const { match } = this.props;
    const columns = [{
      dataIndex: 'id',
      title: '产品编号',
      search: true
    }, {
      dataIndex: 'product_name',
      title: '产品名称',
      search: true
    }];

    return (
      <>
        <ListPage
          match={ match }
          columns={columns}
          statements={`SELECT product_id AS id, product_name FROM productMsg`}
          tableName="productMsg"
          asId="product_id"
        />
      </>
    )
  }
}
