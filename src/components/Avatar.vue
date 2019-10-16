<template>
  <div
    class="avatar-box"
    :style="{
      width: `${size}px`,
      height: `${size}px`,
      backgroundColor: `${background}`,
      color: `${color}`,
      borderRadius: `${radius}px`
    }"
  >
    <p class="avatar-box__name" :style="{ fontSize: `${size / 2}px`, backgroundImage: `url(${src})` }">
      <span v-if="!src">{{ placeholder }}</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    /**
     * 头像图片路径
     */
    src: {
      type: String
    },
    /**
     * 头像占位符
     * 当没有图片时候限制名字第一个字为占位符
     */
    name: {
      type: String,
      default: ''
    },
    /**
     * 头像大小
     */
    size: {
      type: [String, Number],
      default: 60
    },
    /**
     * 头像圆角
     * 足够大可变成圆
     */
    radius: {
      type: [String, Number],
      default: 100
    },
    /**
     * 背景颜色
     */
    background: {
      type: String,
      default: '#728197'
    },
    /**
     * 字体颜色
     */
    color: {
      type: String,
      default: '#fff'
    }
  },
  computed: {
    placeholder() {
      return this.name.substr(0, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.avatar-box {
  position: relative;
  display: inline-block;
  overflow: hidden;
  text-align: center;
}

.avatar-box__name {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 50%;
  left: 50%;
  line-height: 1;
  transform: translate(-50%, -50%);
  background-position: center center;
  background-size: cover;

  span {
    display: block;

    transform: translate(0, 50%);
  }
}
</style>
