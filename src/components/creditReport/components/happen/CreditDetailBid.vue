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
        <el-table-column prop="publish_time" align="center" label="发布时间" width="140">
          <template slot-scope="scope">
            {{ scope.row.publish_time | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="title" header-align="center" label="标题" min-width="180"></el-table-column>
        <el-table-column prop="purchaser" align="center" label="采购人" min-width="100"></el-table-column>
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
      return this.detail.companyBid || []
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
