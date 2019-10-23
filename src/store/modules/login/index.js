import {$axLogin,$axLogout} from '@/_axios/api/login'
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
    actions: {
        sendLogin({state},data){
            return $axLogin(data).then(res=>{
                state.userInfo = res;
                localStorage.setItem('userInfo',JSON.stringify(res));
                return res;
            })
        },
        sendLoginout({state}){
            $axLogout().then(()=>{
                localStorage.removeItem('userInfo');
                state.userInfo = {};
                router.replace('/login');
            });
        }
    }
}