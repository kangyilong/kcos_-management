import React, {useState, useEffect, useCallback} from 'react';
import { connect } from 'dva';
import { Menu, Icon } from 'antd';
import wantOperationApi from "../../methods/api/wantOperationApi";
const KY = require('@/assets/ky.jpg');

interface Props {
  dispatch: Function
}
export default function HeaderComponent (props: Props) {

  const [topMenu, setTopMenu] = useState([]);

  const queryMenuFn = useCallback(() => {
    const statements = `SELECT * FROM message_menu WHERE parent_id = 'TOP'`;
    wantOperationApi({statements}).then(data => {
      props.dispatch({
        type: 'global_menu/selectedHeaderMenu',
        payload: data[0].id
      });
      setTopMenu(data);
    });
  }, []);

  const handleClick = useCallback((ev) => {
    props.dispatch({
      type: 'global_menu/selectedHeaderMenu',
      payload: ev.item.props['data-id']
    });
  }, []);

  useEffect(() => {
    queryMenuFn()
  }, []);

  return (
    <>
      <div className="logo" style={{'width': '8%', 'textAlign': 'center'}}>
        <img src={KY} alt="" style={{'width': '80%', 'height': '80%'}}/>
      </div>
      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={['top0']}
        style={{ lineHeight: '64px' }}
        onClick={handleClick}
      >
        {
          Array.isArray(topMenu) && topMenu.map((item, index) => (
            <Menu.Item key={`top${index}`} data-id={item.id}>{item.name}</Menu.Item>
          ))
        }
      </Menu>
    </>
  )
}
