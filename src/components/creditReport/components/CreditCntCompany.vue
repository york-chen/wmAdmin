<template>
  <el-row :gutter="20" class="credit-company">
    <el-col :span="3">
      <avatar :name="company.ent_name" size="76" />
    </el-col>
    <el-col :span="21">
      <div class="clearfix">
        <h1 class="credit-report-cnt__title">{{ company.ent_name || '-' }}</h1>
        <!-- <ul class="credit-report-cnt__tag">
          <li>公司</li>
        </ul> -->
      </div>
      <!-- <div class="credit-introduction">-</div> -->
      <el-row :gutter="10">
        <el-col :span="12" class="credit-report-cell">
          <i class="credit-icon-deta ui-fl"></i>
          <label class="credit-report-lable ui-fl">联系电话：</label>
          <span class="credit-report-info ui-fl credit-text">{{ contact.telephone || '-' }}</span>
        </el-col>
        <el-col :span="12" class="credit-report-cell">
          <i class="credit-icon-map ui-fl"></i>
          <label class="credit-report-lable ui-fl">联系邮箱：</label>
          <span class="credit-report-info ui-fl credit-text">{{ contact.email || '-' }}</span>
        </el-col>
        <el-col :span="12" class="credit-report-cell">
          <i class="credit-icon-manage ui-fl"></i>
          <label class="credit-report-lable ui-fl">公司网址：</label>
          <span class="credit-report-info ui-fl credit-text">{{ contact.website || '-' }}</span>
        </el-col>
        <el-col :span="12" class="credit-report-cell">
          <i class="credit-icon-book ui-fl"></i>
          <label class="credit-report-lable ui-fl">公司地址：</label>
          <span class="credit-report-info ui-fl credit-text">{{ contact.address || '-' }}</span>
        </el-col>
        <el-col :span="24" class="credit-report-cell">
          <i class="credit-icon-add ui-fl"></i>
          <label class="credit-report-lable ui-fl">公司简介：</label>
          <span class="credit-report-info ui-fl credit-text">-</span>
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
  import {createNamespacedHelpers} from 'vuex'

  const {mapState} = createNamespacedHelpers('creditReport');
import avatar from 'components/Avatar'
export default {
  components: {
    avatar
  },
  computed: {
    ...mapState({
      // 企业报告报告总数据
      detail: 'detail'
    }),
    // 公司背景
    company() {
      return (this.detail.induBusiSimp && this.detail.induBusiSimp.basic) || {}
    },
    // 联系人信息
    contact() {
      return (this.detail.contact && this.detail.contact) || {}
    }
  }
}
</script>

<style lang="scss" type="text/scss" scoped>
@mixin iconImage() {
  display: inline-block;
  background-size: 100%;
  background-repeat: no-repeat;
  background-position: center center;
  width: 16px;
  height: 16px;
  margin-bottom: -3px;
  margin-right: 4px;
}

.credit-company {
  margin-bottom: 30px;
}

.credit-logo {
  border-radius: 200px;
  border: 1px solid #eee;
  background-color: #f0f0f0;
  overflow: hidden;
  width: 85px;
  height: 85px;
}

.credit-introduction {
  color: #888;
  margin-top: 10px;
  font-size: 13px;
}

.credit-text {
  width: 74%;
}

.credit-icon-map {
  @include iconImage();
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABL1BMVEX///+1tbXg4OD////r6+taWlqqqqpHcEwAAAD///9xcXH///////9mZmbm5ub///////////////////9DQ0P29vb////////////////09PQICAj///////9UVFT////////+/v7y8vL////v7+////8ODg46OjoWFhb///////////////////////////////////////////////////////////////////////////////////////////////////////+zs7P////////////////i4uL+/v75+fn///8DAwP///////////+FhYUPDw8FBQVXV1cHBwdHR0f////////////////39/cuLi43NzeTk5Pf3994eHhLS0u8vLwEBAQfHx9OTk7pBeP9AAAAZXRSTlO/kJZgnJmQAL8wlVp+lpm+Boo2hJ+iXSa6lqG6LpCaAxWzoKKcvbaisRgHEiROZqSPERoFnLE8AVs5dKUTjK4nHo1IkJ22IXGXr6iSvqtkt5K1vJm7npShbTSkp6OQlpOckL2tnN5kMq4AAAEkSURBVDjLndPXTsMwFIDhE5pxQoEE6KI0pYOWvfdeZe+9N+//DNghJg6xE4n/IsrFJx3L8gEjJqCfqaxZWJaDnkwOSM6kDGTAyqu9ZVhKeM0v2Dywc1YREesV8KvucCALeezX+jCls7bScGv7wAQVNWhCrosHuA+DJ4VVxHc6Z9spBEDz7wl0VH5+rNkgaCRpGwS41XVYnQuAFndogoCPbtIRHsC6BLgjNFTBlIKaFQOS7f8Bx520qhzw9yAAn62sRzHgU+DuJgS+2livsnvwz/CcJl2HgNNBO4EXb9DVPpQE91A6BeUtRbrcg2lDAIzNGps1MywExtruYRdpZXTIEIM/z5492jNYFAPv2Z9XYCRmccYGo1dvfEC+vDZZ3omo7Y7qG6w9LEUT2cpLAAAAAElFTkSuQmCC');
}

