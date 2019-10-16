<template>
  <div>
    <credit-sub :title="title" :length="data.length" remark="（备注：此处条数根据公布日起算）" />
    <div class="credit-detail">
      <!-- <el-tabs class="credit-annual-tabs" v-model="activeName" v-if="data.length > 0">
        <el-tab-pane label="" name="first"></el-tab-pane>
      </el-tabs> -->
      <el-table
        class="credit-list-table credit-table-hidden"
        :data="data"
        border
        :max-height="$config.tableHeight"
      >
        <el-table-column label="序号" type="index" :index="1" align="center" width="80"></el-table-column>
        <el-table-column prop="name" header-align="center" label="机构或基金" min-width="100">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.name" size="24"></avatar>
            <span class="ui-fl credit-detail-name credit-color__blue">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="holdingNum" align="center" label="持有数量" width="100"></el-table-column>
        <el-table-column
          prop="holdingChange"
          align="center"
          label="持股变化（股）"
          width="140"
        ></el-table-column>
        <el-table-column
          prop="proportion"
          align="center"
          label="占股本比例（%）"
          width="150"
        ></el-table-column>
        <el-table-column prop="actual" align="center" label="实际增减持（%）" width="150"></el-table-column>
        <el-table-column prop="shareType" align="center" label="股份类型" width="120"></el-table-column>
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
      const json = this.detail.shareholder || []

      return json.filter(item => item.type === '2' || item.type === 2)
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
