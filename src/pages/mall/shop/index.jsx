import React, { PureComponent } from 'react';
import ListPage from '@/components/ListPage/ListPage';
export default class MallShop extends PureComponent {
    render() {
        const { match } = this.props;
        const columns = [{
                dataIndex: 'product_id',
                title: '产品编号',
                search: true
            }, {
                dataIndex: 'id',
                title: '商品编号',
                search: true
            }, {
                dataIndex: 'product_name',
                title: '产品名称',
                include: 'pp',
                search: true
            }, {
                title: '商品名称',
                dataIndex: 'shop_name',
                search: true
            }, {
                title: '商品单价(元)',
                dataIndex: 'shop_pri',
                search: true
            }, {
                title: '商品库存(个)',
                dataIndex: 'shop_Num'
            }];
        return (<>
        <ListPage match={match} columns={columns} statements={`SELECT p.shop_id as id, p.product_id, p.shop_name, p.shop_pri, p.shop_Num, pp.product_name FROM shopMsg as p inner join productMsg as pp on p.product_id = pp.product_id`} tableName="shopMsg"/>
      </>);
    }
}
//# sourceMappingURL=index.jsx.map