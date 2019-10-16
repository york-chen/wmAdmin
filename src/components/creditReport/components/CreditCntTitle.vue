<template>
  <div>
    <div class="credit-report-tip">
      {{ title || '' }}
    </div>
    <div><slot></slot></div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  }
}
</script>

<style lang="scss" scoped>
.credit-report-tip {
  position: relative;
  font-size: 16px;
  line-height: 40px;
  font-weight: bold;
  border-bottom: 1px solid #eee;
  margin-top: 26px;
  padding-left: 20px;

  &::before {
    content: '';
    position: absolute;
    left: 2px;
    bottom: 14px;
    display: block;
    width: 12px;
    height: 12px;
    background-size: 100%;
    background-repeat: no-repeat;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAUCAMAAACgaw2xAAAAgVBMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAABHcEwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABXPjvGAAAAK3RSTlO/JwQDmSKVAJweIWFJfpskXR9IZnlLnoFCIEMZjx2LC3Kwk0ANsnVtrhUJbkd1SQAAAH9JREFUGNO1kckOgkAQRMtBKUBRlMUVF0BZ/v8DgZAhPYkkeuBdX9JVqQYnAK0g2pONK6l7cQC2VBUM8k7EQEJ+HEnmdUKFx93XjMnw/4W19j3ysZJce7EBHKqXWfekBZ9Lye08npq37jBJsZCk1COqt1n3omdnaUvu7vio38NbKNEOCKpG7ukAAAAASUVORK5CYII=');
  }
}
</style>
