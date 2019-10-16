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
        <el-table-column prop="REG_DATE" align="center" label="立案时间" width="120"></el-table-column>
        <el-table-column prop="CASE_CODE" label="案号" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.CASE_CODE || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="COURT_NAME" label="执行法院" header-align="center" min-width="180">
          <template slot-scope="scope">
            {{ scope.row.COURT_NAME || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="PERFORMANCE" label="履行状态" align="center" width="120">
          <template slot-scope="scope">
            {{ scope.row.PERFORMANCE || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="GIST_CID" label="执行依据文号" align="center" width="200">
          <template slot-scope="scope">
            {{ scope.row.GIST_CID || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="cell2" label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="失信被执行人详情">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.INAME || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.BUESINESSENTITY || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.CARDNUM || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.GIST_CID || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.CASE_CODE || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.GIST_UNIT || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.DUTY || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.PERFORMANCE || '-' }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.COURT_NAME || '-' }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.AREA_NAME || '-' }}
              </div>
              <div v-else-if="scope.row.data === 11">
                {{ dialogList.REG_DATE || '-' }}
              </div>
              <div v-else-if="scope.row.data === 12">
                {{ dialogList.PUBLISH_DATE || '-' }}
              </div>
              <div v-else-if="scope.row.data === 13">
                {{ dialogList.DISREPUT_TYPE_NAME || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.sp) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '名称', data: 1 },
        { cell: '法定代表人', data: 2 },
        { cell: '身份证号/组织机构代码', data: 3 },
        { cell: '执行依据', data: 4 },
        { cell: '案号', data: 5 },
        { cell: '做出执行依据单位', data: 6 },
        { cell: '法律生效文书确定的义务', data: 7 },
        { cell: '被执行人的履行情况', data: 8 },
        { cell: '执行法院', data: 9 },
        { cell: '省份', data: 10 },
        { cell: '立案时间', data: 11 },
        { cell: '发布时间', data: 12 },
        { cell: '失信被执行人行为具体情形', data: 13 }
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
