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
        <el-table-column prop="name" label="股东（发起人）" header-align="center">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.name" size="24"></avatar>
            <a
              :href="`/creditReport/${scope.row.name}`"
              target="_blank"
              class="credit-detail-name credit-color__blue"
            >
              {{ scope.row.name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="ownership_stake"
          align="center"
          label="出资比例"
          class-name="credit-color__red"
          width="100"
        ></el-table-column>
        <el-table-column prop="capital" align="center" label="认缴出资额" width="200">
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.capital" :key="i" class="credit-comp-partner__item">
              {{ item.sum }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="capital.time" align="center" label="认缴出资日期" width="160">
          <template slot-scope="scope">
            <div v-for="(item, i) in scope.row.capital" :key="i" class="credit-comp-partner__item">
              {{ item.time }}
            </div>
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
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.shareholder) || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-comp-partner__item {
    padding: 6px 20px;
    margin: 0 -20px;
    border-bottom: 1px solid #eee;

    &:first-child {
      margin-top: -8px;
    }

    &:last-child {
      margin-bottom: -8px;
    }
  }
}
</style>
