<template>
  <div class="back-top-main">
    <div class="back-top-layout">
      <div class="back-top-icon" title="返回顶部">
        <el-tooltip effect="dark" content="返回顶部" placement="left">
          <div class="back-top-icon__item"></div>
        </el-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
$imgH: 40px;

.back-top-main {
  position: fixed;
  display: none;
  width: 100%;
  height: 0;
  bottom: 160px;
  left: 0;
  z-index: 60;

  .back-top-layout {
    display: block;
    height: 0;
    min-width: 980px;
    max-width: 1160px;
    margin: auto;
    text-align: right;
  }

  .back-top-icon {
    display: inline-block;
    position: relative;
    right: -($imgH + 40);
    width: $imgH;
    height: $imgH;
    background-color: #fff;
    border: 1px solid #e5e5e5;
    cursor: pointer;

    &:hover {
      opacity: 0.7;
    }
  }

  .back-top-icon__item {
    display: block;
    width: 100%;
    height: 100%;
    background-size: 64%;
    margin-top: 1px;
    opacity: 0.8;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAC2klEQVR4Xu2aPYsUQRCGn1MDMdHMjz/gP5BDRFAUEUEQjBQ5DA4zYxNjwcQ/oCCKoqAmfoCBJpocBpcfhsppKIioiVLQA81u9073dHU3s9MTLUxXbb1PV9X2x64w8Wdl4vppAFoGTJxAK4GJJ0BQEzwLXAP2jRDWB+Dmorj7SuAg8AXYMULxXcingHe++PsAHAC+jhzAeeDlUABidxW4A+wdWRb8Bp4B64B8dj59GTAyzfHhNgDxzJbLomVAxfk8brrzHmANeFwjlloZcAx4C4h4ef4BV4BHpSHUADArvtNcBUJpAD7x1SCUBNAnvgqEUgBCxReHUAKAS/x7YDdw1Cj+Drwxy+6iEHID8Ik/B7wGThq134BDwL3SEHICWCReNieyRbUByNZb4ikKIRcAl/iPwGlrZ+YCIAlRFEIOAD7xZ4Bf1kLHB6CD8BC4bI3Psk7QBhAqXnQtAiDv5RTqQW4ImgBixIcAKAJBC0Cs+FAA2SFoAHCJ3zAd3q752X1OXwnY46UcngIXtXtCKgCfeDmJ/dmzs4sBIK52Ak+0IaQASBEfUwI2R3UIQwGkih8KQD0ThgDQEJ8CQBVCLAAt8akAOggvALn4GLyBigHgEr8JyNleX8Nz9cPYJujysQt4ngIhFIBP/AngR0+3973WACC+kyCEAFg1y9buAFO+VGY+RbxGCdhgfRAumZ9O7xyFAJA6u2B50BCvDcCXCVvA4UUZGgLgFnDDONESnwNAB+EVIDtPeeRW2G6ScyxCAMji4zogpzaSDX8G1vysmVYPmPVrxysN8m9qBijpnXOTC0BUvCEZEOUwYnAD4DgTjOCnM7RlgA7HQV5aCbQSmL8XGJRKKUatB6TQS7RtPaD1gNYD5i5HE6sq3rw1wXhmahaTb4L3zf8Dhegn4Iga2ghHNUtgP3AX2AZuA58j4lYbWhOAmogURw1ACr1lsG0ZsAyzmKKhZUAKvWWw/Q/N29dBSxB38AAAAABJRU5ErkJggg==');
  }
}
</style>
