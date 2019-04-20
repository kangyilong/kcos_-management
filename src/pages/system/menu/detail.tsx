import React, { PureComponent } from 'react';
import DetailsPage from '@/components/DetailsPage/DetailsPage';
import { getQueryString } from '@/methods/util';

export default class Detail extends PureComponent {

  state = {
    statementsDetail: `SELECT 
      m.parent_id,
      m.name, m.path,
      m.level,
      d.cvalue AS type,
      m.number,
      m.remark
      FROM
      message_menu AS m 
      LEFT JOIN
      dictionary_data AS d
      ON
      m.type = d.ckey
      WHERE
      m.id = '${getQueryString('id')}'`
  };

  render() {
    const keys = [
      {
        filed: 'parent_id',
        name: '父菜单编号'
      },{
        filed: 'name',
        name: '菜单名称'
      },{
        filed: 'path',
        name: '菜单地址'
      },{
        filed: 'level',
        name: '菜单等级'
      },{
        filed: 'type',
        name: '菜单类型'
      },{
        filed: 'number',
        name: '序号'
      },{
        filed: 'remark',
        name: '备注'
      }
    ];
    return (
      <div>
        <DetailsPage keys={keys} statementsDetail={this.state.statementsDetail}/>
      </div>
    )
  }
}
