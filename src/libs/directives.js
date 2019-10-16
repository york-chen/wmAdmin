// ---------------------------------------------------
// #directive 自定义指令
// ---------------------------------------------------
import store from '@/store'

export default Vue => {
  /**
   * 滑动屏幕，超出距离显示“返回顶部”按钮
   * v-scroll-show
   */
  Vue.directive('scroll-show', {
    inserted(el, binding) {
      let scope = binding.value || 500
      document.querySelector('.wrap-bg').addEventListener('scroll', function() {
        if (this.scrollTop > Number(scope)) {
          el.style.display = 'block'
        } else {
          el.style.display = 'none'
        }
      })
    }
  })

  /**
   * 点击返回顶部
   * v-back-top
   */
  Vue.directive('back-top', {
    inserted(el, binding) {
      let e = binding.arg || 'click'

      el.addEventListener(e, () => {
        let scrollToptimer = setInterval(() => {
          let top = document.querySelector('.wrap-bg').scrollTop
          let speed = top / 4

          top -= speed
          document.querySelector('.wrap-bg').scrollTop = top
          if (top === 0) {
            clearInterval(scrollToptimer)
          }
        }, 20)
      })
    }
  })
}
