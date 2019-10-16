import axios from '@/_axios'

export const $axLogin = params => {
    return axios({
        method: 'post',
        url: '/user/login'
    }, params)
};
export const $axGetUserInfo = params => {
    return axios({
        method: 'get',
        url: '/user'
    }, params)
};