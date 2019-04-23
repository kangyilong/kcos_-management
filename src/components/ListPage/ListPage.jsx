import * as tslib_1 from "tslib";
import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Form, Table, message } from 'antd';
import ListPageHeader from './ListPageHeader';
import PageButtons from './PageButtons';
import styled from './listPage.css';
import wantOperationApi from '@/methods/api/wantOperationApi';
let ListPage = class ListPage extends PureComponent {
    constructor() {
        super(...arguments);
        this.state = {
            selectedRowKeys: [],
            selectedData: [],
            loading: true
        };
        this.getListPageData = (statements) => {
            wantOperationApi({ statements }).then(data => {
                this.setState({
                    selectedData: data,
                    loading: false
                });
            });
        };
        this.onSelectChange = (selectedRowKeys) => {
            const { dispatch } = this.props;
            dispatch({
                type: 'global_page/rowKeys',
                payload: selectedRowKeys
            });
            this.setState({ selectedRowKeys });
        };
        this.screeningList = (sv) => {
            const { statements, columns } = this.props;
            const keys = Object.keys(sv);
            const values = Object.values(sv);
            let includeObj = [];
            columns.forEach(item => {
                if (item.include) {
                    includeObj.push({
                        [item.dataIndex]: item.dataIndex,
                        include: item.include
                    });
                }
            });
            let searchStatements = statements;
            if (keys.length > 0 && values.length > 0) {
                if (this.props.statements.includes('pp')) {
                    keys.forEach((item, index) => {
                        if (item.includes('Name')) {
                            item = item.substr(0, item.length - 4);
                        }
                        let search = '';
                        includeObj.length > 0 ? includeObj.forEach(includeItem => {
                            if (includeItem[item]) {
                                search = ` AND ${includeItem.include}.${item} like '%${values[index]}%'`;
                            }
                            else {
                                search = ` AND p.${item} like '%${values[index]}%'`;
                            }
                        }) : search = ` AND p.${item} like '%${values[index]}%'`;
                        searchStatements += search;
                    });
                }
                else {
                    keys.forEach((item, index) => {
                        if (item.includes('Name')) {
                            item = item.substr(0, item.length - 4);
                        }
                        searchStatements += ` AND ${item} = '${values[index]}'`;
                    });
                }
            }
            this.getListPageData(searchStatements);
        };
        this.buttonEvent = (ID) => {
            const hasMsg = message.loading('');
            const { tableName, asId, statements } = this.props;
            const delStatements = `delete from ${tableName} where ${asId ? asId : 'id'} = '${ID}'`;
            wantOperationApi({ statements: delStatements }).then(() => {
                hasMsg();
                message.success('操作成功', 1.5, () => {
                    this.getListPageData(statements);
                });
            }, hasMsg);
        };
    }
    componentDidMount() {
        const { statements } = this.props;
        this.getListPageData(statements);
    }
    render() {
        const { selectedRowKeys } = this.state;
        const { menuId, match, columns } = this.props;
        const rowSelection = {
            selectedRowKeys,
            onChange: this.onSelectChange,
            type: 'radio'
        };
        return (<>
        <div className={styled.header}>
          <ListPageHeader form={this.props.form} columns={columns} screeningList={this.screeningList}/>
        </div>
        <div className={styled.btn_box}>
          {menuId ? (<PageButtons menuId={menuId} match={match} buttonEvent={this.buttonEvent}/>) : null}
        </div>
        <div className="content">
          <Table columns={columns} dataSource={this.state.selectedData} rowSelection={rowSelection} rowKey={record => record.id} loading={this.state.loading}></Table>
        </div>
      </>);
    }
};
ListPage = tslib_1.__decorate([
    connect(({ global_menu }) => ({
        menuId: global_menu.menuId,
        menuName: global_menu.menuName
    }))
], ListPage);
const WrappedNormalListPage = Form.create({ name: 'listPage' })(ListPage);
export default WrappedNormalListPage;
//# sourceMappingURL=ListPage.jsx.map