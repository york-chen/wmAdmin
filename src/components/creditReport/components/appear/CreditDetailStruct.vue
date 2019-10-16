<template>
  <div>
    <credit-sub :title="title" :length="data.length" remark="（备注：此处条数根据公布日起算）" />
    <div class="credit-detail">
      <!-- <el-tabs class="credit-annual-tabs" v-model="activeName" v-if="data.length > 0">
        <el-tab-pane label="2019-09" name="first"></el-tab-pane>
        <el-tab-pane label="2019-08" name="second"></el-tab-pane>
      </el-tabs> -->
      <el-table
        class="credit-list-table credit-table-hidden"
        :data="data"
        border
        :max-height="$config.tableHeight"
      >
        <el-table-column label="序号" type="index" :index="1" align="center" width="80"></el-table-column>
        <el-table-column prop="pubDate" align="center" label="时间" min-width="120"></el-table-column>
        <el-table-column prop="shareAll" align="center" label="总股本" width="80"></el-table-column>
        <el-table-column prop="ashareAll" align="center" label="A股总股本" width="110"></el-table-column>
        <el-table-column prop="noLimitShare" align="center" label="流通A股" width="90"></el-table-column>
        <el-table-column prop="limitShare" align="center" label="限售A股" width="90"></el-table-column>
        <el-table-column prop="hshareAll" align="center" label="H股总股本" width="110"></el-table-column>
        <el-table-column prop="hnoLimitShare" align="center" label="流通H股" width="90"></el-table-column>
        <el-table-column prop="hlimitShare" align="center" label="限售H股" width="90"></el-table-column>
        <el-table-column prop="changeReason" align="center" label="变动原因" width="120"></el-table-column>
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
      return this.detail.shareStructure || []
    }
  },
  data() {
    return {
      activeName: ''
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

<style lang="scss">
.credit-annual-tabs {
  margin-top: 20px;
  .el-tabs__nav-wrap {
    padding: 0 30px;

    &::after {
      height: 1px;
    }
  }
}
</style>
