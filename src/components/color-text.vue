<template>
    <span :class="type"><slot></slot></span>
</template>
<script>
    export default {
        props:{
            type:{
                type: String,
                default:'primary'
            }
        }
    }
</script>
<style type="text/scss" lang="scss" scoped>
    .primary{
        color: #409EFF;
    }
    .success{
        color: #67C23A;
    }
    .danger{
        color: #F56C6C;
    }
    .warning{
        color: #E6A23C;
    }
</style>