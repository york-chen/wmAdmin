<template>
    <CtxLayout>
        <div slot="head" class="btn-wrap">

        </div>
        <div slot="body" class="wrap-bg">
            <router-view></router-view>
        </div>
    </CtxLayout>
</template>

<script>
    import CtxLayout from '@/components/ctx-layout'
    export default {
        name: "businessLayout",
        components:{CtxLayout}
    }
</script>

<style type="text/scss" lang="scss" scoped>
.wrap-bg{
    height: 100%;
    overflow: auto;
}
</style>