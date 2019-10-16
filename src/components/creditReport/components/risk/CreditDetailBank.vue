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
        <el-table-column
          prop="title"
          label="文书标题"
          header-align="center"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="case_no"
          label="文书编号"
          header-align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="org_level"
          label="机构等级"
          header-align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="case_fact"
          label="违法主体"
          header-align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="law_item"
          label="处罚依据"
          header-align="center"
          min-width="100"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="decision"
          label="处罚结果"
          header-align="center"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="pun_org" label="处罚机构" align="center" min-width="120"></el-table-column>
        <el-table-column prop="pun_date" label="处罚生效日期" align="center" width="120"> </el-table-column>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.cb) || []
    }
  }
}
</script>
