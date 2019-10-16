// ---------------------------------------------------
// #企业信用报告mixin
// ---------------------------------------------------

/**
 * [详情弹窗状态管理]
 * @param {Boolen} dialogVis      弹窗状态管理
 */
export const dialogMixin = {
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    /**
     * [bindShow 显示弹窗]
     */
    bindShow() {
      this.dialogVisible = true
    },

    /**
     * [bindClose 关闭弹窗]
     */
    bindClose() {
      this.dialogVisible = false
    }
  }
}
