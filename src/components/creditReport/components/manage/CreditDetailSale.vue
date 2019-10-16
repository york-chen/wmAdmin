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
        <el-table-column prop="type" label="处置法院" header-align="center" min-width="140"></el-table-column>
        <el-table-column prop="fact" label="拍卖标题" header-align="center" min-width="200"></el-table-column>
        <el-table-column prop="put_reason" label="公告日期" align="center" width="140"
          >2018-09-11</el-table-column
        >
        <el-table-column prop="cell2" label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="严重违法详情">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.type || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.fact || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.put_reason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.put_date || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { dialogMixin } from '@/mixins/report'
import {createNamespacedHelpers} from 'vuex'

const {mapState} = createNamespacedHelpers('creditReport');
import creditSub from '../CreditCntSub'

export default {
  mixins: [dialogMixin],
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.ja) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '处置法院', data: 1 },
        { cell: '拍卖标题', data: 2 },
        { cell: '公告日期', data: 3 },
        { cell: '公告内容', data: 4 }
      ]
    }
  },
  methods: {
    bindShow(index) {
      this.dialogVisible = true
      this.dialogList = this.data[index]
    }
  }
}
</script>
