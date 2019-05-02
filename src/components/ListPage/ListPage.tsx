import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form, Table, message
} from 'antd';
import ListPageTable from './ListPageTable';
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
  tableName?: string,
  asId?: string,
  addWhere?: string
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
    const {statements, columns} = this.props;
    const keys = Object.keys(sv);
    const values = Object.values(sv);
    let includeObj = [], belognObj: Array<any> = [];
    columns.forEach(item => {
      if(item.include) {
        includeObj.push({
          [item.dataIndex]: item.dataIndex,
          include: item.include
        })
      }
      if(item.belong) {
        belognObj.push({
          [item.dataIndex]: item.dataIndex,
          belong: item.belong
        })
      }
    });
    let searchStatements = statements;
    if(keys.length > 0 && values.length > 0) {
      if(this.props.statements.includes('pp')) {
        keys.forEach((item, index) => {
          const addWhere = searchStatements.includes('WHERE') ? 'AND' : 'WHERE';
          if(item.includes('Name')) {
            item = item.substr(0, item.length - 4);
          }
          let search = '';
          if(includeObj.length > 0) {
            includeObj.forEach(includeItem => {
              if (includeItem[item]) {
                search = ` ${addWhere} ${includeItem.include}.${item} like '%${values[index]}%'`;
              }else {
                search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
              }
            })
          }else {
            search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
          }
          if(belognObj.length > 0) {
            belognObj.forEach(belongItem => {
              if (belongItem[item]) {
                search = ` ${addWhere} ${belongItem.belong} like '%${values[index]}%'`;
              }else {
                search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
              }
            })
          }else {
            search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
          }
          searchStatements += search;
        });
      }else {
        keys.forEach((item, index) => {
          const addWhere = searchStatements.includes('WHERE') ? 'AND' : 'WHERE';
          let search = '';
          if(item.includes('Name')) {
            item = item.substr(0, item.length - 4);
          }
          if(includeObj.length > 0) {
            includeObj.forEach(includeItem => {
              if (includeItem[item]) {
                search = ` ${addWhere} ${includeItem.include}.${item} like '%${values[index]}%'`;
              }else {
                search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
              }
            })
          }else {
            search = ` ${addWhere} ${item} like '%${values[index]}%'`;
          }
          if(belognObj.length > 0) {
            belognObj.forEach(belongItem => {
              if (belongItem[item]) {
                search = ` ${addWhere} ${belongItem.belong} like '%${values[index]}%'`;
              }else {
                search = ` ${addWhere} p.${item} like '%${values[index]}%'`;
              }
            })
          }else {
            search = ` ${addWhere} ${item} like '%${values[index]}%'`;
          }
          searchStatements += search;
        });
      }
    }
    this.getListPageData(searchStatements);
  };

  buttonEvent = (ID) => {
    const hasMsg = message.loading('');
    const { tableName, asId, statements } = this.props;
    const delStatements = `delete from ${tableName} where ${asId ? asId : 'id'} = '${ID}'`;
    wantOperationApi({statements: delStatements}).then(() => {
      hasMsg();
      message.success('操作成功', 1.5, () => {
        this.getListPageData(statements);
      });
    }, hasMsg);
  };

  render() {
    const { selectedRowKeys, selectedData } = this.state;
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
          {
            (<ListPageTable
              columns={columns}
              selectedData={ selectedData }
              rowSelection={ rowSelection }
              loading={this.state.loading}
            />)
          }
        </div>
      </>
    )
  }
}


const WrappedNormalListPage = Form.create({ name: 'listPage' })<any>(ListPage);
export default WrappedNormalListPage;
