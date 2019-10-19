<template>
    <el-card class="search-bar">
        <div class="clearfix">
            <div class="condition">
                <slot name="condition"></slot>
            </div>
            <div class="operation">
                <slot name="operation"></slot>
            </div>
        </div>
    </el-card>
</template>
<style type="text/scss" lang="scss" scoped>
    .search-bar{
        width: 100%;
        margin-bottom: 15px;
        .condition{
            float: left;
        }
        .operation{
            float: right;
        }
    }
</style>