<template>
  <scrollactive scrollContainerSelector=".wrap-bg" highlightFirstItem :offset="offset" class="scroll-tab" @itemchanged="onItemChanged">
    <a
      v-for="(item, i) in tabs"
      :key="i"
      :href="`#${item.id}`"
      class="scrollactive-item scroll-tab-item"
      @click="bindToggleTab(i)"
    >
      <span class="">{{ item.title }}</span>
    </a>
  </scrollactive>
</template>

<script>
import Vue from 'vue'
import Scrollactive from 'vue-scrollactive'

Vue.use(Scrollactive)

export default {
  props: {
    /**
     * tab菜单
     */
    tabs: {
      type: Array
    },

    /**
     * 顶部距离
     */
    offset: {
      type: [String, Number]
    }
  },
  methods: {
    /**
     * [onItemChanged 监控事件]
     * @emit  change
     */
    onItemChanged(event, currentItem) {
      let uid = currentItem.getAttribute('href')

      uid = uid.substr(1)
      this.$emit('change', uid)
    },

    /**
     * [bindToggleTab 点击切换tab]
     */
    bindToggleTab(index) {
      this.$emit('toggle', {
        type: 'tab',
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.scroll-tab {
  border-bottom: 1px solid #e0e0e0;
  text-align: center;

  .scroll-tab-item {
    display: inline-block;
    height: 50px;
    line-height: 50px;
    padding-left: 12px;
    padding-right: 12px;
    margin-left: 14px;
    margin-right: 14px;
    color:#888;
    text-decoration: none;
  }

  .is-active {
    color: #436FFF;
    border-bottom: 2px solid #436FFF;
    margin-bottom: -1px;
  }
}
</style>
