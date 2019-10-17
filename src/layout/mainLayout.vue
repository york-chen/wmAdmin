<template>
    <div class="admin-layout">
        <section class="top clearfix">
            <div class="logo-wrap">
                <span class="m-blank"></span>
                <img class="img-logo" src="../assets/images/logo-wm.png" alt="">
            </div>
            <div class="user-info">
                <el-button type="text">
                    <i class="iconfont icontouxiang">管理员</i>
                </el-button>
                <el-button @click="loginOut" type="text">[退出]</el-button>
            </div>
        </section>
        <section class="body">
            <div class="left">
                <el-menu
                        router
                        :default-active="defaultRouter"
                        class="menu-bar"
                        background-color="#42485b"
                        text-color="#fff"
                        active-text-color="#fff">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="iconfont icon-xiaoxi"></i>
                            <span>公告及消息管理</span>
                        </template>
                        <el-menu-item index="/announcement">
                            <i class="iconfont icon-gonggao"></i>
                            <span slot="title">公告发布</span>
                        </el-menu-item>
                        <el-menu-item index="/versionDescription">
                            <i class="iconfont icon-banben"></i>
                            <span slot="title">版本描述</span>
                        </el-menu-item>
                        <el-menu-item index="/maintenanceNotice">
                            <i class="iconfont icon-weihu"></i>
                            <span slot="title">维护预告</span>
                        </el-menu-item>
                        <el-menu-item index="/stopServiceTips">
                            <i class="iconfont icon-tingzhi"></i>
                            <span slot="title">停服提示</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="2">
                        <template slot="title">
                            <i class="iconfont icon-drxx65"></i>
                            <span>邮件管理</span>
                        </template>
                        <el-menu-item index="/regularMail">
                            <i class="iconfont icon-youjian"></i>
                            <span slot="title">常规邮件/补偿</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-submenu index="3">
                        <template slot="title">
                            <i class="iconfont icon-shangcheng"></i>
                            <span>商城管理</span>
                        </template>
                        <el-menu-item index="/limitedMallAdManage">
                            <i class="iconfont icon-guanggaogongguan"></i>
                            <span slot="title">限时商城广告管理</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </div>
            <div class="right">
                <router-view></router-view>
            </div>
        </section>
    </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'
    const {mapState,mapMutations} = createNamespacedHelpers('login');
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
            ...mapMutations({
                loginOut:'loginOut'
            }),
            loginOut(){
                this.loginOut();
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .admin-layout{
        display: flex;
        flex-direction: column;
        height: 100%;
        background: url("../assets/images/bg.jpg") no-repeat;
        background-size: cover;
        .top{
            height: 102px;
            line-height: 102px;
            background-color: #3c8dbc;
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
                width: 200px;
                height: 100%;
                background-color: #42485b;
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
        background-color: #3c8dbc !important;
    }
</style>