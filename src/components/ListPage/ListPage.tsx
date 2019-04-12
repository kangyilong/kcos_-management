import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, message
} from 'antd';
import ListPageHeader from './ListPageHeader';
import PageButtons from './PageButtons';
import styled from './listPage.css';
import wantOperationApi from '@/methods/api/wantOperationApi';

interface Props {
  form: any,
  columns: Array<any>,
  match?: any,
  menuId?: string,
  menuName?: string,
  statements?: string,
  dispatch?: Function,
  tableName?: string
}

@connect(({ global_menu }) => ({
  menuId: global_menu.menuId,
  menuName: global_menu.menuName
}))
class ListPage extends PureComponent<Props, any>{

  state = {
    selectedRowKeys: [],
    selectedData: [],
    loading: true
  };

  getListPageData = (statements) => {
    wantOperationApi({statements}).then(data => {
      this.setState({
        selectedData: data,
        loading: false
      });
    });
  };

  componentDidMount() {
    const {statements} = this.props;
    this.getListPageData(statements);
  }

  onSelectChange = (selectedRowKeys) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'global_page/rowKeys',
      payload: selectedRowKeys
    });
    this.setState({ selectedRowKeys });
  };

  screeningList = (sv) => {
    const keys = Object.keys(sv);
    const values = Object.values(sv);
    let searchStatements = this.props.statements;
    if(keys.length > 0 && values.length > 0) {
      if(this.props.statements.includes('pp')) {
        keys.forEach((item, index) => {
          if(item.includes('Name')) {
            item = item.substr(0, item.length - 4);
          }
          searchStatements += ` AND p.${item} like '%${values[index]}%'`
        });
      }else {
        keys.forEach((item, index) => {
          if(item.includes('Name')) {
            item = item.substr(0, item.length - 4);
          }
          searchStatements += ` AND ${item} = '${values[index]}'`
        });
      }
    }
    this.getListPageData(searchStatements);
  };

  buttonEvent = (ID) => {
    const hasMsg = message.loading('');
    const { tableName, statements } = this.props;
    const delStatements = `delete from ${tableName} where id = '${ID}'`;
    wantOperationApi({statements: delStatements}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        this.getListPageData(statements);
      });
    }, hasMsg);
  };

  render() {
    const { selectedRowKeys } = this.state;
    const { menuId, match, columns } = this.props;
    const rowSelection: any = {
      selectedRowKeys,
      onChange: this.onSelectChange,
      type: 'radio'
    };
    return (
      <>
        <div className={styled.header}>
          <ListPageHeader form={this.props.form} columns={columns} screeningList={this.screeningList}/>
        </div>
        <div className={styled.btn_box}>
          {
            menuId ? (<PageButtons menuId={ menuId } match={match} buttonEvent={this.buttonEvent}/>) : null
          }
        </div>
        <div className="content">
          <Table
            columns={columns}
            dataSource={this.state.selectedData}
            rowSelection={ rowSelection }
            rowKey={record => record.id}
            loading={this.state.loading}
          ></Table>
        </div>
      </>
    )
  }
}


const WrappedNormalListPage = Form.create({ name: 'listPage' })<any>(ListPage);
export default WrappedNormalListPage;
