<template>
  <div>
    <credit-sub :title="title" />
    <div class="credit-detail">
      <el-table
        class="credit-detail-table"
        :show-header="false"
        :data="tableData"
        :span-method="arraySpanMethod"
        border
      >
        <el-table-column prop="cell1" class-name="credit-table-cell" width="180"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 1">
              {{ company.issueDate || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 2">
              {{ company.issueNumber || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 3">
              {{ company.ipoRatio || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ company.openingPrice || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              {{ company.actualRaised || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 6">
              {{ company.listingSponsor || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 7">
              {{ company.history || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cell2" class-name="credit-table-cell" width="180"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 1">
              {{ company.listingDate || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 2">
              {{ company.issuePrice || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 3">
              {{ company.expectedToRaise || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ company.rate || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              {{ company.mainUnderwriter || '-' }}
            </div>
          </template>
        </el-table-column>
      </el-table>
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
      detail:'detail'
    }),
    // 公司背景
    company() {
      return this.detail.issueRelated || {}
    }
  },
  data() {
    return {
      tableData: [
        { cell1: '成立日期', data1: 1, cell2: '上市日期', data2: 1 },
        { cell1: '发行数量', data1: 2, cell2: '发行价格', data2: 2 },
        { cell1: '发行市盈率', data1: 3, cell2: '预计募资', data2: 3 },
        { cell1: '首日开盘价', data1: 4, cell2: '发行中签率', data2: 4 },
        { cell1: '实际募资', data1: 5, cell2: '主承销商', data2: 5 },
        { cell1: '上市保荐人', data1: 6 },
        { cell1: '历史沿革', data1: 7 }
      ]
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 5 || rowIndex === 6) {
          return [1, 3]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-table-cell__a {
    color: #0063d3;
  }
}
</style>
