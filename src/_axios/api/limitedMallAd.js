import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/list'
    }, params)
};

export const $axCreate = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/create',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axEdit = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/update',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axQueryDetail = params => {
    return axios({
        method: 'post',
        url: '/fixtimeshopplan/get'
    }, params)
};