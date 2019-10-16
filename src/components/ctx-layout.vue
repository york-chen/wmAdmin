<template>
    <div class="ctx-layout" :style="{backgroundImage:`url(${imgBg})`}">
        <div class="ctx-layout-head">
            <div class="head-wrap">
                <div class="head-left">
                    <span class="m-blank"></span>
                    <img @click="goToHome" class="img-logo" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/logo.png" alt="">
                </div>
                <div class="head-right clearfix">
                    <div class="common-btn-wrap" v-if="!isLoginPage&&token">
                        <el-button v-if="isAdmin" @click="jumpToManage" type="text"> <span class="iconfont icontouxiang"></span>管理员</el-button>
                        <el-button v-else type="text"> <span class="iconfont icontouxiang"></span>{{userInfo.username}}</el-button>
                        <el-button @click="loginout" type="text">[退出]</el-button>
                    </div>
                    <div class="verify-btn-wrap">
                        <slot name="head"></slot>
                    </div>
                </div>
            </div>
        </div>
        <div class="ctx-layout-body">
            <slot name="body"></slot>
        </div>
    </div>
</template>

<script>
    import {logout} from "@/routes";
    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('login');

    export default {
        props:{
          'imgBg':{
              type:String,
              default:'https://oss-cn-beijing.aliyuncs.com/common/images/cxt/home-bg.jpg'
           }
        },
        name: "ctx-layout",
        computed:{
          ...mapState({
              isAdmin:state=>state.userInfo.isAdmin,
              token:'token',
              userInfo:'userInfo'
          }),
            isLoginPage(){
              return this.$route.path === '/login'
          }
        },
        methods:{
            goToHome(){
                this.$router.push('/')
            },
            jumpToManage(){
                this.$router.push('/admin')
            },
            loginout(){
                logout()
            }
        }
    }
</script>

<style type="text/scss" lang="scss" scoped>
.ctx-layout{
    height: 100%;
    display: flex;
    flex-direction: column;
    background-size: cover;
    background-repeat: no-repeat;
    .ctx-layout-head{
        height: 86px;
        .head-wrap{
            width: 1100px;
            height: 100%;
            margin: 0 auto;
            display: flex;
            flex-direction: row;
        }
    }
    .img-logo{
        width: 146px;
        height: 47px;
        vertical-align: middle;
        cursor: pointer;
    }
    .head-left{
        flex: 1;
        height: 100%;
    }
    .head-right{
        flex: 2;
        height: 100%;
        .verify-btn-wrap{
            float: right;
            margin-right: 20px;
        }
    }
    .common-btn-wrap{
        float: right;
        line-height: 86px;
        button{
            color: #fff;
            font-weight: 400;
        }
        .icontouxiang{
            position: relative;
            top: 1px;
            margin-right: 3px;
        }
    }
    .ctx-layout-body{
        flex: 1;
        overflow: auto;
    }
}
</style>