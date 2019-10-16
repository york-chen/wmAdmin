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
        <el-table-column prop="reg_date" label="登记日期" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.reg_date | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column prop="reg_number" label="登记号" align="center" min-width="100">
          <template slot-scope="scope">
            {{ scope.row.reg_number || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="type" label="被担保债权类型" align="center" min-width="120"></el-table-column>
        <el-table-column
          prop="amount"
          label="被担保债权数额"
          align="center"
          min-width="140"
        ></el-table-column>
        <el-table-column
          prop="reg_department"
          label="登记机关"
          header-align="center"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="status" label="状态" align="center" min-width="80"></el-table-column>
        <el-table-column label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="动产抵押详情">
        <div class="dialog-credit-sub">动产抵押登记信息</div>
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.reg_number || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.reg_department || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.reg_date || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.status || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-credit-sub">抵押权人信息</div>
        <el-table class="credit-detail-table" :show-header="false" :data="dialogInfo" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ personInfo.people_name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ personInfo.license_type || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ personInfo.license_num || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-credit-sub">被担保主债券信息</div>
        <el-table class="credit-detail-table" :show-header="false" :data="dialogVouch" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.type || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.amount || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.term || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.scope || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.remark || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-credit-sub">抵押物信息信息</div>
        <el-table class="credit-detail-table" :show-header="false" :data="dialogArticle" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ pawnInfo.pawn_name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ pawnInfo.owership || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ pawnInfo.detail || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ pawnInfo.remark || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="dialog-credit-sub">变更信息</div>
        <el-table class="credit-detail-table" :data="changeInfo" border>
          <el-table-column prop="change_date" label="变更日期" width="160">
            <template slot-scope="scope">
              {{ scope.row.change_date | formatDate('YMD') }}
            </template>
          </el-table-column>
          <el-table-column prop="content_content" label="变更内容" min-width="200"></el-table-column>
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
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.mortgage_info) || []
    },
    personInfo() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.mortgage_person_info[0]) || []
    },
    pawnInfo() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.mortgage_pawn_info[0]) || []
    },
    changeInfo() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.mortgage_change_info) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '登记编号', data: 1 },
        { cell: '登记机关', data: 2 },
        { cell: '登记日期', data: 3 },
        { cell: '状态', data: 4 }
      ],
      dialogInfo: [
        { cell: '抵押权人名称', data: 1 },
        { cell: '抵押权人证照/证件类型', data: 2 },
        { cell: '证件/证照号码', data: 3 }
      ],
      dialogVouch: [
        { cell: '被担保债权类型', data: 1 },
        { cell: '被担保债券数额', data: 2 },
        { cell: '债务人履行债务期限', data: 3 },
        { cell: '担保范围', data: 4 },
        { cell: '备注', data: 5 }
      ],
      dialogArticle: [
        { cell: '抵押物名称', data: 1 },
        { cell: '所属权归属', data: 2 },
        { cell: '细节信息', data: 3 },
        { cell: '备注', data: 4 }
      ],
      dialogChange: [
        { cell: '被担保债权类型', data: 1 },
        { cell: '被担保债券数额', data: 2 },
        { cell: '债务人履行债务期限', data: 3 },
        { cell: '担保范围', data: 2 }
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
.dialog-credit-sub {
  margin-top: 20px;
  margin-bottom: -10px;
  font-weight: bold;
}
</style>
