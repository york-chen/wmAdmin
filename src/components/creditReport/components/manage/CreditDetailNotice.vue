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
        <el-table-column prop="cell2" label="票据号" width="160" align="center"></el-table-column>
        <el-table-column prop="cell2" label="票据类型" align="center" width="150"></el-table-column>
        <el-table-column prop="cell2" label="票面金额" align="center" width="130"></el-table-column>
        <el-table-column
          prop="cell2"
          label="发布机构"
          header-align="center"
          min-width="140"
        ></el-table-column>
        <el-table-column prop="cell2" label="公告日期" align="center" width="140">2018-09-11</el-table-column>
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
                {{ dialogList.put_date | formatDate('YMD') }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.put_department || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.remove_reason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.remove_date | formatDate('YMD') }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.remove_department || '-' }}
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
      // return (this.detail.entUntrusted && this.detail.entUntrusted.si) || []
      return []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '类别', data: 1 },
        { cell: '违法事实', data: 2 },
        { cell: '列入原因', data: 3 },
        { cell: '列入日期', data: 4 },
        { cell: '决定列入部门(作出决定机关)', data: 5 },
        { cell: '移除原因', data: 6 },
        { cell: '移除日期', data: 7 },
        { cell: '决定移除部门', data: 8 }
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
