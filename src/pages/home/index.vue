<template>
    <CtxLayout :imgBg="imgBg">
        <div slot="head" class="btn-wrap">
                <el-button v-if="!token" @click="handleLogin" type="primary" round class="btn-login">登录</el-button>
        </div>
        <div slot="body" class="wrap-bg">
            <div class="content">
                <div class="title">
                    <img class="img-banner" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/logo-big.png" alt="">
                </div>
                <div class="btn-group">
                    <el-button @click="changeMode('personalScore')" :class="curMode==='personalScore'?'active':''" class="cxt-btn-simple">个人信用分</el-button>
                    <el-button @click="changeMode('compScore')" :class="curMode==='compScore'?'active':''" class="cxt-btn-simple">企业信用分</el-button>
                    <el-button @click="changeMode('compReport')" :class="curMode==='compReport'?'active':''" class="cxt-btn-simple">企业信用报告</el-button>
                    <el-button @click="jumpToBusiness" :class="curMode==='business'?'active':''" class="cxt-btn-simple">政务业务事项</el-button>
                </div>
                <div class="search-wrap home-search">
                    <el-autocomplete
                            value-key="name"
                            class="search-input"
                            v-model="name"
                            :fetch-suggestions="querySearch"
                            :placeholder="curMode == 'personalScore' ? '输入个人身份证号' : '输入企业名称/社会代码等等'"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                    >
                        <el-button @click="queryData" class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
                    </el-autocomplete>
                </div>
            </div>
        </div>
    </CtxLayout>
</template>
<script>
    import CtxLayout from '@/components/ctx-layout'
    import {$axCompanySearch} from '@/_axios/api/common'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState,mapMutations} = createNamespacedHelpers('login');
    export default {
        components:{CtxLayout},
        data(){
          return {
              imgBg:'https://oss-cn-beijing.aliyuncs.com/common/images/cxt/home-bg.jpg',
              curMode:'personalScore',
              name:''
          }
        },
        computed:{
          ...mapState({
              token:'token'
          })
        },
        methods:{
            ...mapMutations({
                setShowLoginDialog:'setShowLoginDialog'
            }),
            handleLogin(){
                this.$router.push('/login')
            },
            jumpToBusiness(){
                this.$router.push('/business')
            },
            changeMode(mode){
                this.curMode = mode;
            },
            handleSelect(item) {
                this.name = item.name;
            },
            querySearch(queryString, cb) {
                if(!queryString){
                    return;
                }
                $axCompanySearch({name:queryString}).then(res=>{
                    cb(res.items);
                });
            },
            queryData(){
                let mode = this.curMode,name = this.name;
                //判断是否输入了企业名称
                if(!name){
                    this.$message.info('请输入企业名称');
                    return;
                }
                //首先判断用户是否登录了,如果没有登录的话,需要跳转到登录页面进行登录
                if(!this.token){
                    this.setShowLoginDialog(true);
                    return;
                }
                if(mode === 'compScore'){
                    this.$router.push(`/creditScore/${name}`);
                }
                else if (mode == 'personalScore') {
                    this.$router.push(`/personalScore/${name}`);
                } else if(mode === 'compReport'){
                    this.$router.push(`/creditReport/${name}`);
                }
            }
        }
    }
</script>
<style lang="scss" type="text/scss" scoped>
    .img-banner{
        height: 135px;
    }
    .btn-wrap{
        text-align: right;
        line-height: 86px;
        .btn-login{
            background-color: transparent !important;
            color: #436FFF !important;
        }
    }
    .wrap-bg{
        height: 100%;
        overflow: auto;
        position: relative;
        .cxt-btn-simple{
            background-color: transparent;
            color: #fff;
            border: none;
            outline: none;
            margin-right: 63px;
            &.active{
                border: #436FFF;
                background-color: #436FFF;
                color: #F4F4F4;
            }
        }
        .content{
            width: 910px;
            text-align: center;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -80%);
            .title{
                font-size:60px;
                font-weight:500;
                color:rgba(255,255,255,1);
                line-height:84px;
                letter-spacing:6px;
                text-shadow:0px 2px 2px rgba(0,0,0,0.1);
            }
            .btn-group{
                margin-top: 70px;
            }
            .search-wrap{
                margin-top: 35px;
            }
            .el-autocomplete{
                display: block;
            }
            .search-btn{
                background-color: #436FFF;
                color: #fff;
                border:#436FFF;
                width: 196px;
                border-radius:0px 25px 25px 0px;
            }
        }
    }
</style>
<style lang="scss" type="text/scss">
    .home-search .el-input-group__append{
        background-color: transparent;
        border: none;
    }
    .home-search input{
        border-radius:25px 0px 0px 25px;
    }
    .home-search .search-btn{
        padding-top: 13px;
        padding-bottom: 13px;
    }
</style>