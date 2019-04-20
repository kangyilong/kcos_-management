export default {
  namespace: 'global_page',

  effects: {
    *rowKeys({ payload }, { call, put }) {
      yield put({
        type: 'setRowKeys',
        payload
      });
    },
    *rmRowKeys(_, { call, put }) {
      yield put({
        type: 'removeRowKeys'
      });
    }
  },

  reducers: {
    setRowKeys(state, action) {
      return {
        ...state,
        radioRowKeys: action.payload
      }
    },
    removeRowKeys(state) {
      return {
        ...state,
        radioRowKeys: null
      }
    }
  }
}
