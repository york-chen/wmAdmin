import axios from '@/_axios'

export const $axGetVerifyCode = params => {
    return axios({
        method: 'get',
        url: '/captcha'
    }, params)
};
export const $axCompanySearch = params => {
    return axios({
        method: 'get',
        url: '/company/search'
    }, params)
};