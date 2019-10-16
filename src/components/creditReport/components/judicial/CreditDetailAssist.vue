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
        <el-table-column
          prop="cell2"
          label="被执行人"
          min-width="140"
          header-align="center"
        ></el-table-column>
        <el-table-column prop="cell2" label="股权数额" align="center" width="140">
          3150万人民币
        </el-table-column>
        <el-table-column prop="cell2" label="执行法院" header-align="center" min-width="140">
          郑州市中级人民法院
        </el-table-column>
        <el-table-column prop="cell2" label="执行通知文号" header-align="center" min-width="160">
          （98）郑法协执字第588-592、 671-672号
        </el-table-column>
        <el-table-column prop="cell2" label="类型|状态" align="center" width="100">续冻</el-table-column>
        <el-table-column prop="cell2" align="center" label="操作" width="80" class-name="credit-color__blue"
          >详情</el-table-column
        >
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
      // return (this.detail.entUntrusted && this.detail.entUntrusted.xz) || []
      return []
    }
  }
}
</script>

<style lang="scss" scoped></style>
