import {$axGetUserAccountList,$axRegisteUser,$axUpdateUser,$axDeleteUser} from '@/_axios/api/admin/userAccount.js'

export default {
    namespaced: true,
    state: {
        list:[],
        targetUser:{}
    },
    mutations:{
        setTargetUser(state,data){
            state.targetUser = data
        }
    },
    actions: {
        sendRegistry(store,data){
            return  $axRegisteUser(data)
        },
        sendGetUserAccountList({state},data){
            return $axGetUserAccountList(data).then(res=>{
                state.list = res.items;
                return res
            })
        },
        sendUpdateUser({state},data){
            return $axUpdateUser(data)
        },
        sendDeleteUser({state},data){
            return $axDeleteUser(data)
        }
    }
}