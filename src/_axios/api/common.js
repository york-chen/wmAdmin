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