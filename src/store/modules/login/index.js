import {$axLogin} from '@/_axios/api/login.js'
import router from "@/routes";

export default {
    namespaced: true,
    state: {
        userInfo:function () {
            let userInfo = localStorage.getItem('userInfo');
            if(!userInfo){
                return {}
            }else{
                return JSON.parse(userInfo);
            }
        }()
    },
    mutations:{
        loginOut(state){
            localStorage.removeItem('userInfo');
            state.userInfo = {};
            router.replace('/login');
        }
    },
    actions: {
        sendLogin({state},data){
            return $axLogin(data).then(res=>{
                state.userInfo = res.user;
                localStorage.setItem('userInfo',JSON.stringify(res.data));
                return res;
            })
        }
    }
}