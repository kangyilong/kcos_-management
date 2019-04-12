declare module "*.css";
declare module "*.less";
declare module "*.png";
declare module "*.jpg";
declare module "*.gif";
declare module "BMap"; // BMap
declare module "BMapLib"; // BMapLib
interface Window { // umi允许通过window.g_app 访问store
  g_app: {
    _store: {
      dispatch: Function,
      getState: Function
    },
    _models: Array<any>
  },
  g_routes: Array<any>,
  baidubce: any
}
