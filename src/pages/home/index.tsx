import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
    Layout, Menu, Breadcrumb, Icon,
} from 'antd';
import HeaderComponent from '@/components/Header/Header';
import SiderComponent from '@/components/Sider/Sider';
import wantOperationApi from "../../methods/api/wantOperationApi";

const { Header, Content } = Layout;

interface Props {
    children: any,
    dispatch?: Function,
    breadcrumbAll?: Array<any>
}

@connect(({ global_menu }) => ({
  breadcrumbAll: global_menu.breadcrumbAll
}))
export default class Index extends PureComponent<Props, any> {
    componentDidMount() {
        // this.insertMenuFn();
    }
    insertMenuFn = () => {
        // insert into 表名 (字段1,字段2,字段3) values (?,?,?)
        const statements = `insert into message_menu (id,level,parent_id,name,path,type) values (?,?,?,?,?,?)`;
        const parameter = JSON.stringify([
            `kcos_m${new Date().getTime()}`,
            '0',
            'kcos_m1554618673254',
            '详情',
            '/detail',
            'btn'
        ]);
        wantOperationApi({statements, parameter}).then(data => {
            console.log(data);
        });
    };

    render () {
        const { children, dispatch, breadcrumbAll } = this.props;
        return(
            <div className="home">
                <Layout>
                    <Header className="header" style={{display: "flex"}}>
                        <HeaderComponent />
                    </Header>
                    <Layout>
                        <SiderComponent dispatch={dispatch}/>
                        <Layout style={{ padding: '0 24px 24px' }}>
                            <Breadcrumb style={{ margin: '16px 0' }}>
                                {
                                  Array.isArray(breadcrumbAll) && breadcrumbAll.map((item, index) => (
                                    <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                                  ))
                                }
                            </Breadcrumb>
                            <Content style={{
                                background: '#fff', padding: 24, margin: 0, minHeight: 280,
                            }}
                            >
                                {children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
