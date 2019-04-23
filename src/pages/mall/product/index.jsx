import React, { PureComponent } from 'react';
import ListPage from '@/components/ListPage/ListPage';
export default class MallProduct extends PureComponent {
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
        return (<>
        <ListPage match={match} columns={columns} statements={`SELECT product_id AS id, product_name FROM productMsg`} tableName="productMsg" asId="product_id"/>
      </>);
    }
}
//# sourceMappingURL=index.jsx.map