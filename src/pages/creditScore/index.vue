<template>
    <CtxLayout>
        <div slot="head" class="btn-wrap">
            <span class="m-blank"></span>
            <div @click="jumpToReport" class="btn-item">企业信用报告</div>
            <div class="btn-item active">企业信用评分</div>
        </div>
        <div slot="body" class="wrap-bg">
            <div class="content">
                <div class="search-wrap credit-search">
                    <div class="title">信用分查询</div>
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
                            <el-button @click="handleQueryBtnClick" class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
                        </el-autocomplete>
                    </div>
                </div>
                <div class="result-wrap">
                    <div class="r-title">查询结果</div>
                    <table cellspacing="0" class="cxt-table">
                        <tr>
                            <td class="cxt-cell" width="20%">企业名称</td>
                            <td colspan="3">{{company.ent_name}}</td>
                            <td class="cxt-cell t-c" width="30%">信用分</td>
                        </tr>
                        <tr>
                            <td class="cxt-cell">统一社会信用代码</td>
                            <td colspan="3">{{company.tax_num}}</td>
                            <td height="180" rowspan="3" class="t-c gauge-wrap">
                                <template v-if="report.score">
                                    <span class="m-blank"></span>
                                    <img class="img-gauge" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/gauge.png" alt="">
                                    <div class="gauge-info" :class="levelColor">
                                        <div class="score">{{report.score}}</div>
                                        <div class="level">{{scoreLevel}}</div>
                                        <div class="date">评估时间:{{estimatedTime}}</div>
                                    </div>
                                </template>
                                <template v-if="report.result">
                                    <span class="m-blank"></span>
                                    <img class="img-gauge" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/gauge.png" alt="">
                                    <div class="gauge-info" :class="levelColor">
                                        <div class="score">{{report.text}}</div>
                                        <div class="date">评估时间:{{estimatedTime}}</div>
                                    </div>
                                </template>
                            </td>
                        </tr>
                        <tr>
                            <td class="cxt-cell">公司状态</td>
                            <td width="20%">{{company.ent_status}}</td>
                            <td class="cxt-cell">注册类型</td>
                            <td>{{company.category&&company.category.cate_big}}</td>
                        </tr>
                        <tr>
                            <td class="cxt-cell">法定代表人</td>
                            <td>{{company.legal_name}}</td>
                            <td class="cxt-cell">公司类型</td>
                            <td>{{company.ent_type}}</td>
                        </tr>
                    </table>
                </div>
                <div class="scoreLevel">
                    <div class="table-wrap">
                        <div class="t-title">信用分等级</div>
                        <table class="cxt-table score-table" cellspacing="0">
                            <tr>
                                <td class="cxt-cell">等级</td>
                                <td>较差</td>
                                <td>一般</td>
                                <td>中等</td>
                                <td>良好</td>
                                <td>优秀</td>
                            </tr>
                            <tr>
                                <td class="cxt-cell">信用分</td>
                                <td>350-500</td>
                                <td>500-650</td>
                                <td>650-750</td>
                                <td>750-800</td>
                                <td>800-950</td>
                            </tr>
                        </table>
                    </div>
                    <div class="radar-wrap">
                        <div id="radar"></div>
                    </div>
                </div>
            </div>
        </div>
    </CtxLayout>
</template>

