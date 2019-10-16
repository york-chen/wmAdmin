<template>
    <div class="page-wrap">
      <div class="title">业务办理事项</div>
      <div class="tag-section">
        <div class="section-name">标签分类:</div>
        <ul class="section-content">
          <li class="active">分类1</li>
          <li>分类2</li>
          <li>分类3</li>
          <li>分类4</li>
          <li>分类5</li>
          <li>分类6</li>
          <li>分类7</li>
        </ul>
        <div class="viewMore">更多<i class="el-icon-caret-bottom"></i></div>
      </div>
      <div class="blank"></div>
      <div class="category">
        <div class="item active">招牌</div>
        <div class="item">取水</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
        <div class="item">其它</div>
      </div>
      <div class="search-wrap home-search">
        <el-autocomplete
                value-key="name"
                class="search-input"
                v-model="name"
                :fetch-suggestions="querySearch"
                placeholder="输入企业名称/社会代码等等"
                :trigger-on-focus="false"
                @select="handleSelect"
        >
          <el-button @click="handleSearch" class="search-btn" slot="append" icon="el-icon-search">查询</el-button>
        </el-autocomplete>
      </div>
    </div>
</template>
<script>
  import {$axCompanySearch} from '@/_axios/api/common'
  export default {
    data(){
      return {
        name:''
      }
    },
    methods:{
      handleSelect(item){
        this.name = item.name;
      },
      querySearch(queryString, cb) {
        if(!queryString){
          return;
        }
        $axCompanySearch({name:queryString}).then(res=>{
          cb(res.items);
        });
      },
      handleSearch(){
        this.$router.push('/business/waterIntake')
      }
    }
  }
</script>
<style lang="scss" type="text/scss" scoped>
  .title{
    font-size:22px;
    font-weight:600;
    color:#fff;
    &:before{
      content: '|';
      background-color: #436FFF;
      width: 100px;
      height: 100px;
      margin-right: 4px;
      color: #436FFF;
    }
  }
  .page-wrap{
    width: 910px;
    margin: 54px auto 0;
    color: #fff;
    .search-wrap{
      margin-top: 35px;
    }
    .el-autocomplete{
      display: block;
    }
    .search-btn{
      background-color: #436FFF;
      color: #fff;
      border:#436FFF;
      width: 196px;
      border-radius:0px 25px 25px 0px;
    }
  }
  .tag-section{
    display: flex;
    margin-top: 27px;
    font-size: 16px;
    .section-name,.viewMore{
      color: #8E939E;
    }
    .section-content{
      flex: 1;
      list-style: none;
      li{
        display: inline-block;
        padding: 0 30px;
        cursor: pointer;
        &.active{
          color: #436FFF;
        }
      }
    }
  }
  .category{
    font-size: 21px;
    color: #F4F4F4;
    margin-top: 20px;
    .item{
      display: inline-block;
      padding: 9px 24px;
      margin:0px  15px 15px;
      border:1px solid rgba(35,69,124,1);
      cursor: pointer;
      &.active{
        background:#436FFF ;
      }
    }
  }
  .blank{
    height:1px;
    background:rgba(220,231,245,1);
    opacity:0.15;
    margin-top: 15px;
  }
</style>
<style type="text/scss" lang="scss">
  .home-search .el-input-group__append{
    background-color: transparent;
    border: none;
  }
  .home-search input{
    border-radius:25px 0px 0px 25px;
  }
  .home-search .search-btn{
    padding-top: 13px;
    padding-bottom: 13px;
  }
</style>