import axios from '@/_axios'

export const $axQueryCreditReport = params => {
    return axios({
        method: 'get',
        url: '/credit/report'
    }, params)
};