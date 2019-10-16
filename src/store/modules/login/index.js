import {$axLogin,$axGetUserInfo} from '@/_axios/api/login.js'
import {addDynamicRoutes} from '@/routes'

export default {
    namespaced: true,
    state: {
        userInfo:{},
        token:window.localStorage.token,
        showLoginDialog:false
    },
    mutations:{
        setShowLoginDialog(state,status){
            state.showLoginDialog = status;
        }
    },
    actions: {
        sendLogin({state},data){
            return $axLogin(data).then(res=>{
                state.userInfo = res.user;
                localStorage.setItem('token',res.token);
                state.token = res.token;
                addDynamicRoutes();
                return res;
            })
        },
        sendGetCurUser({state}){
            if(state.token){
                return $axGetUserInfo().then(res=>{
                    state.userInfo = res;
                    return res;
                })
            }else{
                return  Promise.resolve();
            }
        }
    }
}