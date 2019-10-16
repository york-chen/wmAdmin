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
        <el-table-column prop="submittime" align="center" label="发布日期" width="150">
          <template slot-scope="scope">
            {{ scope.row.submittime | formatDate('YMD') }}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          label="标题"
          min-width="180"
          header-align="center"
          class-name="credit-color__blue"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.title || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="caseno" label="案号" header-align="center" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.caseno || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="casereason" label="案由" header-align="center" min-width="140">
          <template slot-scope="scope">
            {{ scope.row.casereason || '-' }}
          </template>
        </el-table-column>
        <el-table-column
          prop="partyInfo"
          label="当事人信息"
          align="center"
          min-width="140"
          show-overflow-tooltip
        >
          <template slot-scope="scope">
            {{ scope.row.partyInfo || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="cell2" align="center" label="操作" width="80" class-name="credit-color__blue">
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
                {{ dialogList.casereason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.caseno || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.title || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.plaintext || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.court || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.casetype || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.base || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.submittime | formatDate }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.judgetime | formatDate }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.party || '-' }}
              </div>
              <div v-else-if="scope.row.data === 11">
                {{ dialogList.partyInfo || '-' }}
              </div>
              <div v-else-if="scope.row.data === 12">
                {{ dialogList.lawsuit_record || '-' }}
              </div>
              <div v-else-if="scope.row.data === 13">
                {{ dialogList.reason || '-' }}
              </div>
              <div v-else-if="scope.row.data === 14">
                {{ dialogList.trialprocedure || '-' }}
              </div>
              <div v-else-if="scope.row.data === 15">
                {{ dialogList.legalbasis || '-' }}
              </div>
              <div v-else-if="scope.row.data === 16">
                {{ dialogList.result || '-' }}
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.ws) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '案由', data: 1 },
        { cell: '案号', data: 2 },
        { cell: '标题', data: 3 },
        { cell: '正文', data: 4 },
        { cell: '法院', data: 5 },
        { cell: '案件类型', data: 6 },
        { cell: '省份', data: 7 },
        { cell: '发布时间', data: 8 },
        { cell: '裁判日期', data: 9 },
        { cell: '当事人', data: 10 },
        { cell: '当事人信息', data: 11 },
        { cell: '申诉记录', data: 12 },
        { cell: '理由', data: 13 },
        { cell: '审理程序', data: 14 },
        { cell: '法律依据', data: 15 },
        { cell: '裁判结果', data: 16 }
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
