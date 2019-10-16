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
        <el-table-column prop="publishdate" align="center" label="公告时间" width="130"></el-table-column>
        <el-table-column prop="party1" label="上诉方" min-width="180" header-align="center">
          <template slot-scope="scope">
            {{ scope.row.party1 || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="party2" label="被诉方" header-align="center" min-width="180">
          <template slot-scope="scope">
            {{ scope.row.party2 || '-' }}
          </template>
        </el-table-column>
        <el-table-column prop="bltntypename" label="公告类型" align="center" min-width="120">
        </el-table-column>
        <el-table-column prop="courtcode" label="法院" header-align="center" min-width="160">
          <template slot-scope="scope">
            {{ scope.row.courtcode || '-' }}
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
                {{ dialogList.publishdate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.party1 || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.party2 || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.bltntypename || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.courtcode || '-' }}
              </div>
            </template>
          </el-table-column>
        </el-table>
        <div class="credit-detail-title">法院公告内容</div>
        <div class="credit-detail-cnt">
          <label>公告内容</label>
          <div class="credit-detail-cnt__right">
            {{ dialogList.content }}
          </div>
        </div>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.fy) || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '刊登日期', data: 1 },
        { cell: '上诉方', data: 2 },
        { cell: '被诉方', data: 3 },
        { cell: '公告类型', data: 4 },
        { cell: '法院', data: 5 }
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
  .credit-detail-title {
    padding: 10px 0 10px 20px;
    font-weight: bold;
  }

  .credit-detail-cnt {
    border: 1px solid #eee;
    padding: 20px;
    position: relative;

    & > label {
      position: absolute;
    }

    .credit-detail-cnt__right {
      padding-left: 72px;
    }
  }
}
</style>
