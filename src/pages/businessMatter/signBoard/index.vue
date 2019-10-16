<template>
    <div class="content">
        <div class="search-wrap credit-search">
            <div class="title">招牌事项数据查询</div>
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
                    <el-button class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
                </el-autocomplete>
            </div>
        </div>
        <div class="result-wrap">
            <div class="r-title">查询结果</div>
            <table cellspacing="0" class="cxt-table">
                <tr>
                    <td colspan="4" class="cxt-cell">企业名称</td>
                    <td colspan="7">中青信用管理有限公司</td>
                </tr>
                <tr>
                    <td colspan="4" class="cxt-cell">招牌设置验收结果</td>
                    <td colspan="6" class="good">通过</td>
                    <td width="120" class="t-c good">
                        +10分
                    </td>
                </tr>
                <tr>
                    <td colspan="10" class="cxt-cell t-c">环境行政处罚</td>
                    <td rowspan="3">-20分</td>
                </tr>
                <tr>
                    <td width="100">序号</td>
                    <td width="200">行政处罚对象</td>
                    <td width="150">立案日期</td>
                    <td width="100">立案号</td>
                    <td width="200">决定下达日期</td>
                    <td width="150">决定书文号</td>
                    <td width="200">主要违法行为</td>
                    <td width="200">行政处罚依据</td>
                    <td width="200">行政处罚内容</td>
                    <td width="100">备注</td>
                </tr>
                <tr class="table-main">
                    <td>1</td>
                    <td>中青信用管理有限公司</td>
                    <td>2018-11-2</td>
                    <td>成高环城立字(2018)06061号</td>
                    <td>2019-1-22</td>
                    <td>成高环城罚字(2019)06002号</td>
                    <td>1.建设项目的环境影响评价文件未经批准，擅自开工建设； 2.需配套建设的环境保护设施未经验收，建设项目即投入使用 。</td>
                    <td>《中华人民共和国环境影响评价法》第三十一条第一款、《建设项目环境保护管理条例》第二十三条第一款</td>
                    <td>罚款258000元</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="cxt-cell" colspan="4">城管执法大队的行政处罚</td>
                    <td colspan="6">无处罚</td>
                    <td></td>
                </tr>
                <tr>
                    <td class="cxt-cell" colspan="4">所在物管公司有无招牌预管理办法</td>
                    <td colspan="6">有</td>
                    <td class="good">+10分</td>
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
        .table-main{
            line-height: 21px;
            font-size: 12px;
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