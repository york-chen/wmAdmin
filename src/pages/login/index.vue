<template>
    <div class="wrap-bg">
        <div class="login-main">
            <img class="img-banner" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/logo-big.png" alt="">
            <login-form @loginSuccess="loginSuc"/>
        </div>
    </div>
</template>
<script>
    import loginForm from '@/components/loginForm'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('login');
    export default {
        components:{loginForm},
        data(){
            return {
                loginForm:{
                    username:'',
                    password:'',
                    captcha:''
                },
                formRules : {
                    username: [{required: true, message: '请输入用户名', trigger: 'blur'},],
                    password: [{required: true, message: '请输入密码', trigger: 'blur'}],
                    captcha: [{required: true, message: '请输入验证码', trigger: 'blur'}]
                }
            }
        },
        computed:{
            ...mapState({
                userInfo:'userInfo'
            })
        },
        methods:{
            loginSuc(){
                if(this.userInfo.isAdmin){
                    this.$router.push('/admin')
                }else {
                    this.$router.push('/')
                }
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .wrap-bg{
        height: 100%;
        overflow: auto;
        background: url("https://oss-cn-beijing.aliyuncs.com/common/images/cxt/login-bg.png") no-repeat;
        background-size: cover;
        position: relative;
    }
    .login-main{
        text-align: center;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        .img-banner{
            height: 135px;
        }
        .login-wrap{
            margin-top: 50px;
        }
    }
</style>