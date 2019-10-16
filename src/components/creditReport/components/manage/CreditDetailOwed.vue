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
        <el-table-column prop="publish_date" label="发布日期" width="120" align="center"></el-table-column>
        <el-table-column
          prop="tax_id_number"
          label="纳税人识别号"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="tax_category"
          label="欠税税种"
          align="center"
          min-width="120"
        ></el-table-column>
        <el-table-column
          prop="new_own_tax_balance"
          label="当前发生的欠税额"
          align="center"
          min-width="150"
        ></el-table-column>
        <el-table-column
          prop="own_tax_amount"
          label="欠税金额"
          align="center"
          min-width="140"
        ></el-table-column>
        <el-table-column prop="department" label="税务机关" align="center" min-width="150"></el-table-column>
        <el-table-column label="操作" align="center" width="80" class-name="credit-color__blue">
          <template slot-scope="scope">
            <div class="credit-list-table__btn" @click="bindShow(scope.$index)">详情</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- dialog 详情 -->
      <el-dialog class="dialog-jnb-main" width="760px" :visible.sync="dialogVisible" title="欠税信息详情">
        <el-table class="credit-detail-table" :show-header="false" :data="dialogTable" border>
          <el-table-column prop="cell" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.taxpayer_type || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.legalperson_name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.location || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.tax_category || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.own_tax_amount || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.department || '-' }}
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="cell2" class-name="credit-dialog-cell" width="150"></el-table-column>
          <el-table-column prop="data2" min-width="200">
            <template slot-scope="scope">
              <div v-if="scope.row.data === 1">
                {{ dialogList.tax_id_number || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.person_id_number || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.own_tax_balance || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.new_own_tax_balance || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.publish_date || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.ta) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '纳税人类型', data: 1, cell2: '纳税人识别号', data2: 1 },
        { cell: '负责人姓名', data: 2, cell2: '证件号码', data2: 2 },
        { cell: '经营地点', data: 3 },
        { cell: '欠税税种', data: 4, cell2: '欠税余额', data2: 4 },
        { cell: '欠税金额', data: 5, cell2: '当前发生的欠税额', data2: 5 },
        { cell: '税务机关', data: 6, cell2: '发布日期 ', data2: 6 }
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
