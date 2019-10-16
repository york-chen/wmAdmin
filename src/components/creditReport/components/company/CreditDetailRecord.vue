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
        <el-table-column label="序号" type="index" :index="1" align="center" width="70"></el-table-column>
        <el-table-column prop="change_time" align="center" label="变更日期" width="150"></el-table-column>
        <el-table-column prop="change_item" header-align="center" label="变更项目" min-width="200">
        </el-table-column>
        <el-table-column prop="content_before" header-align="center" label="变更前" min-width="200">
          <template slot-scope="scope">
            <div
              v-html="formatChangeChart(scope.row.content_before, scope.row.content_after, 'source')"
            ></div>
          </template>
        </el-table-column>
        <el-table-column prop="content_after" header-align="center" label="变更后" min-width="200">
          <template slot-scope="scope">
            <div
              v-html="formatChangeChart(scope.row.content_before, scope.row.content_after, 'target')"
            ></div>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-pagination class="ui-txt-right" layout="prev, pager, next" :total="50"> </el-pagination> -->
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import creditSub from '../CreditCntSub'
import { formatChangeChart } from 'libs/tools'

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
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.ent_change_info) || []
    }
  },
  data() {
    return {
      formatChangeChart
    }
  }
}
</script>
