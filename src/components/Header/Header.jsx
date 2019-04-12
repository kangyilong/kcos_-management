import React, { useState, useEffect, useCallback } from 'react';
import { Menu } from 'antd';
import wantOperationApi from "../../methods/api/wantOperationApi";
const KY = require('@/assets/ky.jpg');
export default function HeaderComponent() {
    const [topMenu, setTopMenu] = useState([]);
    const queryMenuFn = useCallback(() => {
        const statements = `SELECT * FROM message_menu WHERE parent_id = 'TOP'`;
        wantOperationApi({ statements }).then(data => {
            setTopMenu(data);
        });
    }, []);
    useEffect(() => {
        queryMenuFn();
    }, []);
    return (<>
      <div className="logo" style={{ 'width': '8%', 'textAlign': 'center' }}>
        <img src={KY} alt="" style={{ 'width': '80%', 'height': '80%' }}/>
      </div>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['top0']} style={{ lineHeight: '64px' }}>
        {Array.isArray(topMenu) && topMenu.map((item, index) => (<Menu.Item key={`top${index}`}>{item.name}</Menu.Item>))}
      </Menu>
    </>);
}
function handleClick(e) {
    console.log(e);
}
//# sourceMappingURL=Header.jsx.map