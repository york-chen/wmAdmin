<template>
  <scrollactive scrollContainerSelector=".wrap-bg" highlightFirstItem :offset="offset" class="scroll-tab credit-clearfix">
    <a
      v-for="(item, i) in tags"
      :key="i"
      :href="`#${item.id}`"
      class="scrollactive-item scroll-tab-item"
      @click="bindToggleTab(tags.length)"
    >
      <span>{{ item.title }}</span>
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
     * tag菜单
     */
    tags: {
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
     * [bindToggleTab 点击切换tab]
     */
    bindToggleTab(index) {
      this.$emit('toggle', {
        type: 'tag',
        index
      })
    }
  }
}
</script>

<style lang="scss" scoped>
$tagGap: 6px;

.scroll-tab {
  margin-left: -$tagGap;
  margin-right: -$tagGap;
  margin-top: $tagGap * 2;

  .scroll-tab-item {
    float: left;
    margin-top: $tagGap * 2;
    margin-left: $tagGap;
    margin-right: $tagGap;
    padding-left: 10px;
    padding-right: 10px;
    height: 36px;
    overflow: hidden;
    line-height: 1.2;
    border: 1px solid #ddd;
    width: 132px;
    text-align: center;
    font-size: 13px;
    color: #7d8ca1;
    text-decoration: none;

    & > span {
      display: block;
      position: relative;
      top: 50%;
      transform: translate(0%, -50%);
    }
  }

  .is-active {
    color: #436FFF;
    border-color: #436FFF;
  }
}
</style>
