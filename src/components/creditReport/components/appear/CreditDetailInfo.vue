<template>
  <div>
    <credit-sub :title="title" />
    <div class="credit-detail">
      <el-table
        class="credit-detail-table credit-detail-top"
        :show-header="false"
        :data="tableData"
        :span-method="arraySpanMethod"
        border
      >
        <el-table-column prop="cell1" class-name="credit-table-cell" width="180"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 1">
              {{ data.engName || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 2">
              {{ data.usedName || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 3">
              {{ data.industry || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ data.chairman || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              {{ data.legal || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 6">
              {{ data.registeredCapital || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 7">
              {{ data.controllingShareholder || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 8">
              {{ data.actualController || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 9">
              {{ data.finalController || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cell2" class-name="credit-table-cell" width="180"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 3">
              {{ data.mainBusiness || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ data.secretaries || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              {{ data.generalManager || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 6">
              {{ data.employeesNum || '-' }}
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
      detail: 'detail'
    }),
    data() {
      return this.detail.companyStock || {}
    }
  },
  data() {
    return {
      tableData: [
        { cell1: '英文名称', data1: 1 },
        { cell1: '曾用名', data1: 2 },
        { cell1: '所属行业', data1: 3, cell2: '主营业务', data2: 3 },
        { cell1: '董事长', data1: 4, cell2: '董秘', data2: 4 },
        { cell1: '法人代表', data1: 5, cell2: '总经理', data2: 5 },
        { cell1: '注册资本', data1: 6, cell2: '员工人数', data2: 6 },
        { cell1: '控股股东', data1: 7 },
        { cell1: '实际控制人', data1: 8 },
        { cell1: '最终控制人', data1: 9 }
      ]
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 0 || rowIndex === 1 || rowIndex === 6 || rowIndex === 7 || rowIndex === 8) {
          return [1, 3]
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  margin-top: 20px;

  .credit-50 {
    width: 50%;
  }

  .credit-detail__cell {
    position: relative;
    font-size: 13px;
    margin-top: 10px;
    margin-bottom: 2px;
  }

  .credit-detail__title {
    color: #999;
    position: absolute;
    left: 16px;
  }

  .credit-detail__value {
    display: inline-block;
    padding-left: 100px;
  }
}
</style>
