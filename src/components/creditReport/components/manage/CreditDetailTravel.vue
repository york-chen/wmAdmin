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
        <el-table-column prop="permit_no" label="许可证编号" align="center" width="140"></el-table-column>
        <el-table-column
          prop="pun_reason"
          label="处罚原因"
          header-align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_content"
          label="处罚内容"
          header-align="center"
          min-width="140"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column
          prop="pun_by"
          label="处罚依据"
          header-align="center"
          min-width="120"
          show-overflow-tooltip
        ></el-table-column>
        <el-table-column prop="start_time" label="开始时间" align="center" width="140"> </el-table-column>
        <el-table-column prop="end_time" label="结束时间" align="center" width="140"> </el-table-column>
        <el-table-column prop="cell2" label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="旅游不良详情">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.permit_no || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.pun_reason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.pun_content || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.pun_by || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.start_time || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.end_time || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.description || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.tr) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '许可证编号', data: 1 },
        { cell: '处罚原因', data: 2 },
        { cell: '处罚内容', data: 3 },
        { cell: '处罚依据', data: 4 },
        { cell: '开始时间', data: 5 },
        { cell: '结束时间', data: 6 },
        { cell: '描述', data: 7 }
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
