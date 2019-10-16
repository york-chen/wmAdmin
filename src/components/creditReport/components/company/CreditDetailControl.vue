<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <detail-auth show>
      <div class="credit-detail">
        <el-table
          class="credit-list-table credit-table-hidden"
          :data="data"
          border
          :max-height="$config.tableHeight"
        >
          <el-table-column label="序号" type="index" :index="1" align="center" width="70"></el-table-column>
          <el-table-column
            prop="info.ent_name"
            label="被投资企业名称"
            width="300"
            class-name="credit-color__blue"
          >
            <template slot-scope="scope">
              <a :href="`/report?name=${scope.row.info.ent_name}`" target="_blank">
                {{ scope.row.info.ent_name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column
            prop="investo_ratio"
            align="center"
            label="持股比例"
            class-name="credit-color__red"
            width="120"
          ></el-table-column>
          <el-table-column prop="childs" header-align="center" label="投资链">
            <template slot-scope="scope">
              <div class="credit-chain-ov">
                <div class="credit-chain" v-for="(list, index) in formatRow(scope.row)" :key="index">
                  <h4 class="credit-chain__title">路径{{ index + 1 }}</h4>
                  <div class="credit-chain__list" v-for="(item, i) in list" :key="i">
                    <a class="credit-chain__name" :href="`/report?name=${item.title}`" target="_blank">
                      {{ item.title }}
                    </a>
                    <div class="credit-chain__arrow" v-if="item.ratio && item.ratio !== ''">
                      {{ item.ratio }}<span class="credit-chain__arrow--icon"></span>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </detail-auth>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import detailAuth from '../CreditDetailAuth'
import creditSub from '../CreditCntSub'

export default {
  components: {
    detailAuth,
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
      return (this.detail.entInvest && this.detail.entInvest.received_invest) || []
    }
  },
  data() {
    return {
      // 最终受益人类型： A: 全部数据；B: 自然人；C: 企业法人；
      tableData: [],
      temps: []
    }
  },
  methods: {
    /**
     * [formatRow 格式化最终受益人数据]
     */
    formatRow(row) {
      let convertListData = this.convertList([], row)

      // 添加最终受益人，最后一个节点
      convertListData.push({
        parentName: '',
        name: row.info.ent_name,
        info: row.info,
        childs: row.childs,
        investo_ratio: '',
        isLast: row.childs && row.childs.length < 1
      })

      return this.formatChain(convertListData)
    },

    /**
     * [convertList 将tree结构转换为list数组结构]
     */
    convertList(templist = [], tree) {
      tree.childs.map(item => {
        templist.push({
          parentName: tree.info.ent_name,
          name: item.info.ent_name,
          info: item.info,
          childs: item.childs,
          investo_ratio: item.investo_ratio || '-',
          isLast: item.childs && item.childs.length < 1
        })

        if (item.childs !== null && item.childs.length > 0) {
          this.convertList(templist, item)
        }
      })
      return templist
    },

    /**
     * [formatChain list数组格式化成链式结构]，
     * 结束节点一级级链接至最初始节点
     * A -> B -> C
     * 获取最终格式↓
     * [
     *  [
     *    [ 路径1 ],
     *    [ 路径2 ],
     *    [ 路径3 ]
     *  ],
     *  [
     *    [ 路径1 ],
     *    [ 路径2 ]
     *  ]
     * ]
     */
    formatChain(data) {
      let resData = []
      // 筛选结束节点的数据isLast = true
      let chainData = data.filter(item => item.isLast)

      // 遍历所有有父级节点的数据
      chainData.map(item => {
        const tempChains = []

        tempChains.push({
          title: item.name,
          ratio: item.investo_ratio
        })
        chainsMap(item.parentName)

        function chainsMap(parentName) {
          if (data.filter(i => i.name === parentName).length > 0) {
            let tempFilter = data.filter(i => i.name === parentName)[0]

            tempChains.push({
              title: tempFilter.name,
              ratio: tempFilter.investo_ratio
            })
            chainsMap(tempFilter.parentName)
          }
        }
        resData.push(tempChains)
      })
      return resData
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-radio {
    margin-top: 20px;
  }

  .credit-list-part {
    padding-left: 20px;
  }
}
</style>
