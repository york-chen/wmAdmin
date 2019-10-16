<template>
  <div>
    <credit-sub :title="title" />
    <ul class="credit-detail">
      <li class="credit-li">
        <div class="credit-li__hd">清算组负责人</div>
        <div class="credit-li__fd">-</div>
      </li>
      <li class="credit-li">
        <div class="credit-li__hd">清算组成员</div>
        <div class="credit-li__fd">-</div>
      </li>
    </ul>
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
      return (this.detail.entUntrusted && this.detail.entUntrusted.qs) || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  border: 1px solid #eee;
  margin: 20px 0;

  .credit-li {
    border-bottom: 1px solid #eee;
    position: relative;
    line-height: 40px;

    &:last-child {
      border: 0;
    }

    .credit-li__hd {
      position: absolute;
      left: 0;
      width: 174px;
      color: #475262;
      text-align: center;
      border-right: 1px solid #eee;
      background-color: #f5f7fa;
    }

    .credit-li__fd {
      padding-left: 174px + 20px;
    }
  }
}
</style>
