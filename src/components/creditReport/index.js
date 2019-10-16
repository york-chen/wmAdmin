import Vue from 'vue'
import {createNamespacedHelpers} from 'vuex'

const {mapState, mapActions} = createNamespacedHelpers('creditReport');
import { Affix } from 'vue-affix'
import Scrollactive from 'vue-scrollactive'
import backTop from 'components/BackTop'
// 报告详情模块
import affixTab from './components/CreditAffixTab'
import affixTag from './components/CreditAffixTag'
import creditTitle from './components/CreditCntTitle'
import creditTop from './components/CreditCntTop'
import creditCompany from './components/CreditCntCompany'
import detailEmpty from './components/CreditCntEmpty'
// 报告详情数据 - 公司背景
import detailBusiness from './components/company/CreditDetailBusiness'
import detailStaff from './components/company/CreditDetailStaff'
import detailPartner from './components/company/CreditDetailPartner'
import detailBene from './components/company/CreditDetailBene'
import detailControl from './components/company/CreditDetailControl'
import detailForeign from './components/company/CreditDetailForeign'
import detailAnnual from './components/company/CreditDetailAnnual'
import detailMechanism from './components/company/CreditDetailMechanism'
import detailRecord from './components/company/CreditDetailRecord'
// 报告详情数据 - 司法风险
import detailOpencourt from './components/judicial/CreditDetailOpencourt'
import detailLitigation from './components/judicial/CreditDetailLitigation'
import detailCourt from './components/judicial/CreditDetailCourt'
import detailLost from './components/judicial/CreditDetailLost'
import detailExecutive from './components/judicial/CreditDetailExecutive'
import detailAssist from './components/judicial/CreditDetailAssist'
// 报告详情数据 - 经营风险
import detailAbnormal from './components/manage/CreditDetailAbnormal'
import detailPenalti from './components/manage/CreditDetailPenalti'
import detailSerious from './components/manage/CreditDetailSerious'
import detailQuality from './components/manage/CreditDetailQuality'
import detailChattel from './components/manage/CreditDetailChattel'
import detailOwed from './components/manage/CreditDetailOwed'
import detailSale from './components/manage/CreditDetailSale'
import detailExpose from './components/manage/CreditDetailExpose'
import detailNotice from './components/manage/CreditDetailNotice'
// 报告详情数据 - 公司发展
import detailFinanfis from './components/growing/CreditDetailFinanfis'
import detailTeam from './components/growing/CreditDetailTeam'
import detailWork from './components/growing/CreditDetailWork'
import detailFund from './components/growing/CreditDetailFund'
import detailProd from './components/growing/CreditDetailProd'
// 报告详情数据 - 经营状况
import detailLic from './components/happen/CreditDetailLic'
import detailTaxes from './components/happen/CreditDetailTaxes'
import detailBid from './components/happen/CreditDetailBid'
import detailLand from './components/happen/CreditDetailLand'
import detailSupply from './components/happen/CreditDetailSupply'
import detailJob from './components/happen/CreditDetailJob'
// 报告详情数据 - 知识产权
import detailBook from './components/equity/CreditDetailBook'
import detailRight from './components/equity/CreditDetailRight'
import detailCopy from './components/equity/CreditDetailCopy'
// 报告详情数据 - 财务分析
import detailFinan from './components/analyse/CreditDetailFinan'

// 数据
import { affixTabData, affixBasicTabData, affixTagData, affixBasicTagData } from './tabsData.js'
import './style.scss'

Vue.use(Scrollactive)

export default {
  components: {
    Affix,
    backTop,
    affixTab,
    affixTag,
    creditTitle,
    creditTop,
    creditCompany,
    detailEmpty,
    detailBusiness,
    detailStaff,
    detailPartner,
    detailBene,
    detailControl,
    detailForeign,
    detailAnnual,
    detailMechanism,
    detailRecord,
    detailOpencourt,
    detailLitigation,
    detailCourt,
    detailLost,
    detailExecutive,
    detailAssist,
    detailAbnormal,
    detailPenalti,
    detailSerious,
    detailQuality,
    detailChattel,
    detailOwed,
    detailSale,
    detailExpose,
    detailNotice,
    detailFinanfis,
    detailTeam,
    detailWork,
    detailFund,
    detailProd,
    detailLic,
    detailTaxes,
    detailBid,
    detailLand,
    detailSupply,
    detailJob,
    detailBook,
    detailRight,
    detailCopy,
    detailFinan
  },
  props:{
    name:{
      type:String,
      default:'',
      require:true
    }
  },
  data() {
    return {
      tabs: affixTabData,
      tabBasic: affixBasicTabData,
      tags: [],
      tagBasic: [],
      tabFixed: false,
      affixOffset: 180,
      loading: false,
      getNum: 0
    }
  },
  computed: {
    ...mapState({
      // 企业报告报告总数据
      detail: 'detail'
    }),
    // 公司背景
    company() {
      return this.detail.induBusiSimp || {}
    }
  },
  methods: {
    ...mapActions({
      getReport: 'sendQueryCreditReport'
    }),
    /**
     * [tabToggle 切换tab]
     * @param {String} type   tab: 点击的是tab栏; tag: 点击tag标签
     * @param {Number} index  tab状态下为序号，tag状态下为个数
     * 动态计算affixtab的高度
     */
    tabToggle({ type, index }) {
      let tagLen = type === 'tab' ? affixTagData[affixTabData[index].id].length : index

      if (tagLen % 6 === 0) {
        tagLen -= 1
      }
      this.affixOffset = (parseInt(tagLen / 6) + 1) * 38 + 104
    },

    /**
     * [tabChange 监控tab]
     * 根据当前tab锚点id获取tag数据
     * @param {String} uid  当前id
     */
    tabChange(uid) {
      this.tags = affixTagData[uid]
      this.tagBasic = affixBasicTagData[uid]
    },

    /**
     * [loadData 加载报告详情页数据]
     */
    loadData() {
      if (this.getNum < 1) {
        this.loading = true
      }
      this.getReport({ name: this.name })
        .then(() => {
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    }
  },

  /**
   * 加载数据
   */
  async mounted() {
    this.loadData();
    // this.tabChange('company')
  }
}
