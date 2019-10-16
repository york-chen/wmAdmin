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
        <el-table-column prop="SCZCRQ" label="首次注册日期" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.SCZCRQ | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="DJRDSJ" label="等级认定时间" align="center" width="140">
          <template slot-scope="scope">
            {{ scope.row.DJRDSJ | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="XYDJ" label="信用等级" align="center" width="120"></el-table-column>
        <el-table-column prop="HGBM" label="海关编码" align="center" min-width="140"></el-table-column>
        <el-table-column prop="HYZL" label="行业种类" align="center" min-width="140"></el-table-column>
        <el-table-column prop="ZXBZ" label="注销标志" align="center" min-width="140"></el-table-column>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.cu) || []
    }
  }
}
</script>
