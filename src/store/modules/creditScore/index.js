import {$axQueryScore} from '@/_axios/api/creditScore.js'

export default {
    namespaced: true,
    state: {
        company:{},
        report:{}
    },
    actions: {
        sendQueryScore({state},data){
            return $axQueryScore(data).then(res=>{
                state.report = res.report;
                state.company = res.company
                return res;
            })
        }
    }
}