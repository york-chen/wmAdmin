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
        <el-table-column prop="pun_date" label="处罚生效日期" align="center" width="140"> </el-table-column>
        <el-table-column
          prop="pun_reason"
          label="处罚原因"
          header-align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_content"
          label="处罚内容"
          header-align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_org"
          label="执法部门"
          header-align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column prop="case_no" label="文书编号" align="center" width="140"></el-table-column>
        <el-table-column prop="effective_date" label="有效日期" align="center" width="140"> </el-table-column>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.cm) || []
    }
  }
}
</script>
