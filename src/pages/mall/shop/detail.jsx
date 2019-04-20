import React, { PureComponent } from 'react';
import DetailsPage from '@/components/DetailsPage/DetailsPage';
import { getQueryString } from '@/methods/util';
export default class Detail extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            statementsDetail: `SELECT 
    p.*,
    pp.product_name
    FROM
    shopMsg AS p
    INNER JOIN
    productMsg AS pp
    ON
    p.product_id = pp.product_id
    AND
    p.shop_id = '${getQueryString('id')}'`
        };
    }
    render() {
        const keys = [
            {
                filed: 'product_id',
                name: '产品编号'
            }, {
                filed: 'shop_id',
                name: '商品编号'
            }, {
                filed: 'product_name',
                name: '产品名称'
            }, {
                filed: 'shop_name',
                name: '商品名称'
            }, {
                filed: 'shop_pic',
                name: '商品图片',
                type: 'img'
            }, {
                filed: 'shop_pri',
                name: '商品单价(元)'
            }, {
                filed: 'shop_Num',
                name: '商品库存(件)'
            }, {
                filed: 'shop_txt',
                name: '商品介绍'
            }
        ];
        return (<div>
        <DetailsPage keys={keys} statementsDetail={this.state.statementsDetail}/>
      </div>);
    }
}
//# sourceMappingURL=detail.jsx.map