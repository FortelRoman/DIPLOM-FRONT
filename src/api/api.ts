import axios from 'axios';

const $api = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:4000',
});

$api.defaults.headers.get['Accept'] = 'application/json';
$api.defaults.headers.post['Accept'] = 'application/json';
$api.defaults.headers.post['Content-Type'] = 'application/json';
export default $api;
