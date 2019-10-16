<template>
  <div class="ver-pic-box">
    <div :class="className" v-html="svg" :style="{ height: `${this.height}px` }" @click="refresh"></div>
  </div>
</template>

<script>
import { $axGetVerifyCode } from '@/_axios/api/common'

export default {
  name:'verifycode',
  props: {
    value: [Number, String],
    className: [String],
    /**
     * 图片宽度
     */
    width: {
      type: Number,
      default: 120
    },
    /**
     * 图片高度
     */
    height: {
      type: Number,
      default: 44
    }
  },
  data() {
    return {
      svg: ''
    }
  },
  methods: {
    /**
     * 刷新验证码
     * ref components
     */
    refresh() {
      this.loadPicVer()
    },

    /**
     * [loadPicVer 加载验证图片]
     * @return
     */
    loadPicVer() {
      $axGetVerifyCode({
        width: this.width,
        height: this.height - 10,
        type:'math'
      })
        .then(res => {
          this.svg = res
        })
        .catch(() => {})
    }
  },
   mounted() {
    this.loadPicVer()
  }
}
</script>

<style scoped>
.ver-pic-box {
  cursor: pointer;
  background-color: #fff;
}
</style>
