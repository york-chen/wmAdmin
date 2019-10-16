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
        <el-table-column prop="shsj" align="center" label="审核时间" width="120">
          <template slot-scope="scope">
            {{ scope.row.shsj | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="wzmc" header-align="center" label="网站名称" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.wzmc || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="site_url" header-align="center" label="网站首页" width="160">
          <template slot-scope="scope">
            <a :href="`http://${scope.row.site_url}`" target="_blank" class="credit-color__blue">
              {{ scope.row.site_url || '-' }}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="ym" header-align="center" label="域名" min-width="140">
          <template slot-scope="scope">
            {{ scope.row.ym || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="liscense" header-align="center" label="备案号" width="140">
          <template slot-scope="scope">
            {{ scope.row.liscense || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="zt" align="center" label="状态" width="90">
          <template slot-scope="scope">
            {{ scope.row.zt || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="dwxz" align="center" label="单位性质" width="100">
          <template slot-scope="scope">
            {{ scope.row.dwxz || '-' }}
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
      return this.detail.icpRecords || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
