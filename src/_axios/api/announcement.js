import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/api/notice/list'
    }, params)
};