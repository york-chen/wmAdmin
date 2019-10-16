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
        <el-table-column prop="code" align="center" label="代码" width="100"></el-table-column>
        <el-table-column
          prop="announcement_title"
          header-align="center"
          label="标题"
          min-width="100"
        ></el-table-column>
        <el-table-column
          prop="company_name"
          header-align="center"
          label="企业名称"
          width="180"
        ></el-table-column>
        <el-table-column prop="title" align="center" label="投资金额（万元）" width="150">-</el-table-column>
        <el-table-column prop="announcement_time" align="center" label="日期" width="130">
          <template slot-scope="scope">
            {{ scope.row.announcement_time | formatDate('YMD') }}
          </template>
        </el-table-column>
        <!-- <el-table-column align="center" label="操作" width="90"></el-table-column> -->
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
      return this.detail.announcement || []
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
