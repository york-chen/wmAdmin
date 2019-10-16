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
        <el-table-column prop="pun_date" label="处罚日期" align="center" width="140"></el-table-column>
        <el-table-column
          prop="acc_ent"
          label="涉事企业"
          header-align="center"
          min-width="160"
        ></el-table-column>
        <el-table-column prop="death_num" label="死亡和失踪人数" align="center" width="140"></el-table-column>
        <el-table-column
          prop="acc_content"
          label="事故简要说明"
          header-align="center"
          min-width="220"
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.sb) || []
    }
  }
}
</script>
