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
        <el-table-column prop="ABNTIME" label="列入日期" width="160" align="center">
          <template slot-scope="scope">
            {{ scope.row.ABNTIME | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="SPECAUSENAME"
          label="列入原因"
          header-align="center"
          min-width="220"
        ></el-table-column>
        <el-table-column
          prop="DECORGNAME"
          label="决定机关"
          header-align="center"
          min-width="100"
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.oe) || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
