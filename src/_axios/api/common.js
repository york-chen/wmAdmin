import axios from '@/_axios'

export const $axUploadImg = params => {
    return axios({
        method: 'post',
        url: '/upload',
        headers:{
            'Content-Type': 'multipart/form-data'
        }
    }, params)
};