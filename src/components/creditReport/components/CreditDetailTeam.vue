<template>
  <ul class="credit-team">
    <li>
      <avatar name="折扣" src="https://file.iviewui.com/asd/asd-learning-vue.png" />
    </li>
  </ul>
</template>

<script>
import avatar from 'components/Avatar'
export default {
  components: {
    avatar
  },
  props: {
    data: {
      type: [Array, Object]
    }
  },
  data() {
    return {
      tableData: [{ cell2: '法定代表人', cell3: '100%', cell4: '详情' }]
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-team {
}
</style>
