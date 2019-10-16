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
          prop="medicine_certno"
          label="医药生产许可证"
          width="140"
          align="center"
        ></el-table-column>
        <el-table-column
          prop="title"
          label="文书标题"
          header-align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="check_reason"
          label="检查原因"
          header-align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column prop="pub_date" label="发布时间" align="center" width="120">
          2015-11-19
        </el-table-column>
        <el-table-column prop="pub_mode" label="处罚形式" align="center" min-width="100"></el-table-column>
        <el-table-column
          prop="problem"
          label="发现的问题"
          align="center"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="operation"
          label="处罚措施"
          align="center"
          width="120"
          show-overflow-tooltip
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
      detail:'detail'
    }),
    data() {
      return (this.detail.entUntrusted && this.detail.entUntrusted.fm) || []
    }
  }
}
</script>
