import React, { PureComponent } from 'react';
import ListPage from '@/components/ListPage/ListPage';
export default class SystemMenu extends PureComponent {
    render() {
        const { match } = this.props;
        const columns = [{
                dataIndex: 'parent_id',
                title: '父菜单编号',
                search: true
            }, {
                title: '菜单名称',
                dataIndex: 'name',
                search: true
            }, {
                title: '菜单地址',
                dataIndex: 'path',
                search: true
            }, {
                title: '菜单类型',
                dataIndex: 'typeName',
                type: 'select',
                keyName: 'ckey',
                valueName: 'cvalue',
                statements: `SELECT ckey, cvalue FROM dictionary_data WHERE belongs_to = 'message_menu'`,
                search: true
            }];
        return (<>
              <ListPage match={match} columns={columns} statements={`SELECT p.*, pp.cvalue AS typeName FROM message_menu p, dictionary_data pp WHERE p.type = pp.ckey`} tableName="message_menu"/>
            </>);
    }
}
//# sourceMappingURL=menu.jsx.map