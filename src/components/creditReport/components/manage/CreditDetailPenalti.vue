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
        <el-table-column prop="CF_JDRQ" label="决定日期" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.CF_JDRQ | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="CF_WSH" label="决定文书号" align="center" min-width="180"></el-table-column>
        <el-table-column prop="CF_CFLB1" label="类型" align="center" min-width="120"></el-table-column>
        <el-table-column prop="CF_XZJG" label="决定机关" align="center" min-width="160"></el-table-column>
        <el-table-column prop="cell2" align="center" label="操作" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="行政处罚详情">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.CF_WSH || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.CF_CFLB1 || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.CF_SY || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.CF_JDRQ | formatDate('YMD') }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.CF_XZJG || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.CF_FR || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.CF_ZT || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.ap) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '决定文书号', data: 1 },
        { cell: '类型', data: 2 },
        { cell: '处罚内容', data: 3 },
        { cell: '决定日期', data: 4 },
        { cell: '决定机关', data: 5 },
        { cell: '法人', data: 6 },
        { cell: '备注', data: 7 }
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

<style lang="scss" scoped></style>
