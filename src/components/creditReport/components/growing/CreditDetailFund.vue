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
        <el-table-column prop="tzdate" align="center" label="时间" width="120">
          <template slot-scope="scope">
            {{ scope.row.tzdate | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="lunci" align="center" label="轮次" width="100"></el-table-column>
        <el-table-column prop="money" align="center" label="金额" width="100"></el-table-column>
        <el-table-column prop="jigou_name" align="center" label="投资方" width="140"></el-table-column>
        <el-table-column prop="product" align="center" label="产品" width="140">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.product" size="24"></avatar>
            <span class="ui-fl credit-detail-name credit-color__blue">{{ scope.row.product }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="province" align="center" label="地区" width="80"></el-table-column>
        <el-table-column prop="hangye1" align="center" label="行业" width="100"></el-table-column>
        <el-table-column prop="yewu" align="center" label="业务" min-width="120"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import avatar from 'components/Avatar'
import creditSub from '../CreditCntSub'

export default {
  components: {
    avatar,
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
      return this.detail.investmentHistory || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-name {
    width: 74%;
  }
}
</style>
