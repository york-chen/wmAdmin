<template>
  <div class="credit-box-main">
    <back-top v-scroll-show v-back-top />
    <div class="credit-content credit-report-loading" v-loading.fullscreen="loading">
      <!-- 头部 -->
      <credit-top title="" />
      <div class="credit-report">
<!--        <div class="credit-nav">-->
<!--          <a target="_blank" :href="`/cxtapi/credit/report/download?queryId=${detail.queryId}&token=${$store.state.login.token}`">-->
<!--            <el-button class="credit-down button-width" round>下载报告</el-button>-->
<!--          </a>-->
<!--        </div>-->
        <!-- 公司详情 -->
        <credit-company />
        <affix
          class="credit-affix"
          :offset="{ top: 196, bottom: 0 }"
          @affixtop="tabFixed = false"
          @affix="tabFixed = true"
          relative-element-selector="#creditContent"
          scrollContainerSelector=".wrap-bg"
        >
          <affix-tab :tabs="tabBasic" :offset="affixOffset" @change="tabChange" @toggle="tabToggle" />
          <affix-tag :tags="tagBasic" :offset="affixOffset" @toggle="tabToggle" />
        </affix>
        <!-- 报告内容 -->
        <div id="creditContent" :class="{ 'credit-main': tabFixed }">
          <!-- 公司背景 -->
          <credit-title title="公司背景" id="company">
            <detail-business title="工商信息" id="industry" />
            <detail-staff title="主要人员" id="staff" />
            <detail-partner title="股东信息" id="partner" />
            <detail-foreign title="对外投资" id="foreign" />
            <detail-annual title="企业年报" id="annual" />
            <detail-mechanism title="分支机构" id="mechanism" />
            <detail-record title="变更记录" id="record" />
          </credit-title>

          <!-- 公司发展 -->
          <credit-title title="公司发展" id="growing">
            <detail-finanfis title="融资历史" id="finanfis" />
            <detail-team title="核心团队" id="team" />
            <detail-work title="企业业务" id="work" />
            <detail-fund title="投资事件" id="fund" />
            <detail-prod title="竞品信息" id="prod" />
          </credit-title>

          <!-- 经营状况 -->
          <credit-title title="经营状况" id="happen">
            <detail-lic title="行政许可" id="lic" />
            <detail-taxes title="税务评级" id="taxes" />
            <detail-empty title="抽查检查" id="spot" />
            <detail-bid title="招投标" id="bid" />
            <detail-land title="购地信息" id="land" />
            <detail-supply title="供地信息" id="supply" />
            <detail-job title="招聘信息" id="job" />
            <detail-empty title="新闻信息" id="new" />
            <detail-empty title="资质证书" id="cert" />
            <detail-empty title="进出口信用" id="out" />
            <detail-empty title="产品信息" id="proinfo" />
          </credit-title>

          <!-- 知识产权 -->
          <credit-title title="知识产权" id="equity">
            <detail-empty title="商标信息" id="brand" />
            <detail-empty title="专利信息" id="patent" />
            <detail-book title="软件著作权" id="book" />
            <detail-right title="作品著作权" id="right" />
            <detail-copy title="网站备案" id="copy" />
          </credit-title>

          <!-- 司法风险 -->
          <credit-title title="司法风险" id="judicial">
            <detail-opencourt title="开庭公告" id="opencourt" length="2" />
            <detail-litigation title="企业诉讼" id="litigation" length="2" />
            <detail-court title="法院公告" id="court" length="1" />
            <detail-lost title="失信被执行人" id="lost" length="2" />
            <detail-executive title="被执行人" id="executive" length="20" />
            <detail-assist title="司法协助" id="assist" length="1" />
          </credit-title>

          <!-- 经营风险 -->
          <credit-title title="经营风险" id="manage">
            <detail-abnormal title="异常经营" id="abnormal" length="1" />
            <detail-penalti title="行政处罚" id="penalti" length="1" />
            <detail-serious title="严重违法" id="serious" length="1" />
            <detail-quality title="股权出质" id="quality" length="1" />
            <detail-chattel title="动产抵押" id="chattel" length="1" />
            <detail-owed title="欠税信息" id="owed" length="1" />
            <detail-sale title="司法拍卖" id="sale" length="1" />
            <detail-expose title="清算信息" id="expose" length="1" />
            <detail-notice title="公示催告" id="notice" length="1" />
          </credit-title>

          <!-- 财务分析 -->
          <credit-title title="财务分析" id="analyse">
            <detail-finan title="主要财务数据" id="finan" />
          </credit-title>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./index.js"></script>
