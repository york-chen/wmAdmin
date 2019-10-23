import {$axGetList} from '@/_axios/api/announcement'
export default {
    namespaced: true,
    state: {
        list:[]
    },
    actions: {
        sendGetList({state},data){
            return $axGetList(data).then(res=>{
                state.list = res.datas;
                return res
            })
        }
    }
}