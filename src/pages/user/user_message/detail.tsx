import React, { PureComponent } from 'react';
import DetailsPage from '@/components/DetailsPage/DetailsPage';
import { getQueryString } from '@/methods/util';

export default class UserMessageDetail extends PureComponent {

  state = {
    statementsDetail: `SELECT 
    u.user_id,
    u.user_hpic,
    u.user_real_name,
    u.user_nick_name,
    u.user_email,
    u.user_mobile,
    u.user_paw,
    u.m_total,
    d.cvalue AS user_level
    FROM
    userMsg AS u
    LEFT JOIN
    dictionary_data AS d
    ON
    d.ckey = u.user_level
    AND d.belongs_to = 'userMsg'
    AND d.type = 'level'
    WHERE
    u.user_id = '${getQueryString('id')}'`
  };

  render() {
    const keys = [
      {
        filed: 'user_id',
        name: '用户编号'
      },{
        filed: 'user_nick_name',
        name: '用户昵称'
      },{
        filed: 'user_real_name',
        name: '真实姓名'
      },{
        filed: 'user_mobile',
        name: '手机号'
      },{
        filed: 'user_email',
        name: '邮箱号'
      },{
        filed: 'user_hpic',
        name: '用户头像',
        type: 'img'
      },{
        filed: 'user_paw',
        name: '登录密码'
      },{
        filed: 'm_total',
        name: '用户余额'
      },{
        filed: 'user_level',
        name: '用户等级'
      }
    ];
    return (
      <div>
        <DetailsPage keys={keys} statementsDetail={this.state.statementsDetail}/>
      </div>
    )
  }
}
