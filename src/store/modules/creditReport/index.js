import {$axQueryCreditReport} from '@/_axios/api/creditReport.js'

export default {
    namespaced: true,
    state: {
        detail:{}
    },
    actions: {
        sendQueryCreditReport({state},data){
            return $axQueryCreditReport(data).then(res=>{
                state.detail = res;
                return res;
            })
        }
    }
}