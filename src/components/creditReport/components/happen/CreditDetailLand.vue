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
        <el-table-column prop="location" align="center" label="土地坐落" width="160"></el-table-column>
        <el-table-column prop="purpose" align="center" label="土地用途" min-width="150"></el-table-column>
        <el-table-column
          prop="total_area"
          align="center"
          label="总面积（公顷）"
          width="140"
        ></el-table-column>
        <el-table-column prop="admin_region" align="center" label="行政区" width="120"></el-table-column>
        <el-table-column prop="supply_way" align="center" label="供应方式" min-width="100"></el-table-column>
        <el-table-column prop="signed_date" align="center" label="签订日期" width="120">
          <template slot-scope="scope">
            {{ scope.row.signed_date | formatDate('YMD') }}
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
      return this.detail.purchaseLand || []
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
