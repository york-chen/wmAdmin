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
        <el-table-column prop="info" label="被投资企业名称" min-width="200">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.info.ent_name" size="24"></avatar>
            <a
              :href="`/creditReport/${scope.row.info.ent_name}`"
              target="_blank"
              class="ui-fl credit-detail-name credit-color__blue"
            >
              {{ scope.row.info.ent_name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="info" label="被投资法定代表人" min-width="170">
          <template slot-scope="scope">
            <span class="credit-color__blue">{{ scope.row.info.legal_pname }}</span>
            <!-- <a class="credit-color__orange ui-fr" href="">他有 1 家公司 ></a> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="info.reg_capital"
          align="center"
          label="注册资本"
          min-width="140"
        ></el-table-column>
        <el-table-column
          prop="investo_ratio"
          align="center"
          label="持股比例"
          class-name="credit-color__red"
          width="100"
        ></el-table-column>
        <el-table-column prop="info.es_time" align="center" label="成立日期" width="120">
          <template slot-scope="scope">
            {{ scope.row.info.es_time | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="info.ent_status"
          align="center"
          label="状态"
          width="120"
          :class-name="'credit-color__red'"
        >
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
    // 对外投资
    data() {
      return (this.detail.entInvest && this.detail.entInvest.received_invest) || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-list-part {
    padding-left: 20px;
  }

  .credit-detail-name {
    width: 84%;
  }
}
</style>
