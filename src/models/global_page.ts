export default {
  namespace: 'global_page',

  effects: {
    *rowKeys({ payload }, { call, put }) {
      yield put({
        type: 'setRowKeys',
        payload
      });
    }
  },

  reducers: {
    setRowKeys(state, action) {
      return {
        ...state,
        radioRowKeys: action.payload
      }
    }
  }
}
