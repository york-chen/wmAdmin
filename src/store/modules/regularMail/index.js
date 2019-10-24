import {$axGetList,$axCreate,$axEdit,$axQueryDetail} from '@/_axios/api/regularMail'
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
        },
        sendCreate(store,data){
            return $axCreate(data);
        },
        sendEdit(store,data){
            return $axEdit(data)
        },
        sendQueryDetail(store,data){
            return $axQueryDetail(data)
        }
    }
}