
// ref: https://umijs.org/config/
export default {
  treeShaking: true,
  // extraBabelPlugins: [['transform-remove-console']],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    ['umi-plugin-react', {
      antd: true,
      dva: {
        hmr: true,
        immer: true
      },
      dynamicImport: { webpackChunkName: true },
      title: '数据中心',
      dll: false,
      routes: {
        exclude: [
          /models\//,
          /services\//,
          /model\.(t|j)sx?$/,
          /service\.(t|j)sx?$/,
          /components\//,
        ],
      },
    }],
  ],
  define: {
    'process.env.ENV': process.env.ENV
  }
}

// 'process.env.base': 'http://api2.lanchengiot.cn'
