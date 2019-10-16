<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <el-table
        class="credit-detail-table credit-detail-team credit-table-hidden"
        :data="data"
        border
        header-row-class-name="hidden-table-header"
        :max-height="$config.tableHeight"
      >
        <el-table-column align="center" class-name="credit-dialog-cell" width="150">
          <template slot-scope="scope">
            <avatar :name="scope.row.name" />
            <p class="credit-detail-team__name">{{ scope.row.name }}</p>
          </template>
        </el-table-column>
        <el-table-column min-width="200">
          <template slot-scope="scope">
            <h3 class="credit-detail-team__pos">{{ scope.row.title }}</h3>
            <p>{{ scope.row.desc }}</p>
          </template>
        </el-table-column>
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
      return this.detail.teamMember || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-team__name {
    color: #0063d3;
    font-size: 16px;
  }

  .credit-detail-team__pos {
    font-size: 16px;
    margin-bottom: 4px;
    font-weight: bold;
  }
}
</style>
<style>
  .hidden-table-header{
    display: none;
  }
</style>
