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
        <el-table-column prop="product" header-align="center" label="产品" min-width="140">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.product" size="24"></avatar>
            <span class="ui-fl credit-detail-name credit-color__blue">{{ scope.row.product }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="company_name" align="center" label="公司名" min-width="160"></el-table-column>
        <el-table-column prop="jingpin_product" align="center" label="竞品名" width="180"></el-table-column>
        <el-table-column prop="product" align="center" label="产品" width="160"></el-table-column>
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
      return this.detail.competingProducts || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-name {
    width: 80%;
  }
}
</style>
