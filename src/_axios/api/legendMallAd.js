import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/list'
    }, params)
};

export const $axCreate = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/create',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axEdit = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/update',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axQueryDetail = params => {
    return axios({
        method: 'post',
        url: '/legendshopplan/get'
    }, params)
};