import fetch from './fetch';
export default function wantOperationApi(params) {
    return fetch('http://localhost:3666/wantMsg', 'post', params);
}
//# sourceMappingURL=wantOperationApi.js.map