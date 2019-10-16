import axios from '@/_axios'

export const $axGetRecordList = params => {
    return axios({
        method: 'get',
        url: '/admin/query_histories'
    }, params)
};
export const $axUpdateRecord = params => {
    let id = params.id;
    delete params.id;
    return axios({
        method: 'put',
        url: '/admin/query_history/'+id
    }, params)
};
export const $axDeleteRecord = params => {
    let id = params.id;
    delete params.id;
    return axios({
        method: 'delete',
        url: `/admin/query_history/${id}`
    }, params)
};


//   admin.get('/query_histories', controller.admin.queryHistory.index);
//   admin.post('/query_history/:id', controller.admin.queryHistory.update);
//   admin.delete('/query_history/:id', controller.admin.queryHistory.delete);