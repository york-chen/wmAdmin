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
        <el-table-column prop="issuecode" align="center" label="代码" width="100"></el-table-column>
        <el-table-column prop="name" header-align="center" label="简称" width="120"></el-table-column>
        <el-table-column
          prop="company_name"
          header-align="center"
          label="企业名称"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="proportion" align="center" label="实际配股比例" width="150"></el-table-column>
        <el-table-column prop="year" align="center" label="配股年份" width="130"></el-table-column>
        <el-table-column prop="cell2" label="操作" align="center" width="80" class-name="credit-color__blue">
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
                {{ dialogList.company_name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.progress || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.issuecode || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.year || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.proportion || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.issuedate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.pubdate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.price || '-' }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.sdate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 11">
                {{ dialogList.announcedate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 12">
                {{ dialogList.actualraise || '-' }}
              </div>
              <div v-else-if="scope.row.data === 13">
                {{ dialogList.proportionallimit || '-' }}
              </div>
              <div v-else-if="scope.row.data === 14">
                {{ dialogList.exdate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 15">
                {{ dialogList.sadate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 16">
                {{ dialogList.raiseceiling || '-' }}
              </div>
              <div v-else-if="scope.row.data === 17">
                {{ dialogList.ddate || '-' }}
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
      return this.detail.allotment || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '企业名称', data: 1 },
        { cell: '方案进度', data: 2 },
        { cell: '配股代码', data: 3 },
        { cell: '配股简称', data: 4 },
        { cell: '配股年份', data: 5 },
        { cell: '实际配股比例', data: 6 },
        { cell: '配股上市日', data: 7 },
        { cell: '证监会核准公告日', data: 8 },
        { cell: '每股配股价格', data: 9 },
        { cell: '缴款起止日', data: 10 },
        { cell: '发审委公告日', data: 11 },
        { cell: '实际募集资金净额', data: 12 },
        { cell: '预案配股比例上限', data: 13 },
        { cell: '除权日', data: 14 },
        { cell: '股东大会公告日', data: 15 },
        { cell: '预案募资金额上限', data: 16 },
        { cell: '董事会公告日', data: 17 }
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