<script>
    import CtxLayout from '@/components/ctx-layout'
    import {$axCompanySearch} from '@/_axios/api/common'
    import {formatDate} from '@/libs/tools'
    import echarts from 'echarts/lib/echarts'
    import 'echarts/lib/chart/radar'
    import {createNamespacedHelpers} from 'vuex'

    const {mapState,mapActions} = createNamespacedHelpers('creditScore');
    export default {
        components: {CtxLayout},
        data(){
          return {
              name:this.$route.params.name
          }
        },
        computed:{
            ...mapState({
                company:'company',
                report:'report'
            }),
            estimatedTime(){
                return formatDate(new Date(),'YMD')
            },
            scoreLevel(){
                const LEVEL = {
                    '250-500': '较差',
                    '500-650': '一般',
                    '650-750': '中等',
                    '750-800': '良好',
                    '800-950': '优秀',
                };
                let score = this.report.score,result = this.report.result;
                if(typeof score !=='undefined'){
                    for (const [ range, lv ] of Object.entries(LEVEL)) {
                        const [ min, max ] = range.split('-');
                        if (parseInt(min) < score && score <= parseInt(max)) {
                            return lv;
                        }
                    }
                }
                if(typeof result !== 'undefined'){
                    return result === 'pass'?'优秀':'较差';
                }
                return score > 950 ? LEVEL['800-950'] : LEVEL['250-500'];
            },
            levelColor(){
                let level = this.scoreLevel;
                const colors = {
                    '较差':'bad',
                    '一般':'good',
                    '中等':'good',
                    '良好':'best',
                    '优秀':'best'
                };
                if(!level)return;
                return colors[level]
            }
        },
        methods:{
            ...mapActions({
                sendQueryScore:'sendQueryScore'
            }),
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
            jumpToReport(){
              this.$router.push(`/creditReport/${this.name}`)
            },
            handleQueryBtnClick(){
                if(!this.name){
                    this.$message.info('请输入企业名称');
                    return
                }
                let name = this.$route.params.name;
                if(name !==this.name){
                    this.$router.push(`/creditScore/${this.name}`)
                }
                this.queryData();
            },
            queryData(){
                this.sendQueryScore({
                    name:this.name
                }).then(res=>{
                    this.drawRadar(res.report.detail)
                })
            },
            drawRadar(detail){
                let radarChart = echarts.init(document.getElementById('radar'))
                radarChart.setOption({
                    radar: {
                        name: {
                            textStyle: {
                                color: '#666',
                                padding: [3, 5]
                            }
                        },
                        indicator: [
                            { name: '基础经营能力', max: 150},
                            { name: '基础经营保障能力', max: 150},
                            { name: '守信经营能力', max: 150},
                            { name: '项目履约能力', max: 150},
                            { name: '基础竞争力', max: 150}
                        ],
                        splitArea : {
                            areaStyle : {
                                color: ["#fff"]  // 图表背景网格的颜色
                            }
                        },
                    },
                    series: [{
                        name: '',
                        type: 'radar',
                        // areaStyle: {normal: {}},
                        data : [
                            {
                                value : [
                                    detail.b1/143*100,
                                    detail.b3/150*100,
                                    detail.b5/328*100,
                                    detail.b4/110*100,
                                    detail.b2/151*100
                                ],
                                name : ''
                            }
                        ]

                    }]
                })
            }
        },
        mounted(){
            this.queryData();
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
            .gauge-wrap{
                position: relative;
                padding: 0 !important;
                line-height: normal;
            }
            .score{
                font-size: 40px;
                margin-top: 10px;
            }
            .level{
                font-size: 20px;
                margin-top: 10px;
            }
            .date{
                color: #a1a6ab;
                font-size: 12px;
                margin-top: 12px;
            }
            .img-gauge{
                vertical-align: middle;
            }
            .gauge-info{
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -30%);
            }
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
            .r-title{
                font-size:16px;
                font-weight:700;
                color:#333333;
            }
            .t-title{
                font-size:17px;
                font-weight:700;
                color:#333333;
                margin-top: 15px;
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
            .score-table{
                border-right: none;
            }
            .scoreLevel{
                display: flex;
                flex-direction: row;
                margin-top: 30px;
                .table-wrap{
                    flex: 3;
                }
                .radar-wrap{
                    flex: 2;
                    height: 250px;
                    border: 1px solid rgb(238, 238, 238);
                    padding:10px;
                }
            }
            #radar{
                width: 100%;
                height: 100%;
            }
        }
    }
    .bad{
        color: #f64400;
    }
    .good{
        color: #adce00;
    }
    .best{
        color:#00ca88
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