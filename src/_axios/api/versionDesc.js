import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/verdesc/list'
    }, params)
};

export const $axCreate = params => {
    return axios({
        method: 'post',
        url: '/verdesc/create',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axEdit = params => {
    return axios({
        method: 'post',
        url: '/verdesc/update',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axQueryDetail = params => {
    return axios({
        method: 'post',
        url: '/verdesc/get'
    }, params)
};