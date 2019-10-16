<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <p v-if="data.length > 0">
        已列入发展改革委受惩黑名单:被有关部门（单位）认定有违法事实或已产生实质失信行为后，纳入发改委联合惩戒黑名单。
      </p>
      <p v-else>未列入发展改革委受惩黑名单。</p>
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
    data() {
      return (this.detail.entUntrusted && this.detail.entUntrusted.dp) || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  p {
    padding: 20px;
  }
}
</style>
