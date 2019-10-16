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
        <el-table-column prop="publish_time" align="center" label="发表日期" width="120">
          <template slot-scope="scope">
            {{ scope.row.publish_time | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="name" header-align="center" label="作品名称" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.name || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="type" align="center" label="作品类别" width="160">
          <template slot-scope="scope">
            {{ scope.row.type || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="author" header-align="center" label="著作权人" min-width="140">
          <template slot-scope="scope">
            {{ scope.row.author || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="regNum" header-align="center" label="登记号" width="140">
          <template slot-scope="scope">
            {{ scope.row.regNum || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="writer" align="center" label="作者姓名" width="100">
          <template slot-scope="scope">
            {{ scope.row.writer || '-' }}
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
      return this.detail.copyrightWorks || []
    }
  }
}
</script>

<style lang="scss" scoped></style>
