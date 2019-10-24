import axios from '@/_axios'

export const $axGetList = params => {
    return axios({
        method: 'post',
        url: '/notice/list'
    }, params)
};

export const $axCreateAnnouncement = params => {
    return axios({
        method: 'post',
        url: '/notice/create',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axEditAnnouncement = params => {
    return axios({
        method: 'post',
        url: '/notice/update',
        headers:{
            'Content-Type':'application/json'
        }
    }, params)
};

export const $axQueryAnnouncement = params => {
    return axios({
        method: 'post',
        url: '/notice/get'
    }, params)
};