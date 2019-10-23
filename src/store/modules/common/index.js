import {$axGetAreas,$axGetLanguages} from '@/_axios/api/common'
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
        }
    }
}