import React, { PureComponent } from 'react';
import FormPage from '@/components/FormPage/FormPage';
import wantOperationApi from '@/methods/api/wantOperationApi';
import { message } from 'antd';
import {getQueryString} from '@/methods/util';

export default class Addedit extends PureComponent {

  state = {
    id: getQueryString('id') || ''
  };

  formAddSubmit = (values) => {
    const hasMsg = message.loading('');
    const statements = `INSERT INTO message_menu (id,level,parent_id,name,path,type,number,remark) VALUES (?,?,?,?,?,?,?,?)`;
    const parameter = JSON.stringify([
      `kcos_menu1314${new Date().getTime()}${Math.floor(Math.random() * 1000)}`,
      values.level,
      values.parent_id !== '#' ? values.parent_id : 'TOP',
      values.name,
      values.path,
      values.type,
      +values.number,
      values.remark ? values.remark : ''
    ]);
    wantOperationApi({statements, parameter}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        window.history.go(-1);
      });
    }, hasMsg);
  };

  formEditSubmit = (values, id) => {
    const hasMsg = message.loading('');
    const statements = `UPDATE message_menu SET level = ?, parent_id = ?, name = ?, path = ?, type = ?, number = ?, remark = ? where id = ?`;
    const parameter = JSON.stringify([
      values.level,
      values.parent_id,
      values.name,
      values.path,
      values.type,
      +values.number,
      values.remark ? values.remark : '',
      id
    ]);
    wantOperationApi({statements, parameter}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        window.history.go(-1);
      });
    }, hasMsg);
  };

  render() {
    const fileds = [
      {
        title: '父菜单编号',
        filed: 'parent_id',
        type: 'select',
        required: true,
        keyName: 'id',
        valueName: 'name-id-path',
        statements: `SELECT name, id, path FROM message_menu WHERE type = 'menu'`
      },{
        title: '菜单名称',
        filed: 'name',
        required: true
      },{
        title: '菜单地址',
        filed: 'path',
        required: true
      },{
        title: '菜单等级',
        filed: 'level',
        required: true
      },{
        title: '菜单类型',
        filed: 'type',
        type: 'select',
        required: true,
        keyName: 'ckey',
        valueName: 'cvalue',
        statements: `SELECT ckey, cvalue FROM dictionary_data WHERE belongs_to = 'message_menu'`
      },{
        title: '序号',
        filed: 'number',
        required: true
      },{
        title: '备注',
        filed: 'remark'
      }
    ];
    return (
      <div className="menu_addedit">
        <FormPage
          fileds={ fileds }
          formAddSubmit={this.formAddSubmit}
          formEditSubmit={this.formEditSubmit}
          details={
            {
              ID: this.state.id,
              tableName: 'message_menu'
            }
          }
        />
      </div>
    )
  }
}
