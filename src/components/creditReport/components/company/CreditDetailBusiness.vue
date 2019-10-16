<template>
  <div>
    <credit-sub :title="title" />
    <div class="credit-detail">
      <el-table class="credit-detail-table" :data="topData" border>
        <el-table-column label="法定代表人" header-align="center" prop="cell1" min-width="200">
          <template slot-scope="scope">
            <div class="credit-comp-info" :alt="scope.row">
              <avatar class="credit-comp-avatar" size="48" :name="company.legal_name" />
              <h1>{{ company.legal_name || '-' }}</h1>
              <!-- <p>他在 <span class="credit-color__red">1</span> 家公司任职，分布如下：</p> -->
            </div>
            <!-- <ul class="credit-comp-list">
              <li>
                广东（共 <span class="credit-color__red">1</span>家）
                <span class="ui-fr">深圳市国微电子有限公司等</span>
              </li>
            </ul> -->
          </template>
        </el-table-column>
        <el-table-column label="注册信息" align="center" prop="cell2" width="270">
          <ul class="credit-comp-reg">
            <li class="credit-comp-reg__item">
              <p>注册资本</p>
              <p>{{ company.reg_capital || '-' }}</p>
            </li>
            <li class="credit-comp-reg__item">
              <p>注册时间</p>
              <p>{{ company.es_time || '-' }}</p>
            </li>
            <li class="credit-comp-reg__item">
              <p>公司状态</p>
              <p class="credit-color__green">{{ company.ent_status }}</p>
            </li>
          </ul>
        </el-table-column>
        <el-table-column label="信用等级" align="center" prop="cell3" width="220">
          <div ref="manageCredit" class="credit-chart__box">
            <p class="credit-chart__leve">信用等级{{ score | formatCreditScore }}</p>
          </div>
        </el-table-column>
      </el-table>
      <el-table
        class="credit-detail-table credit-detail-top"
        :show-header="false"
        :data="tableData"
        :span-method="arraySpanMethod"
        border
      >
        <el-table-column prop="cell1" class-name="credit-table-cell" width="180"></el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 1">
              {{ company.reg_number || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 2">
              {{ company.ent_code || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 3">
              {{ company.tax_num || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ company.from_time || '-' }}至{{ company.to_time || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              -
            </div>
            <div v-else-if="scope.row.data1 === 6">
              {{ company.actual_capital || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 7">
              -
            </div>
            <div v-else-if="scope.row.data1 === 8">
              {{ company.reg_location || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 9">
              {{ company.business_scope || '-' }}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="cell2" class-name="credit-table-cell" width="180"> </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <div v-if="scope.row.data1 === 1">
              {{ company.org_number || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 2">
              {{ company.ent_type || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 3">
              <span v-for="(v, k) of company.category" :key="k">{{ v }},</span>
            </div>
            <div v-else-if="scope.row.data1 === 4">
              {{ company.approved_time || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 5">
              -
            </div>
            <div v-else-if="scope.row.data1 === 6">
              {{ company.reg_institute || '-' }}
            </div>
            <div v-else-if="scope.row.data1 === 7">
              {{ company.English_name || '-' }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import avatar from 'components/Avatar'
import creditSub from '../CreditCntSub'
import G2 from '@antv/g2'

export default {
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
    // 公司背景
    company() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.basic) || {}
    },
    // 信用分
    score() {
      return (this.detail.report && this.detail.report.score) || 0
    }
  },
  data() {
    return {
      topData: [{ cell1: 1, cell2: 2, cell3: 3 }],
      tableData: [
        { cell1: '工商注册号', data1: 1, cell2: '组织机构代码', data2: 1 },
        { cell1: '统一社会信用代码', data1: 2, cell2: '公司类型', data2: 2 },
        { cell1: '纳税人识别号', data1: 3, cell2: '行业', data2: 3 },
        { cell1: '营业期限', data1: 4, cell2: '核准日期', data2: 4 },
        { cell1: '纳税人资质', data1: 5, cell2: '人员规模', data2: 5 },
        { cell1: '实缴资本', data1: 6, cell2: '登记机关', data2: 6 },
        { cell1: '参保人数', data1: 7, cell2: '英文名称', data2: 7 },
        { cell1: '注册地址', data1: 8 },
        { cell1: '经营范围', data1: 9 }
      ]
    }
  },
  methods: {
    arraySpanMethod({ rowIndex, columnIndex }) {
      if (columnIndex === 1) {
        if (rowIndex === 7 || rowIndex === 8) {
          return [1, 3]
        }
      }
    },

    /**
     * [initEchart 初始化Echart]
     */
    initEchart() {
      const score = this.score
      const data = [{ gender: 'data', value: 35 }]
      const el = this.$refs.manageCredit
      const chart = new G2.Chart({
        container: el,
        animate: false,
        width: 140,
        height: 140,
        padding: '-34%'
      })
      chart.source(data, {
        value: {
          min: 0,
          max: 100
        }
      })
      chart
        .legend(false)
        .axis(false)
        .tooltip(false)
      chart
        .interval()
        .position('gender*value')
        .color('#436FFF')
        .shape('liquid-fill-gauge')
        .style({
          lineWidth: 4
        })

      chart.guide().text({
        top: true,
        position: {
          gender: 'data',
          value: 58
        },
        content: score.toString(),
        style: {
          fontSize: 32,
          textAlign: 'center'
        }
      })
      chart.render()
    }
  },
  mounted() {
    setTimeout(() => {
      this.initEchart()
    }, 2000)
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
.credit-detail {
  .credit-detail-hd .credit-table-cell__info {
    padding-left: 20px;
    margin-top: 6px;

    p {
      line-height: 1.4;
      margin-bottom: 6px;
    }

    span {
      color: #f40;
    }

    .credit-table-cell__info--span {
      color: #888;
    }
  }

  .credit-comp-info {
    margin-top: 20px;
    padding-left: 100px;
    padding-right: 20px;
    min-height: 50px;
    position: relative;

    > h1 {
      line-height: 1;
      padding-top: 14px;
    }

    > p {
      padding-top: 4px;
    }

    .credit-comp-avatar {
      position: absolute;
      left: 20px;
    }
  }

  .credit-comp-list {
    margin-top: 10px;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 10px;
  }

  .credit-comp-reg {
    height: 100%;
    margin: -8px -20px;

    .credit-comp-reg__item {
      height: 33%;
      border-bottom: 1px solid #eee;
      padding: 10px;

      > p {
        line-height: 1.6;
      }

      &:last-child {
        border-bottom: 0;
      }
    }
  }

  .credit-chart__box {
    width: 140px;
    height: 140px;
    margin: auto;
    position: relative;
  }

  .credit-chart__leve {
    width: 100%;
    top: 50%;
    position: absolute;
    text-align: center;
    color: #436FFF;
  }

  .credit-table-cell__label {
    color: #aaa;
  }

  .credit-table-cell__a {
    color: #0063d3;
  }
}
</style>
