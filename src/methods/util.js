import { routerRedux } from 'dva/router';
// 判断用户是否登录
export function isLogin() {
    return !!sessionStorage.getItem('user_id');
}
// 获取用户id
export function getUserId() {
    const user_id = sessionStorage.getItem('user_id') || '';
    return user_id;
}
// 退出登录
export function loginOut() {
    sessionStorage.clear();
    routerRedux.push('/login');
}
// 获取url上参数
export function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}
// 处理菜单数据
export function dealWithMenu(menuData) {
    if (Array.isArray(menuData)) {
        let menuLevel01 = [], menuLevel02 = [], menuLevel03 = [];
        menuData.forEach(item => {
            switch (item.level) {
                case '1':
                    menuLevel01.push(item);
                    break;
                case '2':
                    menuLevel02.push(item);
                    break;
                case '3':
                    menuLevel03.push(item);
                    break;
            }
        });
        menuLevel02 = childrenMenu(menuLevel02, menuLevel03);
        menuData = childrenMenu(menuLevel01, menuLevel02);
        return menuData;
    }
    else {
        return [];
    }
}
function childrenMenu(parentList, childrenList) {
    if (Array.isArray(parentList) && Array.isArray(childrenList)) {
        let children = [];
        parentList.forEach(item1 => {
            childrenList.forEach(item2 => {
                if (item1.id === item2.parent_id) {
                    children.push(item2);
                    item1.children = children;
                }
            });
        });
        return parentList;
    }
}
//# sourceMappingURL=util.js.map