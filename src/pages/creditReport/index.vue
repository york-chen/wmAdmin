<template>
    <CtxLayout>
        <div slot="head" class="btn-wrap">
            <span class="m-blank"></span>
            <div class="btn-item active">企业信用报告</div>
            <div @click="jumpToScore" class="btn-item">企业信用评分</div>
        </div>
        <div slot="body" class="wrap-bg">
            <div class="content">
                <div class="search-wrap credit-search">
                    <div class="title">信用报告查询</div>
                    <div class="input-wrap">
                        <el-autocomplete
                                value-key="name"
                                class="search-input"
                                v-model="name"
                                :fetch-suggestions="querySearch"
                                placeholder="输入企业名称/社会代码等等"
                                :trigger-on-focus="false"
                                @select="handleSelect"
                        >
                            <el-button @click="queryData" class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
                        </el-autocomplete>
                    </div>
                </div>
            </div>
            <div class="report-wrap">
                <CreditReport ref="creditReport" :name="name"></CreditReport>
            </div>
        </div>
    </CtxLayout>
</template>

<script>
    import {$axCompanySearch} from '@/_axios/api/common'
    import CtxLayout from '@/components/ctx-layout'
    import CreditReport from '@/components/creditReport/index.vue'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('creditReport');
    export default {
        components: {CtxLayout,CreditReport},
        data(){
            return {
                name:this.$route.params.name
            }
        },
        methods:{
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
                if(!this.name){
                    this.$message.info('请输入企业名称');
                    return
                }
                let name = this.$route.params.name;
                if(name !== this.name){
                    this.$router.push(`/creditReport/${this.name}`);
                }
                this.$refs['creditReport'].loadData()
            },
            jumpToScore(){
                this.$router.push(`/creditScore/${this.name}`)
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .btn-wrap{
        height: 86px;
        .btn-item{
            display: inline-block;
            vertical-align: middle;
            font-size:18px;
            color:#fff;
            padding: 10px 34px;
            border-radius: 25px;
            cursor: pointer;
            &.active{
                background-color: #436FFF;
            }
        }
    }
    .wrap-bg{
        height: 100%;
        overflow: auto;
        position: relative;
        .content{
            width: 1040px;
            background-color: #ffffff;
            margin: 24px auto 10px;
            padding: 30px 80px;
            .search-wrap{
                border-bottom: 1px solid #E5E5E5;
            }
            .input-wrap{
                width: 700px;
                margin: 30px auto 53px;
            }
            .el-autocomplete{
                display: block;
            }
            .search-btn{
                background-color: #436FFF;
                color: #fff;
                border:#436FFF;
                width: 160px;
                border-radius:0;
            }
            .title{
                font-size:16px;
                font-weight:700;
                color:#333333;
                &:before{
                    content: '|';
                    background-color: #436FFF;
                    width: 100px;
                    height: 100px;
                    margin-right: 4px;
                }
            }
        }
    }
</style>