<template>
  <div>
    <credit-sub :title="title" :length="data.length" />
    <div class="credit-detail">
      <div v-if="data.length < 1" class="credit-nodata">暂无数据</div>
      <el-row :gutter="20" class="credit-detail-work" v-else>
        <el-col :span="6" class="credit-detail-work__col" v-for="(item, i) in data" :key="i">
          <div class="credit-detail-work__item">
            <avatar class="credit-detail-work__avatar" size="44" :name="item.product" />
            <div class="credit-detail-work__comp">
              <h3 class="credit-color__blue">{{ item.product }}</h3>
              <p>{{ item.yewu }}</p>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import avatar from 'components/Avatar'
import creditSub from '../CreditCntSub'

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
    data() {
      return this.detail.product || []
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-detail {
  .credit-detail-work {
    margin-top: 20px;
  }

  .credit-detail-work__col {
    margin-bottom: 20px;
  }

  .credit-detail-work__item {
    position: relative;
    border: 1px solid #eee;
    padding: 20px 24px;
  }

  .credit-detail-work__comp {
    padding-left: 62px;

    h3 {
      font-size: 16px;
      line-height: 1.3;
    }

    p {
      font-size: 13px;
      margin-top: 4px;
    }
  }

  .credit-detail-work__avatar {
    position: absolute;
  }
}
</style>
