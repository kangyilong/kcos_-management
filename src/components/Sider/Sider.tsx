import React, { useState, useEffect, useCallback } from 'react';
import {
    Layout, Menu, Icon
} from 'antd';
import wantOperationApi from "@/methods/api/wantOperationApi";
import { dealWithMenu } from '@/methods/util';
import Link from 'umi/link';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface Props {
    dispatch: Function
}
export default function SiderComponent (props: Props) {

    const [siderMenu, setSiderMenu] = useState([]);
    const { dispatch } = props;

    const querySiderMenu = useCallback(() => {
        const statements = `SELECT * FROM message_menu WHERE parent_id != 'TOP' AND type = 'menu'`;
        wantOperationApi({statements}).then(data => {
            setSiderMenu(dealWithMenu(data));
            sessionStorage.setItem('defPath', data[0].children[0].path);
            dispatch({
              type: 'global_menu/breadcrumb',
              payload: [data[0].name, data[0].children[0].name]
            });
          dispatch({
            type: 'global_menu/selectedMenu',
            payload: { id: data[0].children[0].id, name: data[0].children[0].name }
          });
        });
    }, []);

    useEffect(() => {
        querySiderMenu()
    }, []);

    function clickSiderMenu(menuIndex, menuItemIndex, id) {
      const name = siderMenu[menuIndex].children[menuItemIndex].name;
      dispatch({
        type: 'global_menu/breadcrumb',
        payload: [siderMenu[menuIndex].name, name]
      });
      dispatch({
        type: 'global_menu/selectedMenu',
        payload: { id, name }
      });
    }

    return (
        <>
            <Sider width={200} style={{ background: '#fff' }}>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['menu0']}
                    defaultOpenKeys={['sub0']}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Array.isArray(siderMenu) && siderMenu.map((item, index) => (
                            <SubMenu key={`sub${index}`} title={<span>{item.name}</span>}>
                                {
                                    Array.isArray(item.children) && item.children.map((c_item, c_index) => (
                                        <Menu.Item key={`menu${c_index}`}>
                                            <Link to={c_item.path} onClick={() => {clickSiderMenu(index, c_index, c_item.id)}}>{c_item.name}</Link>
                                        </Menu.Item>
                                    ))
                                }
                            </SubMenu>
                        ))
                    }
                </Menu>
            </Sider>
        </>
    )
}
