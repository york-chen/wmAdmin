<template>
        <div>
            <el-tabs v-model="active" @tab-click="bindToggleClick">
                <el-tab-pane
                        v-for="item in annualData"
                        :name="item.report_year"
                        :key="item.report_year"
                        :label="item.report_year + '年度报告'"
                />
            </el-tabs>
            <div class="credit-annual-cnt">
                <h1 class="credit-annual-cnt__title">
                    {{ annualDetail.company_name || '' }}{{ annualDetail.report_year || '' }}年度报告
                </h1>
                <!-- 企业基本信息 -->
                <credit-layer title="企业基本信息">
                    <el-table
                            class="credit-annual-table credit-annual-top"
                            :show-header="false"
                            :data="tableData"
                            border
                    >
                        <el-table-column prop="cell1" class-name="credit-annual-cell" width="180"></el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div v-if="scope.row.data1 === 1">
                                    {{ annualDetail.credit_code || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 2">
                                    {{ annualDetail.phone_number || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 3">
                                    {{ annualDetail.manage_state || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 4">
                                    {{ annualDetail.email || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 5">
                                    {{ annualDetail.postal_address || '-' }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cell2" class-name="credit-annual-cell" width="180"> </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div v-if="scope.row.data2 === 1">
                                    {{ annualDetail.company_name || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 2">
                                    {{ annualDetail.postcode || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 3">
                                    {{ annualDetail.employee_num || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 4">
                                    -
                                </div>
                                <div v-else-if="scope.row.data2 === 5">
                                    -
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </credit-layer>

                <!-- 网站或网店信息 -->
                <credit-layer title="网站或网店信息">
                    <el-table class="credit-annual-table" :data="empryData" border>
                        <el-table-column prop="cell2" label="类型" align="center" min-width="100">
                            网站
                        </el-table-column>
                        <el-table-column prop="cell2" label="名称" align="center" min-width="250">
                            紫光集团有限公司公司主页
                        </el-table-column>
                        <el-table-column prop="cell3" label="网址" align="center" min-width="160">
                            <a href="http://www.baidu.com" target="_blank" class="credit-annual-blue">www.baidu.com</a>
                        </el-table-column>
                    </el-table>
                </credit-layer>

                <!-- 股东及出资信息 -->
                <credit-layer title="股东及出资信息">
                    <el-table class="credit-annual-table" :data="empryData" border>
                        <el-table-column prop="cell2" label="类型" header-align="center" min-width="140">
                            <span class="credit-annual-blue">北京建坤有限公司</span>
                        </el-table-column>
                        <el-table-column prop="cell2" label="认缴出资金额（万元）" align="center" width="180">
                            3380
                        </el-table-column>
                        <el-table-column prop="cell2" label="认缴出资时间" align="center" width="120">
                            2018-09-21
                        </el-table-column>
                        <el-table-column prop="cell2" label="认缴出资方式" align="center" width="120">
                            货币
                        </el-table-column>
                        <el-table-column prop="cell2" label="实缴出资额（万元）" align="center" width="160">
                            217231
                        </el-table-column>
                        <el-table-column prop="cell2" label="实缴出资时间" align="center" width="120">
                            2018-09-21
                        </el-table-column>
                        <el-table-column prop="cell2" label="实缴出资方式" align="center" width="120">
                            货币
                        </el-table-column>
                    </el-table>
                </credit-layer>

                <!-- 企业资产状况信息 -->
                <credit-layer title="企业资产状况信息">
                    <el-table
                            class="credit-annual-table credit-annual-top"
                            :show-header="false"
                            :data="infoData"
                            border
                    >
                        <el-table-column prop="cell1" class-name="credit-annual-cell" width="180"></el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div v-if="scope.row.data1 === 1">
                                    {{ annualDetail.total_assets || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 2">
                                    {{ annualDetail.total_sales || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 3">
                                    {{ annualDetail.prime_bus_profit || '-' }}
                                </div>
                                <div v-else-if="scope.row.data1 === 4">
                                    {{ annualDetail.total_tax || '-' }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="cell2" class-name="credit-annual-cell" width="180"> </el-table-column>
                        <el-table-column>
                            <template slot-scope="scope">
                                <div v-if="scope.row.data2 === 1">
                                    {{ annualDetail.total_equity || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 2">
                                    {{ annualDetail.total_profit || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 3">
                                    {{ annualDetail.retained_profit || '-' }}
                                </div>
                                <div v-else-if="scope.row.data2 === 4">
                                    {{ annualDetail.total_liability || '-' }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </credit-layer>

                <!-- 对外投资信息 -->
                <credit-layer title="对外投资信息">
                    <el-table class="credit-annual-table" :data="empryData" border>
                        <el-table-column prop="cell2" label="注册号/统一社会信用代码" align="center" min-width="200">
                            网站
                        </el-table-column>
                        <el-table-column prop="cell2" label="对外投资企业名称" align="center" min-width="340">
                            <span class="credit-annual-blue">北京盛世精英教育科技有限公司</span>
                        </el-table-column>
                    </el-table>
                </credit-layer>
            </div>
        </div>
</template>

<script>
    import {createNamespacedHelpers} from 'vuex'

    const {mapState} = createNamespacedHelpers('creditReport');
    import creditLayer from '@/components/creditReport/components/CreditCntLayer'

    export default {
        components: {
            creditLayer
        },
        props:{
            year:{required:true,type:String}
        },
        computed: {
            ...mapState({
                // 企业报告报告总数据
                detail: 'detail'
            }),
            annualData(){
                return this.detail.annualReport
            },
            annualDetail(){
                return this.annualData.filter(item => item.report_year === this.active)[0]
            }
        },
        data() {
            return {
                name: '',
                active:this.year,
                tableData: [
                    { cell1: '统一社会信用代码', data1: 1, cell2: '企业名称', data2: 1 },
                    { cell1: '企业联系电话', data1: 2, cell2: '邮政编码', data2: 2 },
                    { cell1: '企业经营状态', data1: 3, cell2: '从业人数', data2: 3 },
                    { cell1: '电子邮箱', data1: 4, cell2: '是否有网站或网店', data2: 4 },
                    { cell1: '企业通信地址', data1: 5, cell2: '企业是否有投资信息或购买其他公司股权', data2: 5 }
                ],
                infoData: [
                    { cell1: '资产总额', data1: 1, cell2: '所有者权益合计', data2: 1 },
                    { cell1: '销售总额', data1: 2, cell2: '利润总额', data2: 2 },
                    { cell1: '营业总收入中主营业务收入', data1: 3, cell2: '净利润', data2: 3 },
                    { cell1: '纳税总额', data1: 4, cell2: '负债总额', data2: 4 }
                ],
                empryData: []
            }
        },
        methods: {
            /**
             * [bindToggleClick 切换tab]
             */
            bindToggleClick() {
            }
        },
        mounted() {
            // this.active = this.annualDetail.rep
        }
    }
</script>
<style lang="scss" scoped>
    .credit-annual-cnt {
        margin-top: 20px;

        .credit-annual-cnt__title {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            margin-bottom: 8px;
        }
    }
</style>

<style lang="scss">

    .credit-annual-table {
        margin-top: 18px;
        margin-bottom: 10px;
        font-size: 13px;
        line-height: 1.5;

        tr:hover > td {
            background-color: transparent !important;
        }

        td,
        th {
            padding: 8px 0;
        }

        tr td.credit-annual-cell {
            background-color: #f5f7fa !important;
        }
    }

    .credit-annual-top {
        .credit-annual-cell .cell {
            padding: 0 30px !important;
        }
    }
</style>
