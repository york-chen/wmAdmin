<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <el-table
        class="credit-list-table credit-table-hidden"
        :data="data"
        border
        :max-height="$config.tableHeight"
      >
        <el-table-column label="序号" type="index" :index="1" align="center" width="70"></el-table-column>
        <el-table-column prop="boardDate" align="center" label="董事会日期" width="100"></el-table-column>
        <el-table-column
          prop="shareholderDate"
          align="center"
          label="股东大会日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="implementationDate"
          align="center"
          label="实施日期"
          width="100"
        ></el-table-column>
        <el-table-column
          prop="introduction"
          align="center"
          label="分红方案说明"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="asharesDate"
          align="center"
          label="A股股权登记日"
          width="100"
        ></el-table-column>
        <el-table-column prop="acuxiDate" align="center" label="A股股权除息日" width="100"></el-table-column>
        <el-table-column prop="adividendDate" align="center" label="A股派息日" width="100"></el-table-column>
        <el-table-column prop="progress" align="center" label="方案进度" width="100"></el-table-column>
        <el-table-column prop="payment" align="center" label="股利支付率（%）" width="100"></el-table-column>
        <el-table-column prop="dividendRate" align="center" label="分红率（%）" width="90"></el-table-column>
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
    // 主要人员
    data() {
      return this.detail.bonusInfo || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-name {
    width: 84%;
  }
}
</style>
