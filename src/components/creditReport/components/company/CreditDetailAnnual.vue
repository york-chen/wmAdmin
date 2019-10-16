<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <el-row :gutter="20" class="credit-detail">
      <el-col :span="4" v-for="(item, i) in data" :key="i">
        <div class="credit-list">
          <img class="credit-list__bg" :src="imgs[i % 3]" />
          <p class="credit-list__year">{{ item.report_year }}年报</p>
          <div class="credit-list__bottom">
            <el-button type="text" @click="viewAnnualReport(item.report_year)">查看详情</el-button>
          </div>
        </div>
      </el-col>
      <el-col v-if="data.length < 1">
        <div class="credit-nodata">暂无年报数据</div>
      </el-col>
    </el-row>
    <el-dialog
            title="企业年报详情"
            width="60%"
            :visible.sync="showDialog">
      <annualReportDetail :year="viewYear" v-if="showDialog"/>
    </el-dialog>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import creditSub from '../CreditCntSub'
import creditBlue from '@/assets/images/credit/credit-bg-blue.png'
import creditGreen from '@/assets/images/credit/credit-bg-green.png'
import creditPurple from '@/assets/images/credit/credit-bg-purple.png'
import annualReportDetail from '@/components/creditReport/components/company/CreditDetailAnnualDetail'
export default {
  components: {
    creditSub,annualReportDetail
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
      detail:'detail'
    }),
    // 主要人员
    data() {
      return this.detail.annualReport || []
    }
  },
  data() {
    return {
      creditBlue,
      creditGreen,
      creditPurple,
      imgs: [creditBlue, creditGreen, creditPurple],
      showDialog:false,
      viewYear:''
    }
  },
  methods:{
    viewAnnualReport(year){
      this.showDialog = true;
      this.viewYear = year;
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  margin-top: 20px;
  .credit-list {
    position: relative;
    border: 1px solid #f0f0f0;
    height: 140px;
    padding-top: 16px;
    text-align: center;
    background-color: #f2f3f4;
  }

  .credit-list__year {
    position: absolute;
    left: 0;
    right: 0;
    top: 46px;
    font-size: 14px;
    color: #fff;
  }

  .credit-list__bg {
    height: 100%;
  }

  .credit-list__bottom {
    position: absolute;
    bottom: 0;
    line-height: 44px;
    background-color: #fff;
    width: 100%;
    box-shadow: 0 -2px 1px rgba(0, 0, 0, 0.05);

    a {
      color: #0063d3;
    }
  }
}
</style>