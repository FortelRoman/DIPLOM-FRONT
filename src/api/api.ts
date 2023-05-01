import axios from 'axios';

const $api = axios.create({
    // withCredentials: true,
    baseURL: 'http://localhost:4000',
});

$api.defaults.headers.get['Accept'] = 'application/json';
$api.defaults.headers.post['Accept'] = 'application/json';
$api.defaults.headers.post['Content-Type'] = 'application/json';

$api.interceptors.request.use(function (config) {
    let token = localStorage.getItem("access_token");
    if (token) {
        config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
});

$api.interceptors.response.use((response) => response, (error) => {
    if (error.response.status === 401 && window.location.pathname !== '/auth/login') {
        window.location.replace('/auth/login');
    }

    return Promise.reject(error);
});


export default $api;
