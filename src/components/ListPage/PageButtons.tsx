import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { Button, message, Modal } from 'antd';
import router from 'umi/router';
import wantOperationApi from '@/methods/api/wantOperationApi';

const confirm = Modal.confirm;

interface Props {
  menuId: string,
  match: any,
  dispatch?: Function,
  radioRowKeys?: Array<any>,
  buttonEvent?: Function
}

@connect(({ global_page }) => ({
  radioRowKeys: global_page.radioRowKeys
}))
export default class PageButtons extends PureComponent<Props, any>{

  state = {
    buttons: []
  };

  getButtons = () => {
    const statements = `SELECT * FROM message_menu WHERE parent_id = '${this.props.menuId}' AND type = 'btn'`;
    wantOperationApi({statements}).then(data => {
      data = data.sort((a, b) => a.number - b.number);
      this.setState({
        buttons: data
      })
    });
  };

  buttonClick = (path) => {
    const { match, radioRowKeys, dispatch } = this.props;
    const PARENT_PATH = match.path;
    switch(path) {
      case '/add':
        router.push(PARENT_PATH+ '/addedit');
        break;
      case '/edit':
        if(!radioRowKeys) {
          message.warning('请选中后操作', 1.5);
          return;
        }
        router.push(`${PARENT_PATH}/addedit?id=${radioRowKeys[0]}`);
        break;
      case '/delete':
        if(!radioRowKeys) {
          message.warning('请选中后操作', 1.5);
          return;
        }
        confirm({
          title: '删除',
          content: '慎重考虑，确定删除？',
          onOk: () => {
            this.props.buttonEvent(radioRowKeys[0]);
          },
          onCancel() {},
          okText: '确认',
          cancelText: '取消'
        });
        break;
      case '/detail':
        if(!radioRowKeys) {
          message.warning('请选中后操作', 1.5);
          return;
        }
        router.push(`${PARENT_PATH}/detail?id=${radioRowKeys[0]}`);
        break;
    }
    dispatch({
      type: 'global_page/rmRowKeys'
    });
  };

  componentDidMount() {
    this.getButtons();
  }

  render() {
    return (
      <>
        {
          Array.isArray(this.state.buttons) && this.state.buttons.map((item, index) => (
            <Button key={index} onClick={() => {this.buttonClick(item.path)}}>{ item.name }</Button>
          ))
        }
      </>
    )
  }
}
