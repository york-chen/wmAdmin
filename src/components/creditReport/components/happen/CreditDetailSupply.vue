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
        <el-table-column prop="title" header-align="center" label="标题" min-width="180"></el-table-column>
        <el-table-column prop="publish_date" align="center" label="发布日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.publish_date | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="province" align="center" label="位置" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.province || '' }}
            {{ scope.row.city || '' }}
            {{ scope.row.county || '' }}
          </template>
        </el-table-column>
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
      return this.detail.supplyLand || []
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
