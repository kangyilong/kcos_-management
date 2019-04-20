import { routerRedux } from 'dva/router';
import Index from '@/pages/home';

// 判断用户是否登录
export function isLogin () {
    return !!sessionStorage.getItem('user_id');
}

// 获取用户id
export function getUserId () {
    const user_id = sessionStorage.getItem('user_id') || '';
    return user_id;
}

// 退出登录
export function loginOut () {
    sessionStorage.clear();
    routerRedux.push('/login');
}

// 获取url上参数
export function getQueryString (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

// 处理菜单数据
export function dealWithMenu (menuData) {
    if(Array.isArray(menuData)) {
        let menuObject = {}, menuLevel01 = [], menuLevel02 = [], menuLevel03 = [];
        menuData.forEach(item => {
          switch (item.level) {
            case '1':
              menuLevel01.push({
                ...item,
                children: []
              });
              break;
            case '2':
              menuLevel02.push({
                ...item,
                children: []
              });
              break;
            case '3':
              menuLevel03.push({
                ...item,
                children: []
              });
              break;
          }
        });
        menuLevel02 = childrenMenu(menuLevel02, menuLevel03);
        menuData = childrenMenu(menuLevel01, menuLevel02);
        menuData.forEach(item => {
          if(menuObject[item.parent_id]) {
            menuObject[item.parent_id].push(item);
          }else {
            menuObject[item.parent_id] = [];
            menuObject[item.parent_id].push(item);
          }
        });
        return menuObject;
    }else {
        return [];
    }
}

function childrenMenu (parentList, childrenList) {
    if(Array.isArray(parentList) && Array.isArray(childrenList)) {
        parentList.forEach(item1 => {
            childrenList.forEach(item2 => {
                if(item1.id === item2.parent_id) {
                    item1.children.push(item2);
                }
            });
        });
        return parentList;
    }
}

export function formatImg(imgFileList) {
  if(Array.isArray(imgFileList)) {
    return imgFileList.join('||');
  }
  return '';
}
