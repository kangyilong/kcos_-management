import React from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import HomeIndex from '@/pages/home/index';
import router from 'umi/router';
import { CONFIG } from '@/methods/config';
class BasicLayout extends React.Component {
    componentWillMount() {
        const { location } = this.props;
        if (location.pathname === '/' || location.pathname === '' || location.pathname === '/home') {
            const user_id = sessionStorage.getItem('user_id');
            if (user_id !== CONFIG.USERID) {
                router.push('/login');
            }
            else {
                const defPath = sessionStorage.getItem('defPath');
                router.push(defPath);
            }
        }
    }
    render() {
        const { location, children } = this.props;
        return (<LocaleProvider locale={zh_CN}>
        <div>
          {(location.pathname === '/' || location.pathname === '' || location.pathname === '/login' || location.pathname === '/home') ?
            (<>{children}</>) : (<HomeIndex children={children}/>)}
        </div>
      </LocaleProvider>);
    }
}
;
export default BasicLayout;
//# sourceMappingURL=index.jsx.map