import React, { PureComponent } from 'react';
import FormPage from '@/components/FormPage/FormPage';
import wantOperationApi from '@/methods/api/wantOperationApi';
import { message } from 'antd';
import { getQueryString, formatImg } from '@/methods/util';
export default class ShopAddEdit extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            id: getQueryString('id') || ''
        };
        this.formAddSubmit = (values) => {
            const hasMsg = message.loading('');
            const fileList = values.shop_pic.fileList.map(item => item.response ? item.thumbUrl : item.uid);
            const shop_pic = formatImg(fileList);
            const { product_id, shop_Num, shop_name, shop_pri, shop_txt } = values;
            // 查询该产品下有几种商品
            const p_statements = `SELECT COUNT(*) AS count FROM shopMsg WHERE product_id = '${product_id}'`;
            wantOperationApi({ statements: p_statements }).then(data => {
                const count = data[0].count;
                const statements = `INSERT INTO shopMsg (product_id, shop_id, shop_name, shop_pic, shop_pri, shop_Num, shop_txt) VALUES (?,?,?,?,?,?,?)`;
                const parameter = JSON.stringify([
                    product_id,
                    `${product_id}.${count + 1}`,
                    shop_name,
                    shop_pic,
                    shop_pri,
                    shop_Num,
                    shop_txt
                ]);
                wantOperationApi({
                    statements,
                    parameter
                }).then(() => {
                    hasMsg();
                    message.success('操作成功', 1.5, () => {
                        window.history.go(-1);
                    });
                }, hasMsg);
            }, hasMsg);
        };
        this.formEditSubmit = (values, id) => {
            const hasMsg = message.loading('');
            const fileList = values.shop_pic.fileList ? values.shop_pic.fileList.map(item => item.response ? item.thumbUrl : item.uid) : '';
            const shop_pic = fileList ? formatImg(fileList) : values.shop_pic;
            const { product_id, shop_Num, shop_name, shop_pri, shop_txt } = values;
            const statements = `UPDATE shopMsg SET shop_pic = ?, shop_pri = ?, shop_Num = ?, product_id = ?, shop_txt = ?, shop_name = ? WHERE shop_id = ?`;
            const parameter = JSON.stringify([
                shop_pic,
                shop_pri,
                shop_Num,
                product_id,
                shop_txt,
                shop_name,
                id
            ]);
            wantOperationApi({ statements, parameter }).then(() => {
                hasMsg();
                message.success('操作成功', 1.5, () => {
                    window.history.go(-1);
                });
            }, hasMsg);
        };
    }
    render() {
        const fileds = [
            {
                title: '所属产品',
                filed: 'product_id',
                type: 'select',
                required: true,
                keyName: 'product_id',
                valueName: 'product_name-product_id',
                statements: `SELECT product_name, product_id FROM productMsg`
            }, {
                title: '商品名称',
                filed: 'shop_name',
                required: true
            }, {
                title: '商品图片',
                filed: 'shop_pic',
                required: true,
                type: 'img'
            }, {
                title: '商品单价(元)',
                filed: 'shop_pri',
                required: true
            }, {
                title: '商品库存(个)',
                filed: 'shop_Num',
                required: true
            }, {
                title: '商品介绍',
                filed: 'shop_txt',
                type: 'textarea'
            }
        ];
        return (<FormPage fileds={fileds} formAddSubmit={this.formAddSubmit} formEditSubmit={this.formEditSubmit} details={{
            ID: this.state.id,
            nameID: 'shop_id',
            tableName: 'shopMsg'
        }}/>);
    }
}
//# sourceMappingURL=addedit.jsx.map