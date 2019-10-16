<template>
    <div class="admin-layout">
        <section class="top clearfix">
            <div class="logo-wrap">
                <span class="m-blank"></span>
                <img @click="jumoToHome" class="img-logo" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/logo.png" alt="">
            </div>
            <div class="user-info">
                <el-button type="text">
                    <i class="iconfont icontouxiang">管理员</i>
                </el-button>
                <el-button @click="loginout" type="text">[退出]</el-button>
            </div>
        </section>
        <section class="body">
            <div class="left">
                <el-menu
                        router
                        :default-active="defaultRouter"
                        class="menu-bar"
                        background-color="#1D274D"
                        text-color="#fff"
                        active-text-color="#fff">
                    <el-menu-item index="/admin/account">
                        <span slot="title">账号管理</span>
                    </el-menu-item>
                    <el-menu-item index="/admin/record">
                        <span slot="title">记录查询</span>
                    </el-menu-item>
                </el-menu>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import {logout} from "@/routes";
    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('login');
    export default {
        name: "adminLayout",
        computed:{
            ...mapState({
                userInfo:'userInfo'
            }),
            defaultRouter(){
                return this.$route.path;
            }
        },
        methods:{
            jumoToHome(){
                this.$router.push('/')
            },
            loginout(){
                logout();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
.admin-layout{
    display: flex;
    flex-direction: column;
    height: 100%;
    .top{
        height: 102px;
        line-height: 102px;
        background: url("https://oss-cn-beijing.aliyuncs.com/common/images/cxt/banner.png") no-repeat;
        background-size: 100% 106%;
        padding: 0 50px;
        color: #fff;
        .logo-wrap{
            float: left;
            height: 102px;
        }
        .pro-name{
            font-size:30px;
            font-weight:normal;
            color:rgba(255,255,255,1);
            margin-left: 30px;
        }
        .iconfont{
            font-size: 14px;
        }
    }
    .user-info{
        float: right;
        color: #fff;
        button{
            font-size: 14px;
            color: #fff;
        }
    }
    .img-logo{
        width: 146px;
        height: 47px;
        vertical-align: middle;
        cursor: pointer;
    }
    .body{
        flex: 1;
        display: flex;
        flex-direction: row;
        .left{
            width: 160px;
            height: 100%;
            background-color: #1D274D;
            margin-top: -1px;
        }
        .right{
            flex: 1;
            overflow: auto;
            padding: 20px 50px;
        }
    }
}
.menu-bar{
    text-align: center;
}
.el-menu{
    border-right: none;
}
.el-menu-item.is-active{
    background-color: #3762fb !important;
}
</style>