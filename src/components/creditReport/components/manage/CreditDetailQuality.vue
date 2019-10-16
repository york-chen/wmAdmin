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
        <el-table-column prop="pub_date" label="公告时间" width="140" align="center">
          <template slot-scope="scope">
            {{ scope.row.pub_date || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="reg_number" label="登记编号" align="center" min-width="140"></el-table-column>
        <el-table-column
          prop="pledgor"
          label="出质人"
          header-align="center"
          min-width="180"
        ></el-table-column>
        <el-table-column
          prop="pledgee"
          label="质权人"
          header-align="center"
          min-width="180"
        ></el-table-column>
        <el-table-column prop="state" label="状态" align="center" min-width="80"></el-table-column>
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
                {{ dialogList.reg_date | formatDate('YMD') }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.reg_number || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.state || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.equity_amount || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.pledgor || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                非公示项
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.pledgee || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                非公示项
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.cancel_reason || '-' }}
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
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.ent_equity_info) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '登记日', data: 1 },
        { cell: '登记编号', data: 2 },
        { cell: '状态', data: 3 },
        { cell: '出质股权数额', data: 4 },
        { cell: '出质人', data: 5 },
        { cell: '出质人证件号码', data: 6 },
        { cell: '质权人', data: 7 },
        { cell: '质权人号码', data: 8 },
        { cell: '备注', data: 9 }
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
