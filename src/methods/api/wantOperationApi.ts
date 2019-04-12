import fetch from './fetch';

export default function wantOperationApi(params: any) {
    return fetch('http://localhost:3666/wantMsg', 'post', params);
}