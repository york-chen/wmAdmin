<template>
    <div class="content">
        <div class="search-wrap credit-search">
            <div class="title">取水事项数据查询</div>
            <div class="input-wrap">
                <el-autocomplete
                        value-key="name"
                        class="search-input"
                        v-model="name"
                        :fetch-suggestions="querySearch"
                        placeholder="输入企业名称/社会代码等等"
                        :trigger-on-focus="false"
                        @select="handleSelect">
                    <el-button class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
                </el-autocomplete>
            </div>
        </div>
        <div class="result-wrap">
            <div class="title">查询结果</div>
            <table cellspacing="0" class="cxt-table">
                <tr>
                    <td class="cxt-cell" width="20%">企业名称</td>
                    <td colspan="2">北京人寿保险股份有限公司北京分公司</td>
                </tr>
                <tr>
                    <td class="cxt-cell">是否按时缴纳水费</td>
                    <td class="good" width="700">是</td>
                    <td class="t-c good">
                       +10分
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
    import {$axCompanySearch} from '@/_axios/api/common'
    export default {
        data(){
            return {
                name:''
            }
        },
        methods:{
            handleSelect(item){
                this.name = item.name;
            },
            querySearch(queryString, cb) {
                if(!queryString){
                    return;
                }
                $axCompanySearch({name:queryString}).then(res=>{
                    cb(res.items);
                });
            }
        }
    }
</script>

<style lang="scss" type="text/scss" scoped>
    .btn-wrap{
        height: 86px;
        .btn-item{
            display: inline-block;
            font-size:18px;
            color:#fff;
            padding: 10px 34px;
            border-radius: 25px;
            cursor: pointer;
            vertical-align: middle;
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
            margin: 24px auto;
            padding: 30px 80px;
            .el-autocomplete{
                display: block;
            }
            .search-wrap{
                border-bottom: 1px solid #E5E5E5;
            }
            .input-wrap{
                width: 700px;
                margin: 30px auto 53px;
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
            .result-wrap{
                margin-top: 30px;

            }
            .cxt-table{
                width: 100%;
                margin-top: 15px;
                font-size: 13px;
                line-height: 40px;
                border-right: 1px solid rgb(238, 238, 238);
                border-bottom: 1px solid rgb(238, 238, 238);
                td{
                    padding-left: 15px;
                    border-left: 1px solid rgb(238, 238, 238);
                    border-top: 1px solid rgb(238, 238, 238);
                }
            }
            .cxt-cell{
                background-color: #f5f7fa;
            }
        }
    }
.good{
    color: #75BE6A;
}
</style>
<style lang="scss" type="text/scss">
    .credit-search .el-input-group__append{
        background-color: transparent;
        border: none;
    }
    .credit-search input{
        border-radius:0;
    }
    .credit-search .search-btn{
        padding-top: 13px;
        padding-bottom: 13px;
    }
</style>