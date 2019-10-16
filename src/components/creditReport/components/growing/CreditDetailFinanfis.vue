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
        <el-table-column prop="date" align="center" label="时间" width="140">
          <template slot-scope="scope">
            {{ scope.row.date | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="round" align="center" label="轮次" width="120"></el-table-column>
        <el-table-column prop="money" align="center" label="金额" width="160"></el-table-column>
        <el-table-column prop="share" align="center" label="比例" width="120">
          <template slot-scope="scope">
            {{ scope.row.share || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="organization_name"
          align="center"
          label="投资方"
          min-width="120"
        ></el-table-column>
        <el-table-column prop="news_title" header-align="center" label="新闻标题" min-width="140">
          <template slot-scope="scope">
            {{ scope.row.news_title || '-' }}
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
      return this.detail.financingHistory || []
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
