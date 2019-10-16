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
        <el-table-column prop="caseCreateTime" align="center" label="立案日期" width="130">
          <template slot-scope="scope">
            {{ scope.row.caseCreateTime | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="execMoney" label="执行标的" align="center" width="160"> </el-table-column>
        <el-table-column prop="caseCode" label="案号" align="center" width="260"></el-table-column>
        <el-table-column
          prop="execCourtName"
          label="执行法院"
          align="center"
          min-width="200"
        ></el-table-column>
      </el-table>
      <!-- <el-pagination class="ui-txt-right" layout="prev, pager, next" :total="50"> </el-pagination> -->
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.zx) || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
