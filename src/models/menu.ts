export default {
  namespace: 'global_menu',

  effects: {
    *breadcrumb({ payload }, { call, put }) {
      yield put({
        type: 'setBreadcrumb',
        payload
      });
    },
    *selectedMenu({ payload }, { call, put }) {
      yield put({
        type: 'setMenu',
        payload
      });
    },
    *selectedHeaderMenu({ payload }, { call, put }) {
      yield put({
        type: 'setHeaderMenu',
        payload
      });
    }
  },

  reducers: {
    setBreadcrumb(state, action) {
      return {
        ...state,
        breadcrumbAll: action.payload
      }
    },
    setMenu(state, action) {
      return {
        ...state,
        menuId: action.payload.id,
        menuName: action.payload.name,
      }
    },
    setHeaderMenu(state, action) {
      return {
        ...state,
        headerMenuId: action.payload
      }
    }
  }
}
