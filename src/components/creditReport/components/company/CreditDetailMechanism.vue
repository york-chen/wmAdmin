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
        <el-table-column label="序号" type="index" :index="1" align="center" width="100"></el-table-column>
        <el-table-column prop="ent_name" label="企业名称" min-width="160" header-align="center">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.ent_name" size="24"></avatar>
            <a
              :href="`/creditReport/${scope.row.ent_name}`"
              target="_blank"
              class="credit-detail-name credit-color__blue"
            >
              {{ scope.row.ent_name }}
            </a>
          </template>
        </el-table-column>
        <el-table-column
          prop="legal_name"
          align="center"
          label="负责人"
          class-name="credit-color__blue"
          width="120"
        ></el-table-column>
        <el-table-column prop="es_time" align="center" label="注册时间" width="150"></el-table-column>
        <el-table-column prop="ent_status" align="center" width="200" label="状态"></el-table-column>
      </el-table>
      <!-- <el-pagination class="ui-txt-right" layout="prev, pager, next" :total="50" /> -->
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
      detail:'detail'
    }),
    // 主要人员
    data() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.filiation) || []
    }
  }
}
</script>
