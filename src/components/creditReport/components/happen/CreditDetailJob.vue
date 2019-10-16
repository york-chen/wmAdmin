<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <div class="credit-detail-hidden">
        <el-row v-for="(item, i) in data" :key="i" class="credit-detail-job">
          <el-col :span="12">
            <div class="credit-job-title">{{ item.title }}</div>
            <div class="credit-job-info">
              <span class="credit-job-info__pirce">{{ item.ori_salary }}</span>
              <span class="credit-job-info__tag">{{ item.source }}</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="credit-job-title">{{ item.company_name }}</div>
            <div class="credit-job-info credit-job-span">
              <span>city</span>
              |
              <span>{{ item.class }}</span>
              |
              <span>{{ item.education }}</span>
            </div>
            <div class="credit-job-info">{{ item.endDate }}</div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import creditSub from '../CreditCntSub'

export default {
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
      return this.detail.recruitments || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-job {
    border: 1px solid #eee;
    margin-top: 20px;
    padding: 14px;
  }

  .credit-job-title {
    font-size: 16px;
  }

  .credit-job-info {
    margin-top: 10px;
  }

  .credit-job-info__pirce {
    color: #f40;
  }

  .credit-job-info__tag {
    margin-left: 6px;
    border: 1px solid #eee;
    color: #999;
    font-size: 12px;
    padding: 2px 8px;
  }

  .credit-job-span {
    font-size: 13px;
    color: #999;

    span {
      margin-right: 6px;
    }
  }
}
</style>
