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
        <el-table-column label="序号" type="index" :index="1" align="center" width="80"></el-table-column>
        <el-table-column
          prop="XK_WSH"
          align="center"
          label="行政许可文书号"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="XK_XZJG"
          header-align="center"
          label="许可决定机关"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="XK_JDRQ" align="center" label="许可决定日期" width="140">
          <template slot-scope="scope">
            {{ scope.row.XK_JDRQ | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" :title="title">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.XK_WSH || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.XK_SPLB || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.XK_FR || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.XK_NR || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.XK_YXQ || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.XK_JDRQ || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.XK_JZQ || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.DFBM || '-' }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.XK_XZJG || '-' }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.SJC || '-' }}
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
    // 主要人员
    data() {
      return this.detail.pubPermission || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '行政许可决定书文号', data: 1 },
        { cell: '审核类型', data: 2 },
        { cell: '法定代表人姓名', data: 3 },
        { cell: '内容许可', data: 4 },
        { cell: '许可有效期', data: 5 },
        { cell: '许可决定日期', data: 6 },
        { cell: '许可截止日期', data: 7 },
        { cell: '地方编码', data: 8 },
        { cell: '许可机关', data: 9 },
        { cell: '数据更新时间', data: 10 }
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

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-name {
    width: 84%;
  }
}
</style>
