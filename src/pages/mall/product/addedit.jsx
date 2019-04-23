import React, { PureComponent } from 'react';
import FormPage from '@/components/FormPage/FormPage';
import wantOperationApi from '@/methods/api/wantOperationApi';
import { message } from 'antd';
import { getQueryString } from '@/methods/util';
export default class ShopAddEdit extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            id: getQueryString('id') || ''
        };
        this.formEditSubmit = (values, id) => {
            const hasMsg = message.loading('');
            const statements = `UPDATE productMsg SET product_name = '${values.product_name}' WHERE product_id = '${id}'`;
            wantOperationApi({ statements }).then(() => {
                hasMsg();
                message.success('操作成功', 1.5, () => { window.history.go(-1); });
            }, hasMsg);
        };
    }
    render() {
        const fileds = [
            {
                title: '产品名称',
                filed: 'product_name',
                required: true
            }
        ];
        return (<FormPage fileds={fileds} formEditSubmit={this.formEditSubmit} details={{
            ID: this.state.id,
            nameID: 'product_id',
            tableName: 'productMsg'
        }}/>);
    }
}
//# sourceMappingURL=addedit.jsx.map