.credit-icon-book {
  @include iconImage();
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAMAAAAM7l6QAAAAdVBMVEUAAAC1tbWvr6////////////+qqqpHcEz///8ICAgdHR3///////////////+4uLj////////+/v7k5OT///////////+jo6P////////////////y8vL///+xsbG6urrLy8v////FxcX///////8EBARaWlopeaqTAAAAJ3RSTlO/kJBdumCQAL+6rhd/OrSQrlqvlzUIpZBbflxXobGQkJK2kCQ2vZnqPi6EAAAAvUlEQVQoz62Txw6DMAxATQvEkBD23nT8/yeWQiMBIaBKvEMuT7EtDyCHwPRGmbGlcGKhc9wjecz6ibw1tzQVJvGkS+xA5lWhM2rKauwHbcsbGiwIUL6bGDUw0SDAMLSlwHYotIc2WFvAFhoRLCmyBWutL5G0vuqkfrF2/LvAdyR9Vnng3gRuIOt00bL079/HuU8qv7xrA7SYqSfWdxwjdeUjOVFvS11G3zNQ7Rqbj0ixqZz+bowyT5Iemy35AEThGMxI3kfYAAAAAElFTkSuQmCC');
}

.credit-icon-manage {
  @include iconImage();
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAB2lBMVEX////+/v7///////+1tbX///+qqqpHcEwAAAAkJCT///////8EBASlpaXk5OT///////////8LCwv///////////+6urr8/PwRERH///8BAQH///8FBQX29vYDAwMICAj///////////////8KCgqFhYX///+amprr6+vQ0NBeXl7S0tLFxcU5OTkuLi5OTk7MzMz///////////////////////////////////9DQ0P///////////////////////93d3f///92dnb///8HBwfx8fF9fX2RkZH+/v7////////////Z2dkhISFHR0fFxcX8/Pxzc3MPDw8ZGRn////39/f7+/sxMTHd3d2vr6/29vaXl5f///////95eXnm5uYwMDDy8vKVlZUVFRVpaWlCQkL///8mJiYaGhpXV1cqKir////i4uIdHR3////b29v+/v7////////////////////////////////////////////////y8vKYmJjDw8P////y8vL09PT////BwcFAQEALCwttbW3///+Dg4Nubm4uLi4+Pj75+fm/v79NTU3////Ly8tgYGD+/v75+fn///////////9LS0tLS0v09PQ6Ojrt7e2NV3UgAAAAnnRSTlO/sL20kKmQAL+rWrm9kJlUolu4upktkK20uL9dvKK+urcZFia5koSQnJOYk5GippySEgl1ZQRjAX5JnwYDIjAHgZRBkw+7n5OQsaiskpSsnpCslLWwYKSrpZaQpZBva5OZpaGQspafWaqwmai+l654lq+gPjdNGxc/J6E4TqqikJGDoKBxkKC5lnKSlaegp5Ccu5KYtKaLirydnKGinMdooNkAAAInSURBVDjLhdPlWyJRFAbwlxnFFwFBkFZAEREDu7u7u7t7u93u7vxf946x6wq658vMe+c3z51n7jmI+U/h+KamqvLvamVVzSnQ+MwM2VVxGCpcMswPG0+AIoMMaRhor1dSfTswLEE2FB2Dm0Zgdo45SUCnz9cJJL3l3CxgvHQIioFPGWQi3X4VJAmq524R+OE1UKyA63BMJnIxS9Z7OGAFrAP06OWsRSZOOuATwIA31C3IAEaekoF98sWICB8XdHwEgwDxiKIe+DItVjOY+oQZ4mb6M6BnFGIFiBVAjSmLA3395NgY2d8Hh2UK6iMQfwCG0pBlepXNuDhmP07tRdrQKXCvA5oAlhSwhIAGHWn/AL/YFprg1+8K+PYuqFGy/wjcQpDseSDAzAadP+ad3JgR4H4PmYnLAlyR0NVNZ0u6nfz5C0jPJu3pLU52d0FKVv7kNS20ahPJwdzNrVBoa/P9oAgmtVi+eHgWV0sBW4OpqXdiXTzh+sTdptQGG1Ca8ue4LQnio+p0Oq7l5q5Rp6sTMcFysh9KyrQoF2+PS9K4uJRDW1ZyqqNuQ8Nmq3101G5tpgbRYS0XLYAKba2tbVCdAw7qPLCys7NyDrDB63J5YYsIjHjJ1V1lh91VhmAMAwWYX6Zo3KQccvkOCsJA3g0gc5tuN7czgQt5YSAmv9AMr97j0XthLswPHz1RybXA3h5QmxxpNg+qWpxJQnXk4T2qlJSzpvus+g16WV8XzNf8YQAAAABJRU5ErkJggg==');
}

