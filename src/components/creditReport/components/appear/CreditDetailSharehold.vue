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
        <el-table-column prop="name" header-align="center" label="关联公司" min-width="100">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.name" size="24"></avatar>
            <span class="ui-fl credit-detail-name credit-color__blue">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="relationship" align="center" label="参股关系" width="100"></el-table-column>
        <el-table-column
          prop="participationratio"
          align="center"
          label="参股比例（%）"
          width="140"
        ></el-table-column>
        <el-table-column prop="title" align="center" label="投资金额（万元）" width="160">-</el-table-column>
        <el-table-column
          prop="profit"
          align="center"
          label="被参股公司净利润（元）"
          width="120"
        ></el-table-column>
        <el-table-column align="reportmerge" label="是否报表合并" width="100"></el-table-column>
        <el-table-column align="mainbusiness" label="被参股公司主营业务" width="140"></el-table-column>
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
      detail:'detail'
    }),
    data() {
      return this.detail.holdingCompany || []
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
