import axios from '@/_axios'

export const $axQueryScore = params => {
    return axios({
        method: 'get',
        url: '/credit/score'
    }, params)
};