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
          prop="pun_content"
          label="处罚内容"
          header-align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_result"
          label="处罚结果"
          header-align="center"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_by"
          label="处罚依据"
          header-align="center"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="pun_date" label="处罚日期" align="center" width="140"> </el-table-column>
        <el-table-column
          prop="gist_unit"
          label="处罚单位"
          header-align="center"
          min-width="120"
        ></el-table-column>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.mt) || []
    }
  }
}
</script>
