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
        <el-table-column prop="case_no" label="案件编号" width="160" align="center"></el-table-column>
        <el-table-column
          prop="case_name"
          label="案件名称"
          header-align="center"
          width="160"
        ></el-table-column>
        <el-table-column prop="pun_type" label="处理类型" align="center" width="160"></el-table-column>
        <el-table-column prop="pun_date" label="发布时间" align="center" width="120"> </el-table-column>
        <el-table-column
          prop="pun_reason"
          label="处罚原因"
          header-align="center"
          min-width="180"
        ></el-table-column>
        <el-table-column label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog
        class="dialog-jnb-main"
        width="760px"
        :visible.sync="dialogVisible"
        title="农业领域行政处罚详情"
      >
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="100"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.case_no || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.case_name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.pun_type || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.illegal_entity || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.pun_date || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cell2" class-name="credit-dialog-cell" width="100"></el-table-column>
          <el-table-column prop="data2" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.pun_org || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.pun_dept || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.pun_reason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.pun_by || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.pun_result || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.ag) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '案件编号', data: 1, cell2: '处罚机构', data2: 1 },
        { cell: '案件名称', data: 2, cell2: '处罚部门', data2: 2 },
        { cell: '处罚类型', data: 3, cell2: '处罚原因', data2: 3 },
        { cell: '违法主体', data: 4, cell2: '处理依据', data2: 4 },
        { cell: '发布时间', data: 5, cell2: '处罚结果 ', data2: 5 }
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
