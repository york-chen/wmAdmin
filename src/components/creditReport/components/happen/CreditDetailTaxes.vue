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
        <el-table-column prop="year" align="center" label="年份" width="100"></el-table-column>
        <el-table-column prop="grade" header-align="center" label="纳税评级" width="130"></el-table-column>
        <el-table-column prop="type" align="center" label="类型" width="100">
          <template slot-scope="scope">
            {{ scope.row.type === '0' ? '国税' : '地税' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="id_number"
          align="center"
          label="纳税人识别号"
          min-width="140"
        ></el-table-column>
        <el-table-column
          prop="eval_department"
          align="center"
          label="评价单位"
          min-width="180"
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
    // 主要人员
    data() {
      return this.detail.taxCredit || []
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
