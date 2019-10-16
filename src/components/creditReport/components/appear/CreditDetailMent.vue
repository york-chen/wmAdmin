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
        <el-table-column prop="name" header-align="center" label="姓名" min-width="100">
          <template slot-scope="scope">
            <avatar class="ui-fl" :name="scope.row.name" size="24"></avatar>
            <span class="credit-detail-name credit-color__blue">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="position" align="center" label="职务" min-width="140"></el-table-column>
        <el-table-column prop="numberOfShares" align="center" label="持股数" width="120"></el-table-column>
        <el-table-column prop="age" align="center" label="年龄" width="90"></el-table-column>
        <el-table-column prop="education" align="center" label="学历" width="120"></el-table-column>
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
                {{ dialogList.name || '-' }}
              </div>
              <div v-else-if="scope.row.data === 2">
                {{ dialogList.position || '-' }}
              </div>
              <div v-else-if="scope.row.data === 3">
                {{ dialogList.numberOfShares || '-' }}
              </div>
              <div v-else-if="scope.row.data === 4">
                {{ dialogList.reportDate || '-' }}
              </div>
              <div v-else-if="scope.row.data === 5">
                {{ dialogList.term || '-' }}
              </div>
              <div v-else-if="scope.row.data === 6">
                {{ dialogList.sex || '-' }}
              </div>
              <div v-else-if="scope.row.data === 7">
                {{ dialogList.age || '-' }}
              </div>
              <div v-else-if="scope.row.data === 8">
                {{ dialogList.education || '-' }}
              </div>
              <div v-else-if="scope.row.data === 9">
                {{ dialogList.salary || '-' }}
              </div>
              <div v-else-if="scope.row.data === 10">
                {{ dialogList.resume || '-' }}
              </div>
              <div v-else-if="scope.row.data === 11">
                {{ dialogList.company_name || '-' }}
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
import avatar from 'components/Avatar'
import creditSub from '../CreditCntSub'

export default {
  mixins: [dialogMixin],
  components: {
    avatar,
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
      return this.detail.seniorExecutive || []
    }
  },
  data() {
    return {
      dialogVisible: false,
      dialogList: {},
      dialogTable: [
        { cell: '高管名称', data: 1 },
        { cell: '职务', data: 2 },
        { cell: '持股数', data: 3 },
        { cell: '报告期', data: 4 },
        { cell: '本届任期', data: 5 },
        { cell: '性别', data: 6 },
        { cell: '年龄', data: 7 },
        { cell: '学历', data: 8 },
        { cell: '薪酬', data: 9 },
        { cell: '简历', data: 10 },
        { cell: '公司名称', data: 11 }
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
