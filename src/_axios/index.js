import Vue from "vue";
import axios from 'axios'
import vueAxios from 'vue-axios'
import {Message} from "element-ui";
import qs from 'qs'

Vue.use(vueAxios, axios);

axios.interceptors.request.use(
    config => {
        return config
    },
    error => {
        Message.error('网络请求失败');
        return Promise.error(error)
    }
);

axios.interceptors.response.use(
    response => {
        if (response.data && typeof response.data === 'object' && response.data.code !== 200) {
            Message.error(response.data.message || '抱歉，服务器出现未知的错误');
            return Promise.reject(response);
        }
        return response.data.data || response.data;
    },
    error => {
        // status === 401、403, 无登录权限，需登录，跳转登录页面
        if (error.response.status === 401 || error.response.status === 403) {
            Message.error('登录过期，请重新登录');
            window.history.replaceState(null, null, '/login')
        } else if (error.response.status === 404) {
            Message.error('服务器搬家啦')
        } else if (error.response.status === 500) {
            Message.error('后台程序出错了，请联系管理员')
        } else if (error.response.status === 502) {
            Message.error('服务器无响应，请稍后再试')
        } else if (error.response.status === 504) {
            Message.error('服务器响应超时，请稍后再试')
        }
        Message.error('抱歉，服务器出现未知的错误');
        return Promise.reject(error)
    }
);

const timeout = 60 * 1000;
const httpServer = (opts, data) => {
    // 设置默认headers
    let headers = {
        'Content-Type': 'application/json',
        Authorization:'Bearer '+ window.localStorage.getItem('token')
    };
    // http默认配置
    let httpDefaultOpts = {
        method: opts.method, // 必填
        url: `/cxtapi${opts.url}`, // 必填
        timeout: timeout,
        headers: Object.assign(headers, opts.headers)
    };
    let params = data || {};
    if (httpDefaultOpts.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        params = qs.stringify(params);
    }
    if (opts.method === 'get') {
        httpDefaultOpts.params = params;
    } else {
        httpDefaultOpts.data = params;
    }
    return axios(httpDefaultOpts).then(res => {
        return res;
    }).catch((err) => {
        //有特殊状态吗处理的时候再说
        return Promise.reject(err)
    })
};

export default httpServer
