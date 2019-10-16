<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <div v-for="(company, i) in data" :key="i">
        <div class="credit-detail-hd">{{ company.report_year }}年度</div>
        <el-table class="credit-detail-table" :show-header="false" :data="tableData" border>
          <el-table-column prop="cell1" class-name="credit-table-cell" width="180"></el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div v-if="scope.row.data1 === 1">
                {{ company.total_assets || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 2">
                {{ company.total_sales || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 3">
                {{ company.prime_bus_profit || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 4">
                {{ company.total_tax || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cell2" class-name="credit-table-cell" width="180"> </el-table-column>
          <el-table-column>
            <template slot-scope="scope">
              <div v-if="scope.row.data1 === 1">
                {{ company.total_equity || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 2">
                {{ company.total_profit || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 3">
                {{ company.retained_profit || '-' }}
              </div>
              <div v-else-if="scope.row.data1 === 4">
                {{ company.total_liability || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="credit-nodata" v-if="data.length < 1"><i class="el-icon-document"></i> 暂无数据</div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import creditSub from '../CreditCntSub'

export default {
  components: {
    creditSub
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState({
      // 企业报告报告总数据
      detail: 'detail'
    }),
    // 主要人员
    data() {
      return this.detail.annualReport || []
    }
  },
  data() {
    return {
      tableData: [
        { cell1: '资产总额', data1: 1, cell2: '所有者权益合计', data2: 1 },
        { cell1: '销售总额', data1: 2, cell2: '利润总额', data2: 2 },
        { cell1: '主营业务收入', data1: 3, cell2: '净利润', data2: 3 },
        { cell1: '纳税总额', data1: 4, cell2: '负债总额', data2: 4 }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-hd {
    line-height: 1;
    margin-top: 20px;
    margin-bottom: -10px;
    font-weight: bold;
  }
}
</style>
