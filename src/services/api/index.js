import axios from "axios";
import {get} from "lodash";
import NProgress from "nprogress";
import storage from "../storage";
import config from "../../config";


NProgress.configure({
    showSpinner: true,
    trickleRate: 0.02,
    trickleSpeed: 400,
    easing: "ease",
    speed: 200
});

const request = axios.create({
    baseURL: config.API_ROOT,
    params: {},
});

request.interceptors.request.use((config) => {
    NProgress.inc();
    const token = get(JSON.parse(storage.get('settings')), 'state.token', null);
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
    }
    return config;
}, (error) => {
    NProgress.done(true);
    console.log(error)
});

request.interceptors.response.use((response) => {
    NProgress.done(true);
    return response;
}, (error) => {
    const statusCode = error.response.status;
    if (statusCode == 401) {
        window.localStorage.clear();
    }

    NProgress.done(true);
    return Promise.reject(error);
});

export {request};