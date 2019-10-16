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
        <el-table-column label="序号" type="index" :index="1" align="center" width="120"></el-table-column>
        <el-table-column prop="name" header-align="center" label="主要人员">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.name" size="24"></avatar>
            <span class="credit-detail-name credit-color__blue">{{ scope.row.name }}</span>
            <!-- <a class="credit-color__orange ui-fr" href="">他有 1 家公司 ></a> -->
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="职务"
          width="300"
          :formatter="formatTitle"
        ></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import avatar from 'components/Avatar'
import creditSub from '../CreditCntSub'
import { mergeArray } from 'libs/utils'

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
      return this.detail.induBusiSimp && this.detail.induBusiSimp.manager
        ? mergeArray(this.detail.induBusiSimp.manager, 'name', 'title')
        : []
    }
  },
  methods: {
    formatTitle(row) {
      return row.title.toString()
    }
  }
}
</script>