.credit-icon-deta {
  @include iconImage();
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAABKVBMVEUAAAD+/v78/Pw3Nzf///8cHBwsLCxHcEz///8kJCT5+fkICAj///9LS0vy8vIDAwMmJib+/v7///////9OTk6ampr6+vr///8hISGPj4/k5OT///8EBAT////o6Oj///////8RERH09PT///8fHx+/v78FBQX////////39/fv7+8pKSn////////8/Pw5OTmhoaH////r6+v////////////////Q0NAUFBRvb2////9DQ0P///////////////////////////////9aWlr////////////////v7+9JSUmcnJwLCwvIyMjBwcH09PT////////////29vYqKipXV1dzc3MWFhZmZmb8/Pz///////////////////////8ODg4PDw/////i+ABhAAAAY3RSTlO/tKujra6nAL+rp7q9nKC+qrMBHZyQqBKskJe4vbSZJ4u0oTCtkLxsuqWeqLehrKKQq5wPeJ5wk7OVDZ9QmVpyoiiKLJmpsaWjnJ2QuJGQopO5n6KomZSxlrC+gKoOqJC2tpEHTZYLAAABOElEQVQoz3WR1XLDMBBFt21S37RubcdhZmZmLDMz//9HVI6TNpmRz4OuRkfS7kgkCEJnOJqMWVp7/X7PyibjyWjYYUls7QeAd6qqA5YYqOrUy/LTqsloHkrXgxlut56eroJ8VKCgCKVJ7a0ZX996tqmpQAxSCHGJOEhxhMiPcEKm1sYMSdKzRXIiDD8BZLmkkl4rm9WzRLcWzWgSmZy+6HDomctgIWPrHGJzaYAufZscfH81OVj4cv/o0FgmnVcr8uL/kWw4uMFzYUmen20v2GOn0o8uo2vhMJPbSBYs9PCyJMXIrkZEROrUc0dP4nJD9nk3dqTZeJ9a6TZg29GwBcD2nXiR/ODVZPcdX+P1/c2w25Xnc61xcGmmDJn/YzLKVEOlaOZQrKBGThMMMDlJqDbqJg71RlX4BTdxKqHoY8RpAAAAAElFTkSuQmCC');
}

.credit-icon-add {
  @include iconImage();
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAADG0lEQVRIS8WWT2gTQRTG35usNgZbERqrRSgoRREvGot4iJ3ZEKEHD7UWBIVW0Fw9VbFeEhBvUk8K7S3oxargodRIdyftwSrxoBQEzaHSSEVD/4kommaeTEnKqvnXJta9JXmZ33zf++bNImzwg9XyTNNsUUqdYYxN2rY9UW69dQHD4bAxMTFxUikVQsQTRMQA4FU8Hj9UU6BpmnuVUhcQ8TwRNeUW/woAWxHxrZRyf9XA7u7uzel0uhMRLxKRCQB5VxKMscGGhoYHi4uLC1UDhRD7NEQp1QMAjXrniLgEAHcBYEhK+Vp/p+2Nx+OZdQF7e3vdqVTqtFJKqzmetwcRnxHRoNfrvT88PPzdadu6gUKIPiK6CgDbc2rmiSjqcrmGLMt6U6w36wZyzr8BwBZEHAeAQbfb/XB0dPRHuRBUA/yJiF+klCv9qvSpKTAYDDYrpQ4Ugc9YlvXOAZz1eDwHR0ZGFkptdvXgc87/Usg5TwHA7kILIGKWMdbk9/uXdEpzNR8YYz22bdvFoOWAlxBxNa3ORRBx2rKsvkgk4nIAdQkh4oDb7e4vlIGSwEr6mLcUAFKMsRtEdJOIPAAwZRjG2bGxsanfNpr/UMjStQARcUZK2aIHBgDcIyIfIuqU99u2PYCItHLcSgEDgUBbNps9XKSH76WUMUdoVoC6NhQKbUomkxEAuKIHOyI+klJ2lQVyzmcBYFcxpfX19V6fz7eYG22rwHx9IBDwZ7PZx3qYuFyunZZlfSqp0DTNTiI6VkThtG3bdwopdNYLIV5qe+vq6ppjsdjHmoVG97CxsXHP3NzcRT3siWi+tbV1KJlMTv4zoGEYXZlMJpFXaBiGtvRWxUAhxKlSlkopbzst1QrT6fQ5xphXK2xvb4+Oj48/rxhYbWi00jX1MBgMHlleXi56LGzbfvpfQ5M/hxuW0oqAQogoAOhXPf0Wpgfv50pGmrNG/xcRFQCkASAqpbzMOe9BRD1bdwCAoX9DxCcohNApOrpWSNHrJzfGOOfXAOD6HzfMCwyHwyyRSGyrFdB5AXd0dDQwxlz5tdva2pZ+AY1fL62K4LLVAAAAAElFTkSuQmCC');
}
</style>
