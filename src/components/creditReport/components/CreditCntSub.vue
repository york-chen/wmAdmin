<template>
  <div class="credit-report-title">
    {{ title || '' }}
    <label v-if="length > 0">- 共 {{ length }} 条数据</label>
    <label class="credit-report-remark" v-if="remark">{{ remark }}</label>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    length: {
      type: Number,
      default: 0
    },
    remark: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-report-title {
  position: relative;
  font-size: 14px;
  font-weight: bold;
  margin-top: 32px;
  line-height: 1;
  padding-left: 18px;

  span {
    color: #a0a0a0;
    font-size: 12px;
    font-weight: normal;
    margin-left: 20px;
  }

  &::before {
    content: '';
    position: absolute;
    width: 4px;
    height: 4px;
    background-color: #c7a47b;
    left: 4px;
    bottom: 5px;
  }

  .credit-report-remark {
    color: #f40;
    font-weight: normal;
  }
}
</style>
