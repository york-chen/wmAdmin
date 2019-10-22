import axios from '@/_axios'

export const $axLogin = params => {
    return axios({
        method: 'post',
        url: '/login'
    }, params)
};