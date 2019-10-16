<template>
  <CtxLayout>
    <div slot="body" class="wrap-bg">
      <div class="content">
        <div class="search-area">
          <h5 class="titile">个人信用分查询</h5>
          <div class="seach-box">
            <el-input placeholder="请输入身份证号">
              <el-button slot="append" class="search-btn" icon="el-icon-search">查询</el-button>
            </el-input>
          </div>
        </div>
        <div class="result-area">
          <h5 class="titile">查询结果</h5>
          <table cellspacing="0" class="cxt-table">
            <tr>
                <td class="cxt-cell" width="10%">姓名</td>
                <td colspan="3">章三</td>
                <td class="cxt-cell" width="27%">行政处罚条数（行政处罚，行政强制）</td>
                <td colspan="4">0</td>
                <td class="cxt-cell t-c" width="27%">信用分</td>
            </tr>
            <tr>
                <td class="cxt-cell" width="10%">性别</td>
                <td colspan="3">男</td>
                <td class="cxt-cell" width="27%">是否具有公共事业欠缴信息</td>
                <td colspan=4>是</td>
                <td height="180" rowspan="3" class="t-c gauge-wrap">
                  <template>
                      <span class="help-blank"></span>
                      <img class="img-gauge" src="https://oss-cn-beijing.aliyuncs.com/common/images/cxt/gauge.png" alt="">
                      <div class="gauge-info good">
                          <div class="score">95</div>
                          <div class="level">优秀</div>
                      </div>
                  </template>
                </td>
            </tr>
            <tr>
                <td class="cxt-cell" width="10%">年龄</td>
                <td colspan="3">30</td>
                <td class="cxt-cell" width="27%">行政奖励条数</td>
                <td colspan="4">1条</td>
            </tr>
            <tr>
                <td class="cxt-cell" width="10%">身份证号</td>
                <td colspan="3">110121199301011234</td>
                <td class="cxt-cell" width="27%">志愿服务时长</td>
                <td colspan="4">68h</td>
            </tr>
        </table>
        </div>
      </div>
    </div>
  </CtxLayout>
</template>
<script>
import CtxLayout from '@/components/ctx-layout'
export default {
  components: {
    CtxLayout
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 1040px;
  height: auto;
  margin: 40px auto;
  padding: 27px 80px;
  background-color: #fff;
  .search-area {
    border-bottom: 1px solid #e5e5e5;
  }
  .titile {
    border-left: 4px solid #436fff;
    padding-left: 15px;
    line-height: 22px;
    font-size: 16px;
    color: #333;
    font-weight: 500;
  }
  .seach-box {
    width: 700px;
    margin: 30px auto 50px auto;
    .search-btn{
      background-color: #436FFF;
      color: #fff;
      border:#436FFF;
      width: 160px;
      border-radius:0px 25px 25px 0px;
    }
  }
  .result-area {
    margin-top: 28px;
    .cxt-table{
      width: 100%;
      margin-top: 15px;
      font-size: 13px;
      line-height: 40px;
      border-right: 1px solid rgb(238, 238, 238);
      border-bottom: 1px solid rgb(238, 238, 238);
      td{
          padding-left: 15px;
          border-left: 1px solid rgb(238, 238, 238);
          border-top: 1px solid rgb(238, 238, 238);
      }
      .cxt-cell{
        background-color: #f5f7fa;
      }
      .gauge-wrap{
        position: relative;
        padding: 0 !important;
        line-height: normal;
      }
      .score{
        font-size: 40px;
        margin-top: 10px;
      }
      .level{
        font-size: 20px;
        margin-top: 10px;
      }
      .date{
        color: #a1a6ab;
        font-size: 12px;
        margin-top: 12px;
      }
      .img-gauge{
        vertical-align: middle;
      }
      .gauge-info{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -30%);
      }
      .bad{
        color: #f64400;
      }
      .good{
        color: #adce00;
      }
      .best{
        color:#00ca88
      }
    }
    .help-blank{
      display: inline-block;
      height: 100%;
      vertical-align: middle;
    }
  }
}
</style>
<style lang="scss" type="text/scss">
    .seach-box .el-input-group__append{
        background-color: transparent;
        border: none;
    }
    .seach-box input{
        border-radius:25px 0px 0px 25px;
    }
    .seach-box .search-btn{
        padding-top: 13px;
        padding-bottom: 13px;
    }
</style>