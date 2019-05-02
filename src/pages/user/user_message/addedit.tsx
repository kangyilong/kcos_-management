import React, { PureComponent } from 'react';
import FormPage from '@/components/FormPage/FormPage';
import wantOperationApi from '@/methods/api/wantOperationApi';
import { message } from 'antd';
import { getQueryString, formatImg } from '@/methods/util';

interface Props {

}
export default class UserAddEdit extends PureComponent {

  state = {
    id: getQueryString('id') || ''
  };

  formAddSubmit = (values) => {
    const hasMsg = message.loading('');
    const fileList = values.user_hpic && values.user_hpic.fileList ? values.user_hpic.fileList.map(item => item.response ? item.thumbUrl : item.uid) : '';
    delete values.user_hpic;
    const user_hpic = fileList && formatImg(fileList);
    const {user_nick_name, user_real_name, user_mobile, user_email, user_paw} = values;
    const statements = `INSERT INTO userMsg 
                        (user_id,
                        user_hpic,
                        user_real_name,
                        user_nick_name,
                        user_email,
                        user_mobile,
                        user_paw,
                        user_money,
                        m_total,
                        user_level) values (?,?,?,?,?,?,?,?,?,?)`;
    const parameter = JSON.stringify([
      `kcos1314${new Date().getTime()}${Math.floor(Math.random() * 1000)}`,
      user_hpic,
      user_real_name,
      user_nick_name,
      user_email,
      user_mobile,
      user_paw,
      0,
      0,
      1
    ]);
    wantOperationApi({statements, parameter}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        window.history.go(-1);
      });
    });
  };

  formEditSubmit = (values) => {
    const hasMsg = message.loading('');
    const fileList = values.user_hpic.fileList ? values.user_hpic.fileList.map(item => item.response ? item.thumbUrl : item.uid) : '';
    const user_hpic = fileList ? formatImg(fileList) : values.user_hpic;
    const {user_id, user_nick_name, user_real_name, user_mobile, user_email, user_paw} = values;
    const statements = `UPDATE userMsg SET 
                        user_nick_name = ?,
                        user_real_name = ?,
                        user_hpic = ?,
                        user_mobile = ?,
                        user_email = ?,
                        user_paw = ?,
                        WHERE
                        user_id = ?`;
    const parameter = JSON.stringify([
      user_nick_name,
      user_real_name,
      user_hpic,
      user_mobile,
      user_email,
      user_paw,
      user_id
    ]);
    wantOperationApi({statements, parameter}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        window.history.go(-1);
      });
    }, hasMsg);
  };

  render() {
    const fileds = [{
        title: '用户编号',
        filed: 'user_id',
        type: 'hidden'
      }, {
        title: '用户昵称',
        filed: 'user_nick_name',
        required: true
      },{
        title: '真实姓名',
        filed: 'user_real_name'
      },{
        title: '用户头像',
        filed: 'user_hpic',
        type: 'img'
      },{
        title: '手机号',
        filed: 'user_mobile'
      },{
        title: '邮箱号',
        filed: 'user_email'
      },{
        title: '登录密码',
        filed: 'user_paw',
        required: true
      }
    ];
    return (
      <FormPage
        fileds={ fileds }
        formAddSubmit={this.formAddSubmit}
        formEditSubmit={this.formEditSubmit}
        details={
          {
            ID: this.state.id,
            nameID: 'user_id',
            tableName: 'userMsg'
          }
        }
      />
    )
  }
}
