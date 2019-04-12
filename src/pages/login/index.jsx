import React, { PureComponent } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import router from 'umi/router';
import styled from './login.css';
import wantOperationApi from "../../methods/api/wantOperationApi";
class LoginIndex extends PureComponent {
    constructor() {
        super(...arguments);
        this.handleSubmit = (e) => {
            e.preventDefault();
            this.props.form.validateFields((err, values) => {
                if (!err) {
                    const statements = `SELECT login_name, user_id FROM user_management WHERE login_name='${values.login_name}' AND login_paw='${values.login_paw}'`;
                    wantOperationApi({ statements }).then((data) => {
                        if (Array.isArray(data) && data.length > 0) {
                            message.success('登录成功', 1.5, () => {
                                sessionStorage.setItem('user_id', data[0].user_id);
                                router.push('/home');
                            });
                        }
                        else {
                            message.warning('用户名或密码错误', 1.5);
                        }
                    }).catch((err) => {
                        message.error('登录失败');
                    });
                }
            });
        };
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (<div className={styled.login}>
                <div className={styled.header}>
                    <h4 className={styled.title}>Login</h4>
                </div>
                <div className={styled.container}>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Form.Item>
                            {getFieldDecorator('login_name', {
            rules: [{ required: true, message: 'Please input your username!' }],
        })(<Input size="large" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>} placeholder="Username"/>)}
                        </Form.Item>
                        <Form.Item style={{ 'margin': '30px 0' }}>
                            {getFieldDecorator('login_paw', {
            rules: [{ required: true, message: 'Please input your Password!' }],
        })(<Input size="large" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }}/>} type="password" placeholder="Password"/>)}
                        </Form.Item>
                        <Form.Item style={{ 'textAlign': 'right', 'paddingRight': '10px' }}>
                            <Button size="large" htmlType="submit" className="login-form-button" style={{ 'backgroundColor': '#1890ff', 'color': '#fff' }}>
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>);
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginIndex);
export default WrappedNormalLoginForm;
//# sourceMappingURL=index.jsx.map