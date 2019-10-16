<template>
    <el-form :model="loginForm" :rules="formRules" ref="loginForm" label-width="0px" class="login-wrap">
        <el-form-item label="">
            <div class="login-title" :class="titleColor">守信通账号登录</div>
        </el-form-item>
        <el-form-item label="" prop="username">
            <el-input
                    placeholder="请输入用户名"
                    prefix-icon="iconfont icontouxiang"
                    v-model="loginForm.username">
            </el-input>
        </el-form-item>
        <el-form-item label="" prop="password">
            <el-input
                    type="password"
                    placeholder="请输入密码"
                    prefix-icon="iconfont iconmima"
                    v-model="loginForm.password">
            </el-input>
        </el-form-item>
        <el-form-item label="">
            <el-col :span="15">
                <el-form-item prop="captcha">
                    <el-input
                            placeholder="请输入计算结果"
                            prefix-icon="iconfont iconyanzhengma"
                            v-model="loginForm.captcha">
                    </el-input>
                </el-form-item>
            </el-col>
            <el-col class="line" :span="2">&nbsp;</el-col>
            <el-col :span="7">
                <el-form-item>
                    <picture-verifier :width="104" :height="40" ref="picVer" />
                </el-form-item>
            </el-col>
        </el-form-item>
        <el-form-item label="">
            <asyncButton label="登录" @_click="handleClick" class="login-action" type="primary" round></asyncButton>
        </el-form-item>
    </el-form>
</template>

<script>
    import asyncButton from '@/components/asyncButton'
    import pictureVerifier from '@/components/PictureVerifier'
    import {createNamespacedHelpers} from 'vuex'

    const {mapActions} = createNamespacedHelpers('login');
    export default {
        components:{pictureVerifier,asyncButton},
        name:'login',
        props:{
          titleColor:{
              type:String,
              default:'color-white'
          }
        },
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
        methods:{
            ...mapActions({
                sendLogin:'sendLogin'
            }),
            handleClick(promise){
                this.$refs['loginForm'].validate((valid) => {
                    if (valid) {
                        promise(this.sendLogin(this.loginForm).then(res=>{
                            this.$emit('loginSuccess')
                        }).catch(()=>{
                            this.$refs['picVer'].loadPicVer();
                            this.loginForm.captcha = '';
                        }));
                    }
                });
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
    .login-wrap{
        width: 356px;
        text-align: center;
        margin: 0 auto;
        .img-code{
            width: 100%;
            height: 40px;
        }
        .login-title{
            font-size:26px;
            font-weight:400;
        }
        .login-action{
            width: 100%;
        }
    }
    .color-black{
        color: #000;
    }
    .color-white{
        color:#fff;
    }
</style>