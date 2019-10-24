import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/list'
    }, params)
};

export const $axCreate = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/create',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axEdit = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/update',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axQueryDetail = params => {
    return axios({
        method: 'post',
        url: '/maintnotice/get'
    }, params)
};