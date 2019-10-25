import {$axGetAreas,$axGetLanguages,$axSubmitApproval,$axPublish,
    $axCancel,$axRepublish,$axDelay} from '@/_axios/api/common'
export default {
    namespaced: true,
    state: {
        areaList:[],
        languageList:[]
    },
    actions: {
        sendGetAreas({state}){
            return $axGetAreas().then(res=>{
                state.areaList = res.datas;
                return res.datas
            })
        },
        sendGetLanguages({state}){
            return $axGetLanguages().then(res=>{
                state.languageList = res.datas;
                return res.datas;
            })
        },
        sendSubmitApproval(store,data){
            return $axSubmitApproval(data);
        },
        sendPublishl(store,data){
            return $axPublish(data);
        },
        sendCancel(store,data){
            return $axCancel(data);
        },
        sendRepublish(store,data){
            return $axRepublish(data);
        },
        sendDelay(store,data){
            return $axDelay(data);
        }
    }
}