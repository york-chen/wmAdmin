import axios from '@/_axios'
export const $axGetAreas = params => {
    return axios({
        method: 'post',
        url: '/area/search'
    }, params)
};

export const $axGetLanguages = params => {
    return axios({
        method: 'post',
        url: '/lang/search'
    }, params)
};

export const $axSubmitApproval = params => {
    return axios({
        method: 'post',
        url: '/audit/resubmit'
    }, params)
};

export const $axPublish = params => {
    return axios({
        method: 'post',
        url: '/audit/push'
    }, params)
};

export const $axCancel = params => {
    return axios({
        method: 'post',
        url: '/audit/cancel'
    }, params)
};

export const $axRepublish = params => {
    return axios({
        method: 'post',
        url: '/audit/repush'
    }, params)
};

export const $axDelay = params => {
    return axios({
        method: 'post',
        url: '/audit/delay'
    }, params)
};

