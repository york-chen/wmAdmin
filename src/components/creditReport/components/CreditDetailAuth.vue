<template>
  <div v-if="show">
    <slot></slot>
  </div>
  <div v-else class="credit-auth">
    <div class="clearfix credit-auth-mask">
      <div class="credit-auth-title">专业版可查看该内容，购买<span>专业版报告</span>请联系</div>
      <div class="credit-auth-about">
        <p><span>联系我们</span></p>
        <p>电话: 010-56081553</p>
        <p>邮箱: service@cycredit.com.cn</p>
        <p>地址: 北京市海淀区致真大厦B座6层</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: [Boolean]
    }
  }
}
</script>

<style lang="scss" scoped>
.clearfix::before,
.clearfix::after {
  content: '';
  display: table;
}

.clearfix::after {
  clear: both;
}

.credit-auth {
  position: relative;
  overflow: hidden;
  margin-top: 20px;
  border: 1px solid #eee;
  min-height: 300px;
  width: 100%;
  background-image: url('../../../assets/images/credit/credit-bg-auth.png');
  background-repeat: no-repeat;
  background-size: 100%;

  .credit-auth-mask {
    position: absolute;
    padding: 46px;
    z-index: 9;
    top: 20%;
    bottom: 20%;
    left: 80px;
    right: 80px;
    box-shadow: 0 0 26px rgba(0, 0, 0, 0.2);
    background-color: #fff;
  }

  .credit-auth-title {
    float: left;
    font-size: 14px;
    margin-top: 30px;
    width: 50%;
    text-align: right;

    span {
      font-size: 18px;
      color: #a57e4a;
    }
  }

  .credit-auth-about {
    float: left;
    border-left: 2px solid #eee;
    text-align: left;
    padding-left: 24px;
    margin-left: 50px;

    span {
      color: #a57e4a;
      display: block;
      margin-bottom: 4px;
    }
  }
}
</style>
