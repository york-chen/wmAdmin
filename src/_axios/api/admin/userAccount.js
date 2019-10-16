import axios from '@/_axios'

export const $axGetUserAccountList = params => {
    return axios({
        method: 'get',
        url: '/admin/users'
    }, params)
};
export const $axRegisteUser = params => {
    return axios({
        method: 'post',
        url: '/admin/user/register'
    }, params)
};
export const $axUpdateUser = params => {
    let id = params.id;
    delete params.id;
    return axios({
        method: 'put',
        url: `/admin/user/${id}`
    }, params)
};
export const $axDeleteUser = params => {
    let id = params.id;
    delete params.id;
    return axios({
        method: 'delete',
        url: `/admin/user/${id}`
    }, params)
};