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
        <el-table-column prop="startDate" align="center" label="开庭日期" width="172">
          <template slot-scope="scope">
            {{ scope.row.startDate | formatDate }}
          </template>
        </el-table-column>
        <el-table-column prop="caseReason" header-align="center" label="案由" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.caseReason || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="plaintiff" header-align="center" label="原告/上诉人" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.plaintiff || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="defendant" header-align="center" label="被告/被上诉人" min-width="200">
          <template slot-scope="scope">
            {{ scope.row.defendant || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="cell4" align="center" label="操作" class-name="credit-color__blue" width="80">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" :title="title">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column
            prop="cell"
            class-name="credit-dialog-cell"
            label="开庭日期"
            width="150"
          ></el-table-column>
          <el-table-column prop="data" label="案由" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.caseReason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.caseNo || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.plaintiff || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.defendant || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ scope.row.startDate | formatDate }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.litigant || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.contractors || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.judge || '-' }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.court || '-' }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.courtroom || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.kt) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '案由', data: 1 },
        { cell: '案号', data: 2 },
        { cell: '原告/上诉人', data: 3 },
        { cell: '被告/上诉人', data: 4 },
        { cell: '开庭日期', data: 5 },
        { cell: '当事人', data: 6 },
        { cell: '承办部门', data: 7 },
        { cell: '审判长/主审人', data: 8 },
        { cell: '法院', data: 9 },
        { cell: '法庭', data: 10 }
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
  .credit-list-part {
    padding-left: 20px;
  }
}
</style>
