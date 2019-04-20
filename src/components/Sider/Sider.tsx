import React, { useState, useEffect, useCallback } from 'react';
import {
    Layout, Menu, Icon
} from 'antd';
import wantOperationApi from "@/methods/api/wantOperationApi";
import { dealWithMenu } from '@/methods/util';
import Link from 'umi/link';
import router from 'umi/router';

const { SubMenu } = Menu;
const { Sider } = Layout;

interface Props {
    dispatch: Function,
    headerMenuId: string
}

export default function SiderComponent (props: Props) {

    const [siderMenu, setSiderMenu] = useState([]);
    const [selectedKeys, setSelectedKeys] = useState('menu00');
    const [openKeys, setOpenKeys] = useState('sub0');
    const { dispatch, headerMenuId } = props;
    const querySiderMenu = useCallback((headerMenuId) => {
        const statements = `SELECT * FROM message_menu WHERE parent_id != 'TOP' AND parent_id != '#' AND type = 'menu'`;
        wantOperationApi({statements}).then(data => {
            const siderData = dealWithMenu(data);
            const setSiderData = siderData[headerMenuId];
            setSiderMenu(setSiderData);
            setSelectedKeys(`menu00`);
            setOpenKeys(`sub0`);
            if(setSiderData[0] && setSiderData[0].children) {
              dispatch({
                type: 'global_menu/breadcrumb',
                payload: [setSiderData[0].name, setSiderData[0].children[0].name]
              });
              dispatch({
                type: 'global_menu/selectedMenu',
                payload: { id: setSiderData[0].children[0].id, name: setSiderData[0].children[0].name }
              });
              router.push(setSiderData[0].children[0].path);
            }else {
              router.push('/public/noChildrenMenu');
            }
        });
    }, []);

    useEffect(() => {
        querySiderMenu(headerMenuId)
    }, [props.headerMenuId]);

    function clickSiderMenu(menuIndex, menuItemIndex, id) {
      const name = siderMenu[menuIndex].children[menuItemIndex].name;
      setSelectedKeys(`menu${menuIndex}${menuItemIndex}`);
      setOpenKeys(`sub${menuIndex}`);
      sessionStorage.setItem('defPath', siderMenu[menuIndex].children[menuItemIndex].path);
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
                    defaultSelectedKeys={[selectedKeys]}
                    defaultOpenKeys={[openKeys]}
                    style={{ height: '100%', borderRight: 0 }}
                >
                    {
                        Array.isArray(siderMenu) && siderMenu.map((item, index) => (
                            <SubMenu key={`sub${index}`} title={<span>{item.name}</span>}>
                                {
                                    Array.isArray(item.children) && item.children.map((c_item, c_index) => (
                                        <Menu.Item key={`menu${index}${c_index}`}>
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
