<template>
  <div>
    <div class="credit-report-hd">
      {{ title || '' }}
      <label v-if="length && length > 0">- 共 {{ length }} 条数据</label>
    </div>
    <div class="credit-nodata"><i class="el-icon-document"></i> 暂无数据</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    length: {
      type: [String, Number]
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-report-hd {
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
}
</style>
