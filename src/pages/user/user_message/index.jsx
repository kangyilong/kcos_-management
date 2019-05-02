import React, { PureComponent } from 'react';
import ListPage from '@/components/ListPage/ListPage';
export default class UserMessage extends PureComponent {
    render() {
        const { match } = this.props;
        const columns = [{
                dataIndex: 'id',
                title: '用户编号',
                search: true,
                belong: 'user_id'
            }, {
                dataIndex: 'user_nick_name',
                title: '用户昵称',
                search: true
            }, {
                dataIndex: 'user_email',
                title: '邮箱号',
                search: true
            }, {
                title: '手机号',
                dataIndex: 'user_mobile',
                search: true
            }, {
                title: '用户等级',
                dataIndex: 'user_level',
                search: true,
                type: 'select',
                keyName: 'ckey',
                valueName: 'cvalue',
                statements: `SELECT ckey, cvalue FROM dictionary_data WHERE belongs_to = 'userMsg' AND type = 'level'`
            }];
        return (<>
        <ListPage match={match} columns={columns} statements={`SELECT p.user_id AS id, p.user_nick_name, p.user_email, p.user_mobile, pp.cvalue AS user_level FROM userMsg AS p INNER JOIN dictionary_data AS pp ON p.user_level = pp.ckey AND pp.type = 'level' ORDER BY p.user_id DESC`} tableName="userMsg" asId="user_id"/>
      </>);
    }
}
//# sourceMappingURL=index.jsx.map