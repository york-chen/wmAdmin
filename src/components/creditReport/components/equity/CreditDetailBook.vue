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
        <el-table-column prop="regtime" align="center" label="批准日期" min-width="120">
          <template slot-scope="scope">
            {{ scope.row.regtime | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="fullname" header-align="center" label="软件全称" min-width="180">
          <template slot-scope="scope">
            {{ scope.row.fullname || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="simplename" align="center" label="软件简称" width="140">
          <template slot-scope="scope">
            {{ scope.row.simplename || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="regnum" align="center" label="登记号" width="140">
          <template slot-scope="scope">
            {{ scope.row.regnum || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="catnum" align="center" label="分类号" width="130">
          <template slot-scope="scope">
            {{ scope.row.catnum || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="version" align="center" label="版本号" width="110">
          <template slot-scope="scope">
            {{ scope.row.version || '-' }}
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
                {{ dialogList.fullname || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.simplename || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.regnum || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.catnum || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.version || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.author_nationality || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.publishtime || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.regtime | formatDate('YMD') }}
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
      return this.detail.softwareCopyrights || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '软件全称', data: 1 },
        { cell: '软件简称', data: 2 },
        { cell: '登记号', data: 3 },
        { cell: '分类号', data: 4 },
        { cell: '版本号', data: 5 },
        { cell: '著作权人（国籍）', data: 6 },
        { cell: '首次发表日期', data: 7 },
        { cell: '登记日期', data: 8 }
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
