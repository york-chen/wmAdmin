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
        <el-table-column label="序号" type="index" :index="1" align="center" width="80"></el-table-column>
        <el-table-column prop="changedate" header-align="center" label="时间" width="140"> </el-table-column>
        <el-table-column
          prop="changereason"
          align="center"
          label="变动原因"
          min-width="100"
        ></el-table-column>
        <el-table-column prop="afterall" align="center" label="变动后A股总股本" width="180"></el-table-column>
        <el-table-column
          prop="afternoLimit"
          align="center"
          label="变动后流通A股"
          width="150"
        ></el-table-column>
        <el-table-column prop="afterlimit" align="center" label="变动后限售A股" width="130"></el-table-column>
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
      return this.detail.equityChange || []
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
