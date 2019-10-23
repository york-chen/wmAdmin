import {$axGetList,$axCreateAnnouncement,$axEditAnnouncement,$axQueryAnnouncement} from '@/_axios/api/announcement'
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
        sendCreateAnnouncement({state},data){
            return $axCreateAnnouncement(data)
        },
        sendEditAnnouncement({state},data){
            return $axEditAnnouncement(data)
        },
        sendQueryAnnouncement({state},data){
            return $axQueryAnnouncement(data)
        }
    }
